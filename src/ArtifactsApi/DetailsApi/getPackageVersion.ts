import { DetailsApi } from './DetailsApi';
import { PackageVersion } from '../ArtifactsInterfaces';

export interface Options {
    /** True to include urls for each version. Default is true. */
    includeUrls?: boolean;
    /** Only applicable for NuGet packages. If false, delisted package versions will be returned. */
    isListed?: boolean;
    /** Return deleted or unpublished versions of packages in the response. Default is unset (do not return deleted versions). */
    isDeleted?: boolean;
}

declare module './DetailsApi' {
    interface DetailsApi {
        getPackageVersion(feedId: string, packageId: string, packageVersionId: string, options?: Options): Promise<PackageVersion>;
    }
}

Object.assign(DetailsApi.prototype, {
    async getPackageVersion(this: DetailsApi, feedId: string, packageId: string, packageVersionId: string, options: Options = {}): Promise<PackageVersion> {
        return await this.get<PackageVersion>(['_apis', 'packaging', 'Feeds', feedId, 'packages', packageId, 'versions', packageVersionId], {
            ...options,
            'api-version': '7.2-preview.1'
        });
    }
});

//GET https://feeds.dev.azure.com/{organization}/{project}/_apis/packaging/Feeds/{feedId}/Packages/{packageId}/versions/{packageVersionId}?api-version=7.2-preview.1