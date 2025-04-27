/**
 * Represents an npm package version in Azure DevOps, including detailed metadata.
 */
export interface NpmPackageVersion {
    /** Related REST links. */
    _links: NpmReferenceLinks;
    /** Deprecated message, if any, for the package. */
    deprecateMessage: string;
    /** Package Id. */
    id: string;
    /** The display name of the package. */
    name: string;
    /** If and when the package was permanently deleted. */
    permanentlyDeletedDate: string;
    /** The history of upstream sources for this package. The first source in the list is the immediate source from which this package was saved. */
    sourceChain: NpmUpstreamSourceInfo[];
    /** If and when the package was deleted. */
    unpublishedDate: string;
    /** The version of the package. */
    version: string;
}

export interface NpmReferenceLinks {
    /** The readonly view of the links. Because Reference links are readonly, we only want to expose them as read only. */
    lnks: any;
}

export interface NpmUpstreamSourceInfo {
    /** Locator for connecting to the upstream source in a user friendly format, that may potentially change over time */
    displayLocation: string;
    /** Identity of the upstream source. */
    id: string;
    /** Locator for connecting to the upstream source */
    location: string;
    /** Display name. */
    name: string;
    /** Source type, such as Public or Internal. */
    sourceType: NpmPackagingSourceType;
}

export type NpmPackagingSourceType
    = /** Azure DevOps upstream source. */ 'internal' 
    | /** Publicly available source. */ 'public';
