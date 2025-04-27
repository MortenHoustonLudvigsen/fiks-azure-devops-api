import { AzureDevOpsApiVersion } from '../../constants';
import { NuGetApi } from './NuGetApi';

export interface Options {
    /** The version of the NuGet protocol to use. Currently unused by the API but included for potential future compatibility. */
    sourceProtocolVersion?: string;
}

declare module './NuGetApi' {
    interface NuGetApi {
        /**
         * Download a NuGet package.
         *
         * The project parameter must be supplied if the feed was created in a project. If the feed is not associated with any project, omit the project parameter from the request.
         * @param project Project ID or project name
         * @param feedId Name or ID of the feed.
         * @param packageName Name of the package.
         * @param packageVersion Version of the package.
         * @param options Options
         */
        downloadPackage(project: string | undefined, feedId: string, packageName: string, packageVersion: string, options?: Options): Promise<Buffer>;
    }
}

Object.assign(NuGetApi.prototype, {
    async downloadPackage(this: NuGetApi, project: string | undefined, feedId: string, packageName: string, packageVersion: string, options: Options = {}): Promise<Buffer> {
        return await this.getBinary([project, '_apis', 'packaging', 'feeds', feedId, 'nuget', 'packages', packageName, 'versions', packageVersion, 'content'], {
            ...options,
            'api-version': AzureDevOpsApiVersion
        });
    },
});
