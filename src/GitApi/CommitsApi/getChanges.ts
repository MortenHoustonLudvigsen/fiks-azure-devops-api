import { CommitsApi } from './CommitsApi';
import { GitChange } from '../GitInterfaces';
import { AzureDevOpsApiVersion } from '../../constants';

interface Options {
    /** The maximum number of changes to return. */
    top?: number;
    /** The number of changes to skip before returning results. */
    skip?: number;
}

interface GitCommitChanges {
    changeCounts: any;
    changes: GitChange[];
}

declare module './CommitsApi' {
    interface CommitsApi {
        /**
         * Retrieve changes for a specific git commit in a project.
         *
         * The project parameter must be supplied if retrieving changes for a specific project. If omitted, the commit is assumed to be organization-scoped.
         * @param project Project ID or project name
         * @param repositoryId The ID or name of the repository
         * @param commitId The ID (SHA-1 hash) of the commit
         * @param options Optional parameters for the request
         */
        getChanges(project: string | undefined, repositoryId: string, commitId: string, options?: Options): Promise<GitChange[]>;
    }
}

Object.assign(CommitsApi.prototype, {
    async getChanges(this: CommitsApi, project: string | undefined, repositoryId: string, commitId: string, options: Options = {}): Promise<GitChange[]> {
        const result = await this.client.get<GitCommitChanges>([project, '_apis', 'git', 'repositories', repositoryId, 'commits', commitId, 'changes'], {
            ...options,
            'api-version': AzureDevOpsApiVersion,
        });
        return result.changes;
    },
});
