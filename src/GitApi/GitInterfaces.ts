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
