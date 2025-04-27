import { CommitsApi } from './CommitsApi';
import { GitCommitRef } from '../GitInterfaces';
import { AzureDevOpsApiVersion } from '../../constants';

type GitVersionOptions =
    /** First parent of commit (HEAD^) */
    'firstParent' |
    /** Not specified */
    'none' |
    /** Commit that changed item prior to the current version */
    'previousChange';

type GitVersionType =
    /** Interpret the version as a branch name */
    'branch' |
    /** Interpret the version as a commit ID (SHA1) */
    'commit' |
    /** Interpret the version as a tag name */
    'tag';

type GitHistoryMode =
    /** The history mode used by git log --first-parent */
    'firstParent' |
    /** The history mode used by git log --full-history */
    'fullHistory' |
    /** The history mode used by git log --full-history --simplify-merges */
    'fullHistorySimplifyMerges' |
    /** The history mode used by git log. This is the default. */
    'simplifiedHistory';

interface Options {
    /** Number of entries to skip. */
    'searchCriteria.$skip'?: number;
    /** Maximum number of entries to retrieve. */
    'searchCriteria.$top'?: number;
    /** Alias or display name of the author. */
    'searchCriteria.author'?: string;
    /** Version string identifier (name of tag/branch, SHA1 of commit) */
    'searchCriteria.compareVersion.version'?: string;
    /** Version options - Specify additional modifiers to version (e.g Previous) */
    'searchCriteria.compareVersion.versionOptions'?: GitVersionOptions;
    /** Version type (branch, tag, or commit). Determines how Id is interpreted */
    'searchCriteria.compareVersion.versionType'?: GitVersionType;
    /** Only applies when an itemPath is specified. This determines whether to exclude delete entries of the specified path. */
    'searchCriteria.excludeDeletes'?: boolean;
    /** If provided, a lower bound for filtering commits alphabetically */
    'searchCriteria.fromCommitId'?: string;
    /** If provided, only include history entries created after this date (string) */
    'searchCriteria.fromDate'?: string;
    /** What Git history mode should be used. This only applies to the search criteria when Ids = null and an itemPath is specified. */
    'searchCriteria.historyMode'?: GitHistoryMode;
    /** If provided, specifies the exact commit ids of the commits to fetch. May not be combined with other parameters. */
    'searchCriteria.ids'?: string[];
    /** Whether to include the _links field on the shallow references */
    'searchCriteria.includeLinks'?: boolean;
    /** Whether to include the push information */
    'searchCriteria.includePushData'?: boolean;
    /** Whether to include the image Url for committers and authors */
    'searchCriteria.includeUserImageUrl'?: boolean;
    /** Whether to include linked work items */
    'searchCriteria.includeWorkItems'?: boolean;
    /** Path of item to search under */
    'searchCriteria.itemPath'?: string;
    /** Version string identifier (name of tag/branch, SHA1 of commit) */
    'searchCriteria.itemVersion.version'?: string;
    /** Version options - Specify additional modifiers to version (e.g Previous) */
    'searchCriteria.itemVersion.versionOptions'?: GitVersionOptions;
    /** Version type (branch, tag, or commit). Determines how Id is interpreted */
    'searchCriteria.itemVersion.versionType'?: GitVersionType;
    /** If enabled, this option will ignore the itemVersion and compareVersion parameters */
    'searchCriteria.showOldestCommitsFirst'?: boolean;
    /** If provided, an upper bound for filtering commits alphabetically */
    'searchCriteria.toCommitId'?: string;
    /** If provided, only include history entries created before this date (string) */
    'searchCriteria.toDate'?: string;
    /** Alias or display name of the committer */
    'searchCriteria.user'?: string;
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
    async getCommits(this: CommitsApi, project: string | undefined, repositoryId: string, options?: Options): Promise<GitCommitRef[]> {
        return await this.client.getList<GitCommitRef>([project, '_apis', 'git', 'repositories', repositoryId, 'commits'], {
            ...options,
            'api-version': AzureDevOpsApiVersion,
        });
    },
});
