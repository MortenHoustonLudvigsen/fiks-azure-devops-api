import { ArtifactsApi } from '../ArtifactsApi';
import { PackageVersion } from './FeedsInterfaces';

export interface GetPackageVersionOptions {
    /** True to include urls for each version. Default is true. */
    includeUrls?: boolean;
    /** Only applicable for NuGet packages. If false, delisted package versions will be returned. */
    isListed?: boolean;
    /** Return deleted or unpublished versions of packages in the response. Default is unset (do not return deleted versions). */
    isDeleted?: boolean;
}

declare module '../ArtifactsApi' {
    interface ArtifactsApi {
        getPackageVersion(feedId: string, packageId: string, packageVersionId: string, options?: GetPackageVersionOptions): Promise<PackageVersion>;
    }
}

Object.assign(ArtifactsApi.prototype, {
    async getPackageVersion(this: ArtifactsApi, feedId: string, packageId: string, packageVersionId: string, options: GetPackageVersionOptions = {}): Promise<PackageVersion> {
        return await this.get<PackageVersion>(['_apis', 'packaging', 'Feeds', feedId, 'packages', packageId, 'versions', packageVersionId], {
            ...options,
            'api-version': '7.2-preview.1'
        });
    }
});

//GET https://feeds.dev.azure.com/{organization}/{project}/_apis/packaging/Feeds/{feedId}/Packages/{packageId}/versions/{packageVersionId}?api-version=7.2-preview.1