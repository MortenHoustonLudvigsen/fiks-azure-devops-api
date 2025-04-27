import { AzureDevOpsApiVersion } from '../../constants';
import { NuGetApi } from './NuGetApi';
import { NuGetPackageVersion, PackageVersionDetails } from './NuGetInterfaces';

declare module './NuGetApi' {
    interface NuGetApi {
        /**
         * Update the state of a NuGet package version.
         *
         * The project parameter must be supplied if the feed was created in a project. If the feed is not associated with any project, omit the project parameter from the request.
         * @param project Project ID or project name
         * @param feedId Name or ID of the feed.
         * @param packageName Name of the package.
         * @param packageVersion Version of the package.
         * @param request The request
         */
        updatePackageVersion(project: string | undefined, feedId: string, packageName: string, packageVersion: string, request: PackageVersionDetails): Promise<NuGetPackageVersion>;
    }
}

Object.assign(NuGetApi.prototype, {
    async updatePackageVersion(this: NuGetApi, project: string | undefined, feedId: string, packageName: string, packageVersion: string, request: PackageVersionDetails): Promise<NuGetPackageVersion> {
        return await this.client.patch<NuGetPackageVersion>([project, '_apis', 'packaging', 'feeds', feedId, 'nuget', 'packages', packageName, 'versions', packageVersion], {
            'api-version': AzureDevOpsApiVersion
        }, request);
    },
});
