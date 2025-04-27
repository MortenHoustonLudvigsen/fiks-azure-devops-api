import { NpmApi } from './NpmApi';
import { AzureDevOpsApiVersion } from '../../constants';

/**
 * The type of batch operation to perform on npm package versions.
 */
type NpmBatchOperationType =
    /** Delete package versions (equivalent to Unpublish). Not supported in the Recycle Bin. */
    'delete' |
    /** Deprecate or undeprecate package versions. Not supported in the Recycle Bin. */
    'deprecate' |
    /** Permanently delete package versions. Only supported in the Recycle Bin. */
    'permanentDelete'
    /** Promote package versions to a release view. If constructing a NpmPackagesBatchRequest object with this type, use BatchPromoteData for its Data property. Not supported in the Recycle Bin. */
    'promote'
    /** Restore unpublished package versions to the feed. Only supported in the Recycle Bin. */
    'restoreToFeed'
    /** Unpublish package versions. Npm-specific alias for the Delete operation. Not supported in the Recycle Bin. */
    'unpublish';

/**
 * Represents a package identifier for a batch operation.
 */
interface MinimalPackageDetails {
    /** Package name. */
    id: string;
    /** Package version. */
    version: string;
}

/**
 * Represents additional data for a batch operation (e.g., listed state for 'list' operation).
 */
type NpmBatchOperationData = any;

/**
 * Represents a batch request for updating npm package versions.
 */
interface NpmBatchRequest {
    /** Data required to perform the operation. This is optional based on type of operation. Use BatchPromoteData if performing a promote operation. */
    data?: NpmBatchOperationData;
    /** Type of operation that needs to be performed on packages. */
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
