import { NpmApi } from './NpmApi';
import { NpmPackageVersion } from './NpmInterfaces';
import { AzureDevOpsApiVersion } from '../../constants';

declare module './NpmApi' {
    interface NpmApi {
        /**
         * Get information about an npm package version.
         *
         * The project parameter must be supplied if the feed was created in a project. If the feed is not associated with any project, omit the project parameter from the request.
         * @param project Project ID or project name
         * @param feedId Name or ID of the feed.
         * @param packageName Name of the package (e.g., 'package' or 'package' for scoped '@scope/package').
         * @param packageVersion Version of the package.
         */
        getPackageVersion(project: string | undefined, feedId: string, packageName: string, packageVersion: string): Promise<NpmPackageVersion>;
    }
}

Object.assign(NpmApi.prototype, {
    async getPackageVersion(this: NpmApi, project: string | undefined, feedId: string, packageName: string, packageVersion: string): Promise<NpmPackageVersion> {
        return await this.get<NpmPackageVersion>([project, '_apis', 'packaging', 'feeds', feedId, 'npm', ...packageName.split('/'), 'versions', packageVersion], {
            'api-version': AzureDevOpsApiVersion,
        });
    },
});
