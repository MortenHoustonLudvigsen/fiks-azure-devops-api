import { NpmApi } from './NpmApi';
import { AzureDevOpsApiVersion } from '../../constants';

/**
 * Represents the deletion state of an npm package version in the recycle bin.
 */
interface NpmPackageVersionDeletionState {
    /** The UTC date the package version was deleted. */
    deletedDate: string;
    /** The name of the package. */
    name: string;
    /** The version of the package. */
    version: string;
}

declare module './NpmApi' {
    interface NpmApi {
        /**
         * Get information about an npm package version in the recycle bin.
         *
         * The project parameter must be supplied if the feed was created in a project. If the feed is not associated with any project, omit the project parameter from the request.
         * @param project Project ID or project name
         * @param feedId Name or ID of the feed.
         * @param scope Optional scope for scoped packages (e.g., '@scope'). Specify undefined for unscoped packages.
         * @param packageName Name of the package (e.g., 'package' or 'package' for scoped '@scope/package').
         * @param packageVersion Version of the package.
         */
        getPackageVersionFromRecycleBin(project: string | undefined, feedId: string, scope: string | undefined, packageName: string, packageVersion: string): Promise<NpmPackageVersionDeletionState>;
    }
}

Object.assign(NpmApi.prototype, {
    async getPackageVersionFromRecycleBin(this: NpmApi, project: string | undefined, feedId: string, scope: string | undefined, packageName: string, packageVersion: string): Promise<NpmPackageVersionDeletionState> {
        return await this.get<NpmPackageVersionDeletionState>([project, '_apis', 'packaging', 'feeds', feedId, 'npm', 'RecycleBin', 'packages', scope, packageName, 'versions', packageVersion], {
            'api-version': AzureDevOpsApiVersion,
        });
    },
});
