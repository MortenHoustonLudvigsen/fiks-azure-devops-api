import { NpmApi } from './NpmApi';
import { AzureDevOpsApiVersion } from '../../constants';

/**
 * The type of batch operation to perform on npm package versions.
 */
type NpmBatchOperationType =
    /** Update the listed state of package versions. */
    'list' |
    /** Delete package versions from the feed. */
    'delete' |
    /** Permanently delete package versions from the recycle bin. */
    'permanentDelete';

/**
 * Represents a package identifier for a batch operation.
 */
interface NpmBatchPackage {
    /** Name of the package (e.g., 'package' or '@scope/package' for scoped packages). */
    packageName: string;
    /** Version of the package. */
    packageVersion: string;
}

/**
 * Represents a batch request for updating npm package versions.
 */
interface NpmBatchRequest {
    /** The operation to perform on the package versions. */
    operation: NpmBatchOperationType;
    /** The list of packages and versions to update. */
    packages: NpmBatchPackage[];
    /** Additional operation-specific data (e.g., listed state). */
    data?: any;
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
        await this.fetch('POST', [project, '_apis', 'packaging', 'feeds', feedId, 'npm', 'RecycleBin', 'packagesbatch'], {
            'api-version': AzureDevOpsApiVersion,
        }, request);
    },
});
