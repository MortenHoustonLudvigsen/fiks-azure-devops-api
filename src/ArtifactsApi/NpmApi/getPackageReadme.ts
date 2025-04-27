import { NpmApi } from './NpmApi';
import { AzureDevOpsApiVersion } from '../../constants';

declare module './NpmApi' {
    interface NpmApi {
        /**
         * Get the README content for an npm package version.
         *
         * The project parameter must be supplied if the feed was created in a project. If the feed is not associated with any project, omit the project parameter from the request.
         * @param project Project ID or project name
         * @param feedId Name or ID of the feed.
         * @param packageName Name of the package (e.g., 'package' or '@scope/package' for scoped packages).
         * @param packageVersion Version of the package.
         * @returns The README content as HTML text.
         */
        getPackageReadme(project: string | undefined, feedId: string, packageName: string, packageVersion: string): Promise<string>;
    }
}

Object.assign(NpmApi.prototype, {
    async getPackageReadme(this: NpmApi, project: string | undefined, feedId: string, packageName: string, packageVersion: string): Promise<string> {
        const response = await this.client.getBinary([project, '_apis', 'packaging', 'feeds', feedId, 'npm', 'packages', ...packageName.split('/', 2), 'versions', packageVersion, 'readme'], {
            'api-version': AzureDevOpsApiVersion,
        });
        return response.toString('utf8');
    },
});
