import { FeedManagementApi } from './FeedManagementApi';
import { Feed, FeedRole } from '../ArtifactsInterfaces';

export interface Options {
  /** Filter by this role, either Administrator(4), Contributor(3), or Reader(2) level permissions. */
  feedRole?: FeedRole;
  /** Include upstreams that have been deleted in the response. */
  includeDeletedUpstreams?: boolean;
  /** Resolve names if true. */
  includeUrls?: boolean;
}

declare module './FeedManagementApi' {
  interface FeedManagementApi {
    getFeeds(project: string | undefined, options?: Options): Promise<Feed[]>;
  }
}

Object.assign(FeedManagementApi.prototype, {
  async getFeeds(this: FeedManagementApi, project: string | undefined, options: Options = {}): Promise<Feed[]> {
    return await this.getList<Feed>([project, '_apis', 'packaging', 'feeds'], {
      ...options,
      'api-version': '7.2-preview.1',
    });
  },
});