import { NpmApi } from './NpmApi';
import { AzureDevOpsApiVersion } from '../../constants';

/**
 * The type of batch operation to perform on npm package versions.
 */
type NpmBatchOperationType =
    /** Delete package versions (equivalent to Unpublish). */
    'delete' |
    /** Deprecate or undeprecate package versions. */
    'deprecate' |
    /** Promote package versions to a release view. */
    'promote' |
    /** Unpublish package versions. Npm-specific alias for the Delete operation. */
    'unpublish';

/**
 * Represents a package identifier for a batch operation.
 */
interface MinimalPackageDetails {
    /** Package name (e.g., 'package' or '@scope/package' for scoped packages). */
    packageName: string;
    /** Package version. */
    version: string;
}

/**
 * Represents additional data for a batch operation.
 */
type NpmBatchOperationData =
    /** Data for 'promote' operation. */
    { viewId: string } |
    /** Data for 'deprecate' operation. */
    { message: string } |
    /** No data for 'delete' or 'unpublish' operations. */
    {};

/**
 * Represents a batch request for updating npm package versions.
 */
interface NpmBatchRequest {
    /** Data required to perform the operation (e.g., viewId for promote, message for deprecate). */
    data?: NpmBatchOperationData;
    /** Type of operation to perform on packages. */
    operation: NpmBatchOperationType;
    /** The packages onto which the operation will be performed. */
    packages: MinimalPackageDetails[];
}

declare module './NpmApi' {
    interface NpmApi {
        /**
         * Update several npm package versions in a feed.
         *
         * The project parameter must be supplied if the feed was created in a project. If the feed is not associated with any project, omit the project parameter from the request.
         * @param project Project ID or project name
         * @param feedId Name or ID of the feed.
         * @param request Request containing the operation and package versions to update
         */
        updatePackages(project: string | undefined, feedId: string, request: NpmBatchRequest): Promise<void>;
    }
}

Object.assign(NpmApi.prototype, {
    async updatePackages(this: NpmApi, project: string | undefined, feedId: string, request: NpmBatchRequest): Promise<void> {
        await this.fetch('POST', [project, '_apis', 'packaging', 'feeds', feedId, 'npm', 'packagesbatch'], {
            'api-version': AzureDevOpsApiVersion,
        }, request);
    },
});
