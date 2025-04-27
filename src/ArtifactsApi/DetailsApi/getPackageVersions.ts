import { DetailsApi } from './DetailsApi';
import { PackageVersion } from '../ArtifactsInterfaces';

export interface Options {
  /** True to include REST URLs for each version; otherwise, false. Default: true. */
  includeUrls?: boolean;
  /** True to include deleted or unpublished versions in the response; otherwise, false. Default: unset (exclude deleted). */
  isDeleted?: boolean;
  /** Only applicable for NuGet packages. True to include only listed versions; otherwise, false to include delisted versions. Default: unset (include listed). */
  isListed?: boolean;
}

declare module './DetailsApi' {
  interface DetailsApi {
    getPackageVersions(project: string | undefined, feedId: string, packageId: string, options?: Options): Promise<PackageVersion[]>;
  }
}

Object.assign(DetailsApi.prototype, {
  async getPackageVersions(this: DetailsApi, project: string | undefined, feedId: string, packageId: string, options: Options = {}): Promise<PackageVersion[]> {
    return await this.getList<PackageVersion>([project, '_apis', 'packaging', 'Feeds', feedId, 'packages', packageId, 'versions'], {
      ...options,
      'api-version': '7.2-preview.1',
    });
  },
});
