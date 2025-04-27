import { AzureDevOpsHttpClient } from "./AzureDevOpsHttpClient";

export abstract class ApiBase {
    constructor(readonly organization: string, readonly pat: string) { }
    abstract getBaseUrl(): string;
    protected readonly client = new AzureDevOpsHttpClient(this);
}
