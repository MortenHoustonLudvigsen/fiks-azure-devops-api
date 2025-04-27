import { RefsApi } from './RefsApi';
import { GitRef, GitRefUpdate } from '../GitInterfaces';
import { AzureDevOpsApiVersion } from '../../constants';

interface Options {
    /** ID or name of the team project. Optional if specifying an ID for repository. */
    projectId?: string;
}

declare module './RefsApi' {
    interface RefsApi {
        /**
         * Update multiple git references for a project.
         *
         * The project parameter must be supplied if updating references for a specific project. If omitted, references are assumed to be organization-scoped.
         * @param project Project ID or project name
         * @param repositoryId The ID or name of the repository
         * @param options Optional parameters for the request
         * @param updates The reference updates to apply
         */
        updateRefs(project: string | undefined, repositoryId: string, options: Options | undefined, updates: GitRefUpdate[]): Promise<GitRef[]>;
    }
}

Object.assign(RefsApi.prototype, {
    async updateRefs(this: RefsApi, project: string | undefined, repositoryId: string, options: Options | undefined, updates: GitRefUpdate[]): Promise<GitRef[]> {
        return await this.client.patch<GitRef[]>([project, '_apis', 'git', 'repositories', repositoryId, 'refs'], {
            ...options,
            'api-version': AzureDevOpsApiVersion,
        }, updates);
    },
});

