import { CommitsApi } from './CommitsApi';
import { GitCommitRef } from '../GitInterfaces';
import { AzureDevOpsApiVersion } from '../../constants';

interface Options {
    /** The number of changes to include in the result. */
    changeCount?: number;
}

declare module './CommitsApi' {
    interface CommitsApi {
        /**
         * Retrieve a specific git commit for a project.
         *
         * The project parameter must be supplied if retrieving a commit for a specific project. If omitted, the commit is assumed to be organization-scoped.
         * @param project Project ID or project name
         * @param repositoryId The ID or name of the repository
         * @param commitId The ID (SHA-1 hash) of the commit
         * @param options Optional parameters for the request
         */
        get(project: string | undefined, repositoryId: string, commitId: string, options?: Options): Promise<GitCommitRef>;
    }
}

Object.assign(CommitsApi.prototype, {
    async get(this: CommitsApi, project: string | undefined, repositoryId: string, commitId: string, options?: Options): Promise<GitCommitRef> {
        return await this.client.get<GitCommitRef>([project, '_apis', 'git', 'repositories', repositoryId, 'commits', commitId], {
            ...options,
            'api-version': AzureDevOpsApiVersion,
        });
    },
});
