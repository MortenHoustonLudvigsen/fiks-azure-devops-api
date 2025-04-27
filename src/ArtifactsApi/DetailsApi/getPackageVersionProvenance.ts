import { DetailsApi } from './DetailsApi';
import { Provenance } from '../ArtifactsInterfaces';

declare module './DetailsApi' {
  interface DetailsApi {
    /**
     * Gets provenance for a package version.
     *
     * The project parameter must be supplied if the feed was created in a project. If the feed is not associated with any project, omit the project parameter from the request.
     * @param project Project ID or project name
     * @param feedId Name or Id of the feed.
     * @param packageId Id of the package (GUID Id, not name).
     * @param packageVersionId Id of the package version (GUID Id, not name).
     */
    getPackageVersionProvenance(project: string | undefined, feedId: string, packageId: string, packageVersionId: string): Promise<Provenance>;
  }
}

Object.assign(DetailsApi.prototype, {
  async getPackageVersionProvenance(this: DetailsApi, project: string | undefined, feedId: string, packageId: string, packageVersionId: string): Promise<Provenance> {
    return await this.get<Provenance>([project, '_apis', 'packaging', 'Feeds', feedId, 'Packages', packageId, 'Versions', packageVersionId, 'provenance'], {
      'api-version': '7.2-preview.1',
    });
  },
});
