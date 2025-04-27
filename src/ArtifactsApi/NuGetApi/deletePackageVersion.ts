import { NuGetApi } from './NuGetApi';
import { AzureDevOpsApiVersion } from '../../constants';

declare module './NuGetApi' {
    interface NuGetApi {
        /**
         * Delete a NuGet package version from a feed, moving it to the recycle bin.
         *
         * The project parameter must be supplied if the feed was created in a project. If the feed is not associated with any project, omit the project parameter from the request.
         * @param project Project ID or project name
         * @param feedId Name or ID of the feed.
         * @param packageName Name of the package.
         * @param packageVersion Version of the package.
         */
        deletePackageVersion(project: string | undefined, feedId: string, packageName: string, packageVersion: string): Promise<void>;
    }
}

Object.assign(NuGetApi.prototype, {
    async deletePackageVersion(this: NuGetApi, project: string | undefined, feedId: string, packageName: string, packageVersion: string): Promise<void> {
        await this.client.delete([project, '_apis', 'packaging', 'feeds', feedId, 'nuget', 'packages', packageName, 'versions', packageVersion], {
            'api-version': AzureDevOpsApiVersion,
        });
    },
});
