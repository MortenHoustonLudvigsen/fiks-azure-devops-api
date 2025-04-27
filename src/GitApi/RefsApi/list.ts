import { RefsApi } from './RefsApi';
import { GitRef } from '../GitInterfaces';
import { AzureDevOpsApiVersion } from '../../constants';

interface Options {
    /** The maximum number of refs to return. */
    $top?: number;
    /** A continuation token for retrieving the next set of refs (for pagination). */
    continuationToken?: string;
    /** A filter to apply to the refs (e.g., 'refs/heads' for branches, 'refs/tags' for tags). */
    filter?: string;
    /** A filter to find refs containing the specified string in their name. */
    filterContains?: string;
    /** If true, include linked refs (e.g., branch heads). */
    includeLinks?: boolean;
    /** Includes only branches that the user owns, the branches the user favorites, and the default branch. The default value is false. Cannot be combined with the filter parameter. */
    includeMyBranches?: boolean;
    /** Includes up to the first 1000 commit statuses for each ref. The default value is false. */
    includeStatuses?: boolean;
    /** True to include only the tip commit status for each ref. This option requires includeStatuses to be true. The default value is false. */
    latestStatusesOnly?: boolean;
    /** Annotated tags will populate the PeeledObjectId property. default is false. */
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
        return await this.client.getList<GitRef>([project, '_apis', 'git', 'repositories', repositoryId, 'refs'], {
            ...options,
            'api-version': AzureDevOpsApiVersion,
        });
    },
});
