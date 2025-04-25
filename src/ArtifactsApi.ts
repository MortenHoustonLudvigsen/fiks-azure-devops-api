import { ApiBase } from "./ApiBase";
import { AzureDevOpsHost } from "./constants";


export class ArtifactsApi extends ApiBase {
    constructor(organization: string, pat: string) {
        super(organization, pat);
    }

    protected override getBaseUrl(): string {
        const { organization } = this;
        return `https://feeds.${AzureDevOpsHost}/${organization}`;
    }
}
