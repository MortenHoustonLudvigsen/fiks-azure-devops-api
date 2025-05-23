import { NpmApi } from './NpmApi';
import { AzureDevOpsApiVersion } from '../../constants';

/**
 * The type of batch operation to perform on npm package versions in the recycle bin.
 */
type NpmBatchOperationType =
    /** Permanently delete package versions. Only supported in the Recycle Bin. */
    'permanentDelete' |
    /** Restore unpublished package versions to the feed. Only supported in the Recycle Bin. */
    'restoreToFeed';

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
    /** Data for 'restoreToFeed' operation. */
    { listed?: boolean } |
    /** No data for 'permanentDelete' operation. */
    {};

/**
 * Represents a batch request for updating npm package versions in the recycle bin.
 */
interface NpmBatchRequest {
    /** Data required to perform the operation (e.g., listed state for restoreToFeed). */
    data?: NpmBatchOperationData;
    /** Type of operation to perform on packages. */
    operation: NpmBatchOperationType;
    /** The packages onto which the operation will be performed. */
    packages: MinimalPackageDetails[];
}

declare module './NpmApi' {
    interface NpmApi {
        /**
         * Update several npm package versions in the recycle bin.
         *
         * The project parameter must be supplied if the feed was created in a project. If the feed is not associated with any project, omit the project parameter from the request.
         * @param project Project ID or project name
         * @param feedId Name or ID of the feed.
         * @param request Request containing the operation and package versions to update
         */
        updateRecycleBinPackageVersions(project: string | undefined, feedId: string, request: NpmBatchRequest): Promise<void>;
    }
}

Object.assign(NpmApi.prototype, {
    async updateRecycleBinPackageVersions(this: NpmApi, project: string | undefined, feedId: string, request: NpmBatchRequest): Promise<void> {
        await this.client.fetch('POST', [project, '_apis', 'packaging', 'feeds', feedId, 'npm', 'RecycleBin', 'packagesbatch'], {
            'api-version': AzureDevOpsApiVersion,
        }, request);
    },
});
