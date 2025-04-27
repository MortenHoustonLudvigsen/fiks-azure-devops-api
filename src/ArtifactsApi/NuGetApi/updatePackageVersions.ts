import { AzureDevOpsApiVersion } from '../../constants';
import { NuGetApi } from './NuGetApi';
import { NuGetBatchRequest } from './NuGetInterfaces';

declare module './NuGetApi' {
    interface NuGetApi {
        /**
         * Update several NuGet package versions.
         *
         * The project parameter must be supplied if the feed was created in a project. If the feed is not associated with any project, omit the project parameter from the request.
         * @param project Project ID or project name
         * @param feedId Name or ID of the feed.
         * @param request Request containing the operation and package versions to update
         */
        updatePackageVersions(project: string | undefined, feedId: string, request: NuGetBatchRequest): Promise<void>;
    }
}

Object.assign(NuGetApi.prototype, {
    async updatePackageVersions(this: NuGetApi, project: string | undefined, feedId: string, request: NuGetBatchRequest): Promise<void> {
        await this.client.fetch('POST', [project, '_apis', 'packaging', 'feeds', feedId, 'nuget', 'packagesbatch'], {
            'api-version': AzureDevOpsApiVersion
        }, request);
    },
});
