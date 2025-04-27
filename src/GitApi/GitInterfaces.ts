export interface GitRepository {
    id: string;
    name: string;
    url: string;
    project: {
        id: string;
        name: string;
    };
    defaultBranch: string;
    size: number;
    remoteUrl: string;
    sshUrl: string;
    webUrl: string;
}
