import { DetailsApi } from './DetailsApi';
import { PackageVersion } from '../ArtifactsInterfaces';

export interface Options {
    /** True to include urls for each version. Default is true. */
    includeUrls?: boolean;
    /** Only applicable for NuGet packages. If false, delisted package versions will be returned. */
    isListed?: boolean;
    /** This does not have any effect on the requested package version, for other versions returned specifies whether to return only deleted or non-deleted versions of packages in the response. Default is unset (return all versions). */
    isDeleted?: boolean;
}

declare module './DetailsApi' {
    interface DetailsApi {
        /**
         * Get details about a specific package version.
         * 
         * The project parameter must be supplied if the feed was created in a project. If the feed is not associated with any project, omit the project parameter from the request.
         * @param project Project ID or project name
         * @param feedId Name or Id of the feed.
         * @param packageId Id of the package (GUID Id, not name).
         * @param packageVersionId Id of the package version (GUID Id, not name).
         * @param options Options
         */
        getPackageVersion(project: string | undefined, feedId: string, packageId: string, packageVersionId: string, options?: Options): Promise<PackageVersion>;
    }
}

Object.assign(DetailsApi.prototype, {
    async getPackageVersion(this: DetailsApi, project: string | undefined, feedId: string, packageId: string, packageVersionId: string, options: Options = {}): Promise<PackageVersion> {
        return await this.get<PackageVersion>([project, '_apis', 'packaging', 'Feeds', feedId, 'packages', packageId, 'versions', packageVersionId], {
            ...options,
            'api-version': '7.2-preview.1'
        });
    }
});
