import { RepositoriesApi } from './RepositoriesApi';
import { GitRepository } from '../GitInterfaces';
import { AzureDevOpsApiVersion } from '../../constants';

interface Options {
    /** True to include all remote URLs. The default value is false. */
    includeAllUrls?: boolean;
    /** True to include hidden repositories. The default value is false. */
    includeHidden?: boolean;
    /** True to include reference links. The default value is false. */
    includeLinks?: boolean;
}

declare module './RepositoriesApi' {
    interface RepositoriesApi {
        /**
         * Retrieve git repositories.
         *
         * The project parameter must be supplied if retrieving repositories for a specific project. If omitted, repositories across all projects in the organization are returned.
         * @param project Project ID or project name
         * @param options Optional parameters for the request
         */
        list(project: string | undefined, options?: Options): Promise<GitRepository[]>;
    }
}

Object.assign(RepositoriesApi.prototype, {
    async list(this: RepositoriesApi, project: string | undefined, options: Options = {}): Promise<GitRepository[]> {
        return await this.client.getList<GitRepository>([project, '_apis', 'git', 'repositories'], {
            ...options,
            'api-version': AzureDevOpsApiVersion,
        });
    },
});
