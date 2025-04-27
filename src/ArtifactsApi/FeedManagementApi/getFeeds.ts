import { FeedManagementApi } from './FeedManagementApi';
import { Feed } from '../ArtifactsInterfaces';

export interface Options {
  /** True to include feeds with 'Collection' visibility; otherwise, false. Default: unset (include all). */
  includeCollection?: boolean;
  /** True to include deleted feeds in the response; otherwise, false. Default: unset (exclude deleted). */
  includeDeleted?: boolean;
  /** True to include REST URLs with each feed; otherwise, false. Default: unset (include URLs). */
  includeUrls?: boolean;
}

declare module './FeedManagementApi' {
  interface FeedManagementApi {
    getFeeds(options?: Options): Promise<Feed[]>;
  }
}

Object.assign(FeedManagementApi.prototype, {
  async getFeeds(this: FeedManagementApi, options: Options = {}): Promise<Feed[]> {
    return await this.getList<Feed>(['_apis', 'packaging', 'feeds'], {
      ...options,
      'api-version': '7.2-preview.1',
    });
  },
});