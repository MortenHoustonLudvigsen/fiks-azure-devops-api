import { DetailsApi } from './DetailsApi/DetailsApi.js';
import { FeedManagementApi } from './FeedManagementApi/FeedManagementApi.js';
import { NuGetApi } from './NuGetApi/NuGetApi.js';

export class ArtifactsApi {
    constructor(organization: string, pat: string) {
        this.details = new DetailsApi(organization, pat);
        this.feedManagement = new FeedManagementApi(organization, pat);
        this.nuget = new NuGetApi(organization, pat);
    }

    readonly details: DetailsApi;
    readonly feedManagement: FeedManagementApi;
    readonly nuget: NuGetApi;
}