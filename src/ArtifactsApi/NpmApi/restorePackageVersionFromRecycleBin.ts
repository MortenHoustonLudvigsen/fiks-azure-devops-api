import { NpmApi } from './NpmApi';
import { AzureDevOpsApiVersion } from '../../constants';

/**
 * Represents details for restoring an npm package version from the recycle bin.
 */
interface NpmRecycleBinPackageVersionDetails {
    /** Setting to false will undo earlier deletion and restore the package to feed. */
    deleted: boolean;
}

declare module './NpmApi' {
    interface NpmApi {
        /**
         * Restore an npm package version from a feed's recycle bin.
         *
         * The project parameter must be supplied if the feed was created in a project. If the feed is not associated with any project, omit the project parameter from the request.
         * @param project Project ID or project name
         * @param feedId Name or ID of the feed.
         * @param packageName Name of the package (e.g., 'package' or '@scope/package' for scoped packages).
         * @param packageVersion Version of the package.
         * @param details Details for restoring the package version
         */
        restorePackageVersionFromRecycleBin(project: string | undefined, feedId: string, packageName: string, packageVersion: string, details: NpmRecycleBinPackageVersionDetails): Promise<void>;
    }
}

Object.assign(NpmApi.prototype, {
    async restorePackageVersionFromRecycleBin(this: NpmApi, project: string | undefined, feedId: string, packageName: string, packageVersion: string, details: NpmRecycleBinPackageVersionDetails): Promise<void> {
        await this.patch([project, '_apis', 'packaging', 'feeds', feedId, 'npm', 'RecycleBin', 'packages', ...packageName.split('/', 2), 'versions', packageVersion], {
            'api-version': AzureDevOpsApiVersion,
        }, details);
    },
});
