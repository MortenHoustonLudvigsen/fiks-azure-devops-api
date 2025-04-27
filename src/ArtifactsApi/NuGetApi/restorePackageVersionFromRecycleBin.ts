import { NuGetApi } from './NuGetApi';
import { AzureDevOpsApiVersion } from '../../constants';

/**
 * Represents details for restoring a NuGet package version from the recycle bin.
 */
interface NuGetRecycleBinPackageVersionDetails {
    /** Setting to false will undo earlier deletion and restore the package to feed. */
    deleted: boolean;
}

declare module './NuGetApi' {
    interface NuGetApi {
        /**
         * Restore a NuGet package version from a feed's recycle bin.
         *
         * The project parameter must be supplied if the feed was created in a project. If the feed is not associated with any project, omit the project parameter from the request.
         * @param project Project ID or project name
         * @param feedId Name or ID of the feed.
         * @param packageName Name of the package.
         * @param packageVersion Version of the package.
         * @param details Details for restoring the package version
         */
        restorePackageVersionFromRecycleBin(project: string | undefined, feedId: string, packageName: string, packageVersion: string, details: NuGetRecycleBinPackageVersionDetails): Promise<void>;
    }
}

Object.assign(NuGetApi.prototype, {
    async restorePackageVersionFromRecycleBin(this: NuGetApi, project: string | undefined, feedId: string, packageName: string, packageVersion: string, details: NuGetRecycleBinPackageVersionDetails): Promise<void> {
        await this.client.patch([project, '_apis', 'packaging', 'feeds', feedId, 'nuget', 'RecycleBin', 'packages', packageName, 'versions', packageVersion], {
            'api-version': AzureDevOpsApiVersion,
        }, details);
    },
});