import { FeedManagementApi } from './FeedManagementApi';
import { Feed } from '../ArtifactsInterfaces';
import { AzureDevOpsApiVersion } from '../../constants';

export interface Options {
  /** Include upstreams that have been deleted in the response. */
  includeDeletedUpstreams?: boolean;
}

declare module './FeedManagementApi' {
  interface FeedManagementApi {
    getFeed(project: string | undefined, feedId: string, options?: Options): Promise<Feed>;
  }
}

Object.assign(FeedManagementApi.prototype, {
  async getFeed(this: FeedManagementApi, project: string | undefined, feedId: string, options: Options = {}): Promise<Feed> {
    return await this.client.get<Feed>([project, '_apis', 'packaging', 'feeds', feedId], {
      ...options,
      'api-version': AzureDevOpsApiVersion
    });
  },
});
