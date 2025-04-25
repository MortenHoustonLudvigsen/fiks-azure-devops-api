import { ArtifactsApi } from "./ArtifactsApi";

export class AzureDevOpsApi {
    constructor(organization: string, pat: string) {
        this.artifacts = new ArtifactsApi(organization, pat);
    }

    readonly artifacts: ArtifactsApi;
}