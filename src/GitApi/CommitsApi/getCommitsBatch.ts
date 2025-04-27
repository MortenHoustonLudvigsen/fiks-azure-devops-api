import { CommitsApi } from './CommitsApi';
import { GitCommitRef, GitCommitsBatchRequest } from '../GitInterfaces';
import { AzureDevOpsApiVersion } from '../../constants';

interface Options {
    /** Number of commits to skip. The value cannot exceed 3,000,000. */
    $skip?: number;
    /** Maximum number of commits to return. The value cannot exceed 50,000. */
    $top?: number;
    /** True to include additional commit status information. */
    includeStatuses?: boolean;
}

declare module './CommitsApi' {
    interface CommitsApi {
        /**
         * Retrieve a batch of git commits for a project.
         *
         * The project parameter must be supplied if retrieving commits for a specific project. If omitted, commits are assumed to be organization-scoped.
         * @param project Project ID or project name
         * @param repositoryId The ID or name of the repository
         * @param request The batch request specifying commits to retrieve
         * @param options Optional parameters for the request
         */
        getCommitsBatch(project: string | undefined, repositoryId: string, options: Options | undefined, request: GitCommitsBatchRequest): Promise<GitCommitRef[]>;
    }
}

Object.assign(CommitsApi.prototype, {
    async getCommitsBatch(this: CommitsApi, project: string | undefined, repositoryId: string, options: Options | undefined, request: GitCommitsBatchRequest): Promise<GitCommitRef[]> {
        return await this.client.post<GitCommitRef[]>([project, '_apis', 'git', 'repositories', repositoryId, 'commitsbatch'], {
            ...options,
            'api-version': AzureDevOpsApiVersion,
        }, request);
    },
});
