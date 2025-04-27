import { RepositoriesApi } from "./RepositoriesApi/RepositoriesApi.js";

export class GitApi {
    constructor(organization: string, pat: string) {
        this.repositories = new RepositoriesApi(organization, pat);
    }

    readonly repositories: RepositoriesApi;
}