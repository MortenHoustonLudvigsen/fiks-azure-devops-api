/**
 * Represents a Git repository in Azure DevOps.
 */
export interface GitRepository {
    /** The unique ID of the repository. */
    id: string;
    /** The name of the repository. */
    name: string;
    /** The URL to the repository. */
    url: string;
    /** The project associated with the repository. */
    project: {
        id: string;
        name: string;
        state: string;
        visibility: string;
    };
    /** The default branch of the repository (e.g., 'refs/heads/main'). */
    defaultBranch?: string;
    /** The size of the repository in bytes. */
    size: number;
    /** The remote URL for cloning the repository. */
    remoteUrl: string;
    /** The SSH URL for cloning the repository. */
    sshUrl: string;
    /** The web URL for browsing the repository. */
    webUrl: string;
    /** Indicates whether the repository is disabled. */
    isDisabled?: boolean;
}

/**
 * Represents a shallow reference to a TeamProject.
 */
export interface TeamProjectReference {
    /** Project abbreviation. */
    abbreviation?: string;
    /** Url to default team identity image. */
    defaultTeamImageUrl?: string;
    /** The project's description (if any). */
    description?: string;
    /** Project identifier. */
    id?: string;
    /** Project last update time. */
    lastUpdateTime?: string;
    /** Project name. */
    name?: string;
    /** Project revision. */
    revision?: number;
    /** Project state. */
    state?: ProjectState;
    /** Url to the full version of the object. */
    url?: string;
    /** Project visibility. */
    visibility?: ProjectVisibility;
}

/**
 * Represents the state of a project.
 */
export type ProjectState =
    /** All project states (used for filtering). */
    'all' |
    /** The project is in the process of being deleted. */
    'deleting' |
    /** The project is being created. */
    'new' |
    /** The project has not changed. */
    'unchanged' |
    /** The project is fully created and operational. */
    'wellFormed';

/**
 * Represents the visibility of a project.
 */
export type ProjectVisibility =
    /** The project is private, accessible only to authorized users. */
    'private' |
    /** The project is public, accessible to anyone. */
    'public';

/**
 * Represents a reference to a parent Git repository for forking.
 */
export interface GitRepositoryRef {
    /** The ID of the parent repository. */
    id: string;
    /** The project ID of the parent repository. */
    projectId: string;
}

/**
 * Represents a reference to a Git commit.
 */
export interface GitCommitRef {
    /** The ID (SHA-1 hash) of the commit. */
    commitId: string;
    /** The URL to the commit. */
    url: string;
    /** The author of the commit. */
    author: {
        /** The name of the author. */
        name: string;
        /** The email of the author. */
        email: string;
        /** The timestamp of the author’s commit. */
        date: string;
    };
    /** The committer of the commit. */
    committer: {
        /** The name of the committer. */
        name: string;
        /** The email of the committer. */
        email: string;
        /** The timestamp of the commit. */
        date: string;
    };
    /** The commit message. */
    comment: string;
    /** The number of changes in the commit. */
    changeCounts: {
        /** Number of added files. */
        add: number;
        /** Number of edited files. */
        edit: number;
        /** Number of deleted files. */
        delete: number;
    };
}

/**
 * Represents a Git reference (e.g., branch or tag).
 */
export interface GitRef {
    /** The name of the reference (e.g., 'refs/heads/main'). */
    name: string;
    /** The object ID (SHA-1 hash) the reference points to. */
    objectId: string;
    /** The creator of the reference. */
    creator: {
        /** The display name of the creator. */
        displayName: string;
        /** The unique ID of the creator. */
        uniqueName: string;
    };
    /** The URL to the reference. */
    url: string;
}

/**
 * Represents an update to a Git reference.
 */
export interface GitRefUpdate {
    /** Indicates whether the reference is locked. */
    isLocked?: boolean;
    /** The name of the reference to update (e.g., 'refs/heads/main'). */
    name: string;
    /** The new object ID (SHA-1 hash) the reference should point to. */
    newObjectId: string;
    /** The current object ID (SHA-1 hash) the reference points to, for optimistic locking. */
    oldObjectId: string;
    /** The ID of the repository. */
    repositoryId?: string;
}

/**
 * Represents a change in a Git commit.
 */
export interface GitChange {
    /** The type of change (e.g., add, edit, delete). */
    changeType: 'add' | 'edit' | 'delete' | 'rename' | 'sourceRename' | 'targetRename' | 'undelete';
    /** The path of the item affected by the change. */
    item: {
        /** The path of the item. */
        path: string;
        /** The Git object ID (if applicable). */
        gitObjectId?: string;
        /** The type of item (e.g., file, folder). */
        objectType?: 'blob' | 'tree';
    };
    /** The URL to the change details. */
    url: string;
}

/**
 * Represents a request to retrieve a batch of commits.
 */
export interface GitCommitsBatchRequest {
    /** The IDs of the commits to retrieve. */
    commitIds: string[];
    /** If specified, filter commits affecting this path. */
    itemPath?: string;
    /** If specified, filter commits for this version. */
    itemVersion?: {
        /** Version string (e.g., branch name, tag, or commit ID). */
        version: string;
        /** Version type (branch, tag, or commit). */
        versionType: 'branch' | 'tag' | 'commit';
        /** Version options (e.g., firstParent, previousChange). */
        versionOptions?: 'firstParent' | 'none' | 'previousChange';
    };
}
