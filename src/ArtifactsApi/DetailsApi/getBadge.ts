import { AzureDevOpsApiVersion } from '../../constants';
import { DetailsApi } from './DetailsApi';

declare module './DetailsApi' {
  interface DetailsApi {
    /**
     * Generate a SVG badge for the latest version of a package.
     *
     * The generated SVG is typically used as the image in an HTML link which takes users to the feed containing the package to accelerate discovery and consumption.
     * 
     * The project parameter must be supplied if the feed was created in a project. If the feed is not associated with any project, omit the project parameter from the request.
     * @param project Project ID or project name
     * @param feedId Name or Id of the feed.
     * @param packageId Id of the package (GUID Id, not name).
     * @param options Options
     */
    getBadge(project: string | undefined, feedId: string, packageId: string): Promise<Buffer>;
  }
}

Object.assign(DetailsApi.prototype, {
  async getBadge(this: DetailsApi, project: string | undefined, feedId: string, packageId: string): Promise<Buffer> {
    return await this.client.getBinary([project, '_apis', 'public', 'packaging', 'Feeds', feedId, 'Packages', packageId, 'badge'], {
      'api-version': AzureDevOpsApiVersion
    });
  },
});