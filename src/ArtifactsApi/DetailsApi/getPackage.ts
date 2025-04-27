import { DetailsApi } from './DetailsApi';
import { Package } from '../ArtifactsInterfaces';

export interface Options {
  /** True to return all versions of the package in the response. Default is false (latest version only). */
  includeAllVersions?: boolean;
  /** Return deleted or unpublished versions of packages in the response. Default is False. */
  includeDeleted?: boolean;
  /** Return the description for every version of each package in the response. Default is False. */
  includeDescription?: boolean;
  /** True to return REST Urls with the response. Default is True. */
  includeUrls?: boolean;
  /** Only applicable for NuGet packages, setting it for other package types will result in a 404. If false, delisted package versions will be returned. Use this to filter the response when includeAllVersions is set to true. Default is unset (do not return delisted packages). */
  isListed?: boolean;
  /** Only applicable for Nuget packages. Use this to filter the response when includeAllVersions is set to true. Default is True (only return packages without prerelease versioning). */
  isRelease?: boolean;
}

declare module './DetailsApi' {
  interface DetailsApi {
    /**
     * Get details about a specific package.
     * 
     * The project parameter must be supplied if the feed was created in a project. If the feed is not associated with any project, omit the project parameter from the request.
     * @param project Project ID or project name
     * @param feedId Name or Id of the feed.
     * @param packageId The package Id (GUID Id, not the package name).
     * @param options Options
     */
    getPackage(project: string | undefined, feedId: string, packageId: string, options?: Options): Promise<Package>;
  }
}

Object.assign(DetailsApi.prototype, {
  async getPackage(this: DetailsApi, project: string | undefined, feedId: string, packageId: string, options: Options = {}): Promise<Package> {
    return await this.get<Package>([project, '_apis', 'packaging', 'Feeds', feedId, 'packages', packageId], {
      ...options,
      'api-version': '7.2-preview.1',
    });
  },
});
