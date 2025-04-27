import { NuGetApi } from './NuGetApi';
import { NuGetPackageVersion } from './NuGetInterfaces';

export interface Options {
    /** Whether the package version should be listed. */
    listed?: boolean;
}

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
         * @param options Options
         */
        updatePackageVersion(project: string | undefined, feedId: string, packageName: string, packageVersion: string, options: Options): Promise<NuGetPackageVersion>;
    }
}

Object.assign(NuGetApi.prototype, {
    async updatePackageVersion(this: NuGetApi, project: string | undefined, feedId: string, packageName: string, packageVersion: string, options: Options): Promise<NuGetPackageVersion> {
        return await this.patch<NuGetPackageVersion>([project, '_apis', 'packaging', 'feeds', feedId, 'nuget', 'packages', packageName, 'versions', packageVersion], {
            'api-version': '7.2-preview.1',
        }, options);
    },
});
