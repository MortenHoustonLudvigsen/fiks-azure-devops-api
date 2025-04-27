import { RefsApi } from './RefsApi';
import { GitRef } from '../GitInterfaces';
import { AzureDevOpsApiVersion } from '../../constants';

interface Options {
    /** A filter to apply to the refs (e.g., 'refs/heads' for branches, 'refs/tags' for tags). */
    filter?: string;
    /** If true, include refs that have been deleted. */
    includeDeleted?: boolean;
    /** If true, include linked refs (e.g., branch heads). */
    includeLinks?: boolean;
    /** If true, peel refs to their target commits. */
    peelTags?: boolean;
}

declare module './RefsApi' {
    interface RefsApi {
        /**
         * Retrieve git references for a project.
         *
         * The project parameter must be supplied if retrieving references for a specific project. If omitted, references across all projects in the organization are returned.
         * @param project Project ID or project name
         * @param repositoryId The ID or name of the repository
         * @param options Optional parameters for the request
         */
        list(project: string | undefined, repositoryId: string, options?: Options): Promise<GitRef[]>;
    }
}

Object.assign(RefsApi.prototype, {
    async list(this: RefsApi, project: string | undefined, repositoryId: string, options: Options = {}): Promise<GitRef[]> {
        return await this.get<GitRef[]>([project, '_apis', 'git', 'repositories', repositoryId, 'refs'], {
            ...options,
            'api-version': AzureDevOpsApiVersion,
        });
    },
});
