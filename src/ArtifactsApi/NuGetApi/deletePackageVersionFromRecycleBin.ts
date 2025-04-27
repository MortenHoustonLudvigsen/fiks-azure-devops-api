import { AzureDevOpsApiVersion } from '../../constants';
import { NuGetApi } from './NuGetApi';

declare module './NuGetApi' {
    interface NuGetApi {
        /**
         * Delete a NuGet package version from a feed's recycle bin.
         *
         * The project parameter must be supplied if the feed was created in a project. If the feed is not associated with any project, omit the project parameter from the request.
         * @param project Project ID or project name
         * @param feedId Name or ID of the feed.
         * @param packageName Name of the package.
         * @param packageVersion Version of the package.
         */
        deletePackageVersionFromRecycleBin(project: string | undefined, feedId: string, packageName: string, packageVersion: string): Promise<void>;
    }
}

Object.assign(NuGetApi.prototype, {
    async deletePackageVersionFromRecycleBin(this: NuGetApi, project: string | undefined, feedId: string, packageName: string, packageVersion: string): Promise<void> {
        await this.client.delete([project, '_apis', 'packaging', 'feeds', feedId, 'nuget', 'RecycleBin', 'packages', packageName, 'versions', packageVersion], {
            'api-version': AzureDevOpsApiVersion
        });
    },
});

