import { NuGetApi } from './NuGetApi';
import { NuGetPackageVersionDeletionState } from './NuGetInterfaces';
import { AzureDevOpsApiVersion } from '../../constants';

declare module './NuGetApi' {
    interface NuGetApi {
        /**
         * Get information about a NuGet package version in the recycle bin.
         *
         * The project parameter must be supplied if the feed was created in a project. If the feed is not associated with any project, omit the project parameter from the request.
         * @param project Project ID or project name
         * @param feedId Name or ID of the feed.
         * @param packageName Name of the package.
         * @param packageVersion Version of the package.
         */
        getPackageVersionFromRecycleBin(project: string | undefined, feedId: string, packageName: string, packageVersion: string): Promise<NuGetPackageVersionDeletionState>;
    }
}

Object.assign(NuGetApi.prototype, {
    async getPackageVersionFromRecycleBin(this: NuGetApi, project: string | undefined, feedId: string, packageName: string, packageVersion: string): Promise<NuGetPackageVersionDeletionState> {
        return await this.get<NuGetPackageVersionDeletionState>([project, '_apis', 'packaging', 'feeds', feedId, 'nuget', 'RecycleBin', 'packages', packageName, 'versions', packageVersion], {
            'api-version': AzureDevOpsApiVersion,
        });
    },
});
