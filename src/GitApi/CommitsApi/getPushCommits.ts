import { CommitsApi } from './CommitsApi';
import { GitCommitRef } from '../GitInterfaces';
import { AzureDevOpsApiVersion } from '../../constants';

interface Options {
    /** The ID of the push. */
    pushId: number;
    /** Set to false to avoid including REST URL links for resources. Defaults to true. */
    includeLinks?: boolean;
    /** The number of commits to skip. */
    skip?: number;
    /** The maximum number of commits to return ("get the top x commits"). */
    top?: number;
}

declare module './CommitsApi' {
    interface CommitsApi {
        /**
         * Retrieve git commits associated with a specific push in a project.
         *
         * The project parameter must be supplied if retrieving commits for a specific project. If omitted, the push is assumed to be organization-scoped.
         * @param project Project ID or project name
         * @param repositoryId The ID or name of the repository
         * @param options Optional parameters for the request
         */
        getPushCommits(project: string | undefined, repositoryId: string, options: Options): Promise<GitCommitRef[]>;
    }
}

Object.assign(CommitsApi.prototype, {
    async getPushCommits(this: CommitsApi, project: string | undefined, repositoryId: string, options: Options): Promise<GitCommitRef[]> {
        return await this.client.getList<GitCommitRef>([project, '_apis', 'git', 'repositories', repositoryId, 'commits'], {
            ...options,
            'api-version': AzureDevOpsApiVersion,
        });
    },
});
