import { AzureDevOpsApiVersion } from '../../constants';
import { NuGetApi } from './NuGetApi';
import { NuGetPackageVersion } from './NuGetInterfaces';

export interface Options {
    /** True to show deleted package versions; otherwise, false. Default: unset (exclude deleted). */
    showDeleted?: boolean;
}

declare module './NuGetApi' {
    interface NuGetApi {
        /**
         * Get information about a NuGet package version.
         *
         * The project parameter must be supplied if the feed was created in a project. If the feed is not associated with any project, omit the project parameter from the request.
         * @param project Project ID or project name
         * @param feedId Name or ID of the feed.
         * @param packageName Name of the package.
         * @param packageVersion Version of the package.
         * @param options Options
         */
        getPackageVersion(project: string | undefined, feedId: string, packageName: string, packageVersion: string, options?: Options): Promise<NuGetPackageVersion>;
    }
}

Object.assign(NuGetApi.prototype, {
    async getPackageVersion(this: NuGetApi, project: string | undefined, feedId: string, packageName: string, packageVersion: string, options: Options = {}): Promise<NuGetPackageVersion> {
        return await this.client.get<NuGetPackageVersion>([project, '_apis', 'packaging', 'feeds', feedId, 'nuget', 'packages', packageName, 'versions', packageVersion], {
            ...options,
            'api-version': AzureDevOpsApiVersion
        });
    },
});