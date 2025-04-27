import { CommitsApi } from './CommitsApi';
import { GitCommitRef } from '../GitInterfaces';
import { AzureDevOpsApiVersion } from '../../constants';

interface Options {
    /** If specified, only commits authored by this user are returned. */
    author?: string;
    /** If true, include push and commit information for commits. */
    includePushData?: boolean;
    /** The ID or name of the source branch to retrieve commits from. */
    fromBranch?: string;
    /** The ID or name of the target branch to retrieve commits to. */
    toBranch?: string;
    /** The maximum number of commits to return. */
    top?: number;
    /** The commit ID to start listing commits from. */
    fromCommitId?: string;
    /** The commit ID to end listing commits at. */
    toCommitId?: string;
    /** If true, include commits that have been deleted. */
    includeDeleted?: boolean;
}

declare module './CommitsApi' {
    interface CommitsApi {
        /**
         * Retrieve git commits for a project.
         *
         * The project parameter must be supplied if retrieving commits for a specific project. If omitted, commits across all projects in the organization are returned.
         * @param project Project ID or project name
         * @param repositoryId The ID or name of the repository
         * @param options Optional parameters for the request
         */
        getCommits(project: string | undefined, repositoryId: string, options?: Options): Promise<GitCommitRef[]>;
    }
}

Object.assign(CommitsApi.prototype, {
    async getCommits(this: CommitsApi, project: string | undefined, repositoryId: string, options: Options = {}): Promise<GitCommitRef[]> {
        return await this.client.getList<GitCommitRef>([project, '_apis', 'git', 'repositories', repositoryId, 'commits'], {
            ...options,
            'api-version': AzureDevOpsApiVersion,
        });
    },
});