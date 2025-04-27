import { RepositoriesApi } from './RepositoriesApi';
import { GitRepository } from '../GitInterfaces.js';
import { AzureDevOpsApiVersion } from '../../constants';

export interface Options {
    /** True to include all remote URLs. The default value is false. */
    includeAllUrls?: boolean;
    /** True to include hidden repositories. The default value is false. */
    includeHidden?: boolean;
    /** True to include reference links. The default value is false. */
    includeLinks?: boolean;
}

declare module './RepositoriesApi' {
    interface RepositoriesApi {
        getRepositories(this: RepositoriesApi, project: string, options?: Options): Promise<GitRepository[]>;
    }
}

Object.assign(RepositoriesApi.prototype, {
    async getRepositories(this: RepositoriesApi, project: string, options: Options = {}): Promise<GitRepository[]> {
        return await this.getList<GitRepository>([project, '_apis', 'git', 'repositories'], {
            ...options,
            'api-version': AzureDevOpsApiVersion 
        });
    }
});
