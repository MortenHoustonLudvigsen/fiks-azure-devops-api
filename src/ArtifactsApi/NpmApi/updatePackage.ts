import { NpmApi } from './NpmApi';
import { JsonPatchOperation } from '../NuGetApi/JsonPatchOperation';
import { AzureDevOpsApiVersion } from '../../constants';

/**
 * Represents details for updating an npm package version.
 */
interface NpmPackageVersionDetails {
    /** The deprecation message for the package version. */
    deprecateMessage?: string;
    /** JSON Patch operation to add or remove the package version from a view. */
    views?: JsonPatchOperation;
}

declare module './NpmApi' {
    interface NpmApi {
        /**
         * Update the state of an npm package version.
         *
         * The project parameter must be supplied if the feed was created in a project. If the feed is not associated with any project, omit the project parameter from the request.
         * @param project Project ID or project name
         * @param feedId Name or ID of the feed.
         * @param packageName Name of the package (e.g., 'package' or '@scope/package' for scoped packages).
         * @param packageVersion Version of the package.
         * @param details Details for updating the package version (e.g., deprecateMessage or views)
         */
        updatePackage(project: string | undefined, feedId: string, packageName: string, packageVersion: string, details: NpmPackageVersionDetails): Promise<void>;
    }
}

Object.assign(NpmApi.prototype, {
    async updatePackage(this: NpmApi, project: string | undefined, feedId: string, packageName: string, packageVersion: string, details: NpmPackageVersionDetails): Promise<void> {
        await this.patch([project, '_apis', 'packaging', 'feeds', feedId, 'npm', 'packages', ...packageName.split('/', 2), 'versions', packageVersion], {
            'api-version': AzureDevOpsApiVersion,
        }, details);
    },
});
