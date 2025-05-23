import { NpmApi } from './NpmApi';
import { AzureDevOpsApiVersion } from '../../constants';

declare module './NpmApi' {
    interface NpmApi {
        /**
         * Download an npm package.
         *
         * The project parameter must be supplied if the feed was created in a project. If the feed is not associated with any project, omit the project parameter from the request.
         * @param project Project ID or project name
         * @param feedId Name or ID of the feed.
         * @param packageName Name of the package (e.g., 'package' or 'package' for scoped '@scope/package').
         * @param packageVersion Version of the package.
         */
        downloadPackage(project: string | undefined, feedId: string, packageName: string, packageVersion: string): Promise<Buffer>;
    }
}

Object.assign(NpmApi.prototype, {
    async downloadPackage(this: NpmApi, project: string | undefined, feedId: string, packageName: string, packageVersion: string): Promise<Buffer> {
        return await this.client.getBinary([project, '_apis', 'packaging', 'feeds', feedId, 'npm', 'packages', ...packageName.split('/', 2), 'versions', packageVersion, 'content'], {
            'api-version': AzureDevOpsApiVersion,
        });
    },
});
