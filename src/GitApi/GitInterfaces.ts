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
 * Project state.
 */
export interface ProjectState {
    // Grok: Please implement
}

/**
 * Project visibility.
 */
export interface ProjectVisibility {
    // Grok: Please implement
}

export interface GitRepositoryRef {
    // Grok: Please implement
}
