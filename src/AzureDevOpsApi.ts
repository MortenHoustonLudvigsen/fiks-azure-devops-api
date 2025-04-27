import { ArtifactsApi } from "./ArtifactsApi/ArtifactsApi.js";
import { GitApi } from "./GitApi/GitApi.js";

export class AzureDevOpsApi {
    constructor(organization: string, pat: string) {
        this.artifacts = new ArtifactsApi(organization, pat);
        this.git = new GitApi(organization, pat);
    }

    readonly artifacts: ArtifactsApi;
    readonly git: GitApi;
}
