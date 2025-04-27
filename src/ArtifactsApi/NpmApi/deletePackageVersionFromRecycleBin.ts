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
         * @param scope Optional scope for scoped packages (e.g., '@scope'). Specify undefined for unscoped packages.
         * @param packageName Name of the package (e.g., 'package' or 'package' for scoped '@scope/package').
         * @param packageVersion Version of the package.
         */
        deletePackageVersionFromRecycleBin(project: string | undefined, feedId: string, scope: string | undefined, packageName: string, packageVersion: string): Promise<void>;
    }
}

Object.assign(NpmApi.prototype, {
    async deletePackageVersionFromRecycleBin(this: NpmApi, project: string | undefined, feedId: string, scope: string | undefined, packageName: string, packageVersion: string): Promise<void> {
        await this.delete([project, '_apis', 'packaging', 'feeds', feedId, 'npm', 'RecycleBin', 'packages', scope, packageName, 'versions', packageVersion], {
            'api-version': AzureDevOpsApiVersion,
        });
    },
});
