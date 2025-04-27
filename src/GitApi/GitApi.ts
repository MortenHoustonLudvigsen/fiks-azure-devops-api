import { RepositoriesApi } from './RepositoriesApi/RepositoriesApi.js';
import { RefsApi } from './RefsApi/RefsApi.js';

export class GitApi {
    constructor(organization: string, pat: string) {
        this.repositories = new RepositoriesApi(organization, pat);
        this.refs = new RefsApi(organization, pat);
    }

    readonly repositories: RepositoriesApi;
    readonly refs: RefsApi;
}