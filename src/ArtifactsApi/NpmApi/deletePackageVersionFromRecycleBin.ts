import { NpmApi } from './NpmApi';
import { AzureDevOpsApiVersion } from '../../constants';

declare module './NpmApi' {
    interface NpmApi {
        /**
         * Permanently delete an npm package version from a feed's recycle bin.
         *
         * The project parameter must be supplied if the feed was created in a project. If the feed is not associated with any project, omit the project parameter from the request.
         * @param project Project ID or project name
         * @param feedId Name or ID of the feed.
         * @param packageName Name of the package (e.g., 'package' or '@scope/package' for scoped packages).
         * @param packageVersion Version of the package.
         */
        deletePackageVersionFromRecycleBin(project: string | undefined, feedId: string, packageName: string, packageVersion: string): Promise<void>;
    }
}

Object.assign(NpmApi.prototype, {
    async deletePackageVersionFromRecycleBin(this: NpmApi, project: string | undefined, feedId: string, packageName: string, packageVersion: string): Promise<void> {
        await this.client.delete([project, '_apis', 'packaging', 'feeds', feedId, 'npm', 'RecycleBin', 'packages', ...packageName.split('/', 2), 'versions', packageVersion], {
            'api-version': AzureDevOpsApiVersion,
        });
    },
});