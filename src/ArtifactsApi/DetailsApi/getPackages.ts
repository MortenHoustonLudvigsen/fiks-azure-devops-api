import { DetailsApi } from './DetailsApi';
import { Package } from '../ArtifactsInterfaces';
import { AzureDevOpsApiVersion } from '../../constants';

export interface Options {
    /** Return deleted or unpublished versions of packages in the response. Default is False. */
    includeDeleted?: boolean;
    /** Return the description for every version of each package in the response. Default is False. Cannot be used in conjunction with includeAllVersions. */
    includeDescription?: boolean;
    /** This parameter is only applicable for NuGet packages and most useful when it is used in conjunction with includeAllVersions. When set to False, a result set containing unreleased packages will be returned. Default is True. */
    isRelease?: boolean;
    /** Changes the behavior of $top and $skip to return all versions of each package up to $top. Must be used in conjunction with includeAllVersions=true */
    getTopPackageVersions?: boolean;
    /** This parameter is only applicable for NuGet packages and when it is set to False it means that delisted packages versions will be returned. Setting it to false for any other protocol will result in a 404. This parameter is most useful when it is used in conjunction with includeAllVersions which will return a result set containing all delisted packages. Default is unset. */
    isListed?: boolean;
    /** Return all versions of the package in the response. The default behavior is to only return the latest version. */
    includeAllVersions?: boolean;
    /** Return REST Urls with the response. Default is True. */
    includeUrls?: boolean;
    /** Will return packages from the feed that contain the string provided. Characters in the string must conform to the package name constraints. */
    packageNameQuery?: string;
    /** Must be one of Npm, NuGet, or Maven. */
    protocolType?: string;
    /** Filter results to return packages from a specific upstream. */
    directUpstreamId?: string;
    /** Skip N packages (or package versions with getTopPackageVersions=true) */
    $skip?: number;
    /** Get the top N packages (or package versions with getTopPackageVersions=true) */
    $top?: number;
}

declare module './DetailsApi' {
    interface DetailsApi {
        /**
         * Get details about all of the packages in the feed. Use the various filters to include or exclude information from the result set.
         * 
         * The project parameter must be supplied if the feed was created in a project. If the feed is not associated with any project, omit the project parameter from the request.
         * @param project Project ID or project name
         * @param feedId Name or Id of the feed.
         * @param options Options
         */
        getPackages(project: string | undefined, feedId: string, options?: Options): Promise<Package[]>;
    }
}

Object.assign(DetailsApi.prototype, {
    async getPackages(this: DetailsApi, project: string | undefined, feedId: string, options: Options = {}): Promise<Package[]> {
        return await this.client.getList<Package>([project, '_apis', 'packaging', 'Feeds', feedId, 'packages'], {
            ...options,
            'api-version': AzureDevOpsApiVersion 
        });
    }
});
