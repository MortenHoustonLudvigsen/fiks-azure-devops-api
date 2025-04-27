import { NuGetApi } from './NuGetApi';
import { AzureDevOpsApiVersion } from '../../constants';
import { UpstreamingBehavior } from './NuGetInterfaces';

declare module './NuGetApi' {
    interface NuGetApi {
        /**
         * Set the upstreaming behavior of a NuGet feed.
         *
         * The project parameter must be supplied if the feed was created in a project. If the feed is not associated with any project, omit the project parameter from the request.
         * @param project Project ID or project name
         * @param feedId Name or ID of the feed.
         * @param behavior The upstreaming behavior to set
         */
        setUpstreamingBehavior(project: string | undefined, feedId: string, behavior: UpstreamingBehavior): Promise<void>;
    }
}

Object.assign(NuGetApi.prototype, {
    async setUpstreamingBehavior(this: NuGetApi, project: string | undefined, feedId: string, behavior: UpstreamingBehavior): Promise<void> {
        await this.client.patch([project, '_apis', 'packaging', 'feeds', feedId, 'nuget', 'upstreaming'], {
            'api-version': AzureDevOpsApiVersion,
        }, behavior);
    },
});
