import { RepositoriesApi } from './RepositoriesApi/RepositoriesApi.js';
import { RefsApi } from './RefsApi/RefsApi.js';
import { CommitsApi } from './CommitsApi/CommitsApi.js';

export class GitApi {
    constructor(organization: string, pat: string) {
        this.repositories = new RepositoriesApi(organization, pat);
        this.refs = new RefsApi(organization, pat);
        this.commits = new CommitsApi(organization, pat);
    }

    readonly repositories: RepositoriesApi;
    readonly refs: RefsApi;
    readonly commits: CommitsApi;
}
