import { ApiBase } from '../../ApiBase';
import { AzureDevOpsHost } from '../../constants';

export class CommitsApi extends ApiBase {
    constructor(organization: string, pat: string) {
        super(organization, pat);
    }

    getBaseUrl(): string {
        const { organization } = this;
        return `https://${AzureDevOpsHost}/${organization}`;
    }
}