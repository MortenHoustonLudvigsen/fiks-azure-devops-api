import { RefsApi } from './RefsApi';
import { GitRef } from '../GitInterfaces';
import { AzureDevOpsApiVersion } from '../../constants';

declare module './RefsApi' {
    interface RefsApi {
        /**
         * Retrieve a specific git reference for a project.
         *
         * The project parameter must be supplied if retrieving a reference for a specific project. If omitted, the reference is assumed to be organization-scoped.
         * @param project Project ID or project name
         * @param repositoryId The ID or name of the repository
         * @param refName The name of the reference (e.g., 'refs/heads/main')
         */
        get(project: string | undefined, repositoryId: string, refName: string): Promise<GitRef>;
    }
}

Object.assign(RefsApi.prototype, {
    async get(this: RefsApi, project: string | undefined, repositoryId: string, refName: string): Promise<GitRef> {
        return await this.client.get<GitRef>([project, '_apis', 'git', 'repositories', repositoryId, 'refs', refName], {
            'api-version': AzureDevOpsApiVersion,
        });
    },
});
