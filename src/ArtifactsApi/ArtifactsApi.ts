import { DetailsApi } from "./DetailsApi/DetailsApi.js";

export class ArtifactsApi {
    constructor(organization: string, pat: string) {
        this.details = new DetailsApi(organization, pat);
    }

    readonly details: DetailsApi;
}