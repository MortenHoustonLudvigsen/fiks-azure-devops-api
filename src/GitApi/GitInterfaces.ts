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
 * Represents options for creating a Git repository.
 */
export interface GitRepositoryCreateOptions {
    /** The name of the repository. */
    name: string;
    /** The ID of the project in which to create the repository. */
    projectId: string;
}
