import { NuGetApi } from './NuGetApi';
import { NuGetBatchRequest } from './NuGetInterfaces';
import { AzureDevOpsApiVersion } from '../../constants';

declare module './NuGetApi' {
    interface NuGetApi {
        /**
         * Update several NuGet package versions in the recycle bin.
         *
         * The project parameter must be supplied if the feed was created in a project. If the feed is not associated with any project, omit the project parameter from the request.
         * @param project Project ID or project name
         * @param feedId Name or ID of the feed.
         * @param request Request containing the operation and package versions to update
         */
        updateRecycleBinPackageVersions(project: string | undefined, feedId: string, request: NuGetBatchRequest): Promise<void>;
    }
}

Object.assign(NuGetApi.prototype, {
    async updateRecycleBinPackageVersions(this: NuGetApi, project: string | undefined, feedId: string, request: NuGetBatchRequest): Promise<void> {
        await this.fetch('POST', [project, '_apis', 'packaging', 'feeds', feedId, 'nuget', 'RecycleBin', 'packagesbatch'], {
            'api-version': AzureDevOpsApiVersion,
        }, request);
    },
});