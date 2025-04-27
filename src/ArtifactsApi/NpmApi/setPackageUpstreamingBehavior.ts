import { NpmApi } from './NpmApi';
import { UpstreamingBehavior } from '../NuGetApi/NuGetInterfaces';
import { AzureDevOpsApiVersion } from '../../constants';

declare module './NpmApi' {
    interface NpmApi {
        /**
         * Set the upstreaming behavior for an npm package.
         *
         * The project parameter must be supplied if the feed was created in a project. If the feed is not associated with any project, omit the project parameter from the request.
         * @param project Project ID or project name
         * @param feedId Name or ID of the feed.
         * @param packageName Name of the package (e.g., 'package' or '@scope/package' for scoped packages).
         * @param behavior The upstreaming behavior to set
         */
        setPackageUpstreamingBehavior(project: string | undefined, feedId: string, packageName: string, behavior: UpstreamingBehavior): Promise<void>;
    }
}

Object.assign(NpmApi.prototype, {
    async setPackageUpstreamingBehavior(this: NpmApi, project: string | undefined, feedId: string, packageName: string, behavior: UpstreamingBehavior): Promise<void> {
        await this.client.patch([project, '_apis', 'packaging', 'feeds', feedId, 'npm', 'packages', ...packageName.split('/', 2), 'upstreaming'], {
            'api-version': AzureDevOpsApiVersion,
        }, behavior);
    },
});
