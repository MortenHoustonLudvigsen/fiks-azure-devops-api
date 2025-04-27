import { RepositoriesApi } from './RepositoriesApi';
import { GitRepository } from '../GitInterfaces';
import { AzureDevOpsApiVersion } from '../../constants';

declare module './RepositoriesApi' {
    interface RepositoriesApi {
        /**
         * Retrieve a git repository.
         *
         * The project parameter must be supplied if the repository is within a specific project. If omitted, the repository is assumed to be organization-scoped.
         * @param project Project ID or project name
         * @param repositoryId The ID or name of the repository
         */
        getRepository(project: string | undefined, repositoryId: string): Promise<GitRepository>;
    }
}

Object.assign(RepositoriesApi.prototype, {
    async getRepository(this: RepositoriesApi, project: string | undefined, repositoryId: string): Promise<GitRepository> {
        return await this.get<GitRepository>([project, '_apis', 'git', 'repositories', repositoryId], {
            'api-version': AzureDevOpsApiVersion,
        });
    },
});
