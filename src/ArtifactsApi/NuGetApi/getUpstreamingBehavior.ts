import { NuGetApi } from './NuGetApi';
import { AzureDevOpsApiVersion } from '../../constants';
import { UpstreamingBehavior } from './NuGetInterfaces';

declare module './NuGetApi' {
    interface NuGetApi {
        /**
         * Get the upstreaming behavior of a NuGet feed.
         *
         * The project parameter must be supplied if the feed was created in a project. If the feed is not associated with any project, omit the project parameter from the request.
         * @param project Project ID or project name
         * @param feedId Name or ID of the feed.
         */
        getUpstreamingBehavior(project: string | undefined, feedId: string): Promise<UpstreamingBehavior>;
    }
}

Object.assign(NuGetApi.prototype, {
    async getUpstreamingBehavior(this: NuGetApi, project: string | undefined, feedId: string): Promise<UpstreamingBehavior> {
        return await this.client.get<UpstreamingBehavior>([project, '_apis', 'packaging', 'feeds', feedId, 'nuget', 'upstreaming'], {
            'api-version': AzureDevOpsApiVersion,
        });
    },
});