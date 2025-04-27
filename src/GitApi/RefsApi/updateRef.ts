import { RefsApi } from './RefsApi';
import { GitRef, GitRefUpdate } from '../GitInterfaces';
import { AzureDevOpsApiVersion } from '../../constants';

interface Options {
    /** The name of the branch to lock/unlock - required */
    filter: string;
    /** ID or name of the team project. Optional if specifying an ID for repository. */
    projectId?: string;
}

declare module './RefsApi' {
    interface RefsApi {
        /**
         * Update a single git reference for a project.
         *
         * The project parameter must be supplied if updating a reference for a specific project. If omitted, the reference is assumed to be organization-scoped.
         * @param project Project ID or project name
         * @param repositoryId The ID or name of the repository
         * @param options Optional parameters for the request
         * @param update The reference update to apply
         */
        updateRef(project: string | undefined, repositoryId: string, options: Options, update: GitRefUpdate): Promise<GitRef>;
    }
}

Object.assign(RefsApi.prototype, {
    async updateRef(this: RefsApi, project: string | undefined, repositoryId: string, refName: string, options: Options, update: GitRefUpdate): Promise<GitRef> {
        return await this.client.patch<GitRef>([project, '_apis', 'git', 'repositories', repositoryId, 'refs'], {
            ...options,
            'api-version': AzureDevOpsApiVersion,
        }, update);
    },
});
