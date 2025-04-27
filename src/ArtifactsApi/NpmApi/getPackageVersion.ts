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
         * @param scope Optional scope for scoped packages (e.g., '@scope'). Specify undefined for unscoped packages.
         * @param packageName Name of the package (e.g., 'package' or 'package' for scoped '@scope/package').
         * @param packageVersion Version of the package.
         */
        getPackageVersion(project: string | undefined, feedId: string, scope: string | undefined, packageName: string, packageVersion: string): Promise<NpmPackageVersion>;
    }
}

Object.assign(NpmApi.prototype, {
    async getPackageVersion(this: NpmApi, project: string | undefined, feedId: string, scope: string | undefined, packageName: string, packageVersion: string): Promise<NpmPackageVersion> {
        const pathSegments: (string | undefined)[] = [project, '_apis', 'packaging', 'feeds', feedId, 'npm', scope, packageName, 'versions', packageVersion];

        return await this.get<NpmPackageVersion>(pathSegments, {
            'api-version': AzureDevOpsApiVersion,
        });
    },
});
