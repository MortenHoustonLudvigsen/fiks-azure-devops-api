import { RepositoriesApi } from "./RepositoriesApi/RepositoriesApi.js";

export class GitApi {
    constructor(organization: string, pat: string) {
        this.details = new RepositoriesApi(organization, pat);
    }

    readonly details: RepositoriesApi;
}
