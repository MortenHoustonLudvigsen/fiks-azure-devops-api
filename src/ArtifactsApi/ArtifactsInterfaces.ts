/**
 * The role assigned to an identity for a feed, defining permission levels.
 */
export type FeedRole =
    /** Administrators have total control over the feed. */
    'administrator' |
    /** Collaborators have the same permissions as readers, but can also ingest packages from configured upstream sources. */
    'collaborator' |
    /** Contributors can do anything to packages in the feed including adding new packages; however, they may not modify feed settings. */
    'contributor' |
    /** Unsupported */
    'custom' |
    /** Unsupported */
    'none' |
    /** Readers can only read packages and view settings. */
    'reader';

/**
 * A collection of REST reference links for an entity, mapping link names to URLs.
 */
export type ReferenceLinks = { [key: string]: { href: string } };

/**
 * The type of a feed view, defining its behavior.
 */
export type FeedViewType =
    /** Implicit view created automatically for a feed. */
    'implicit' |
    /** No specific view type. */
    'none' |
    /** Release view for promoting stable packages. */
    'release';

/**
 * The visibility level of a feed, controlling access.
 */
export type FeedVisibility =
    /** Feed is accessible by all valid users in the collection where the feed resides. */
    'collection' |
    /** Feed is accessible by all valid users in the organization where the feed resides. */
    'organization' |
    /** Only accessible by permissions explicitly set by the feed administrator. */
    'private';

/**
 * Capabilities or flags associated with a feed.
 */
export type FeedCapabilities =
    /** The capabilities given to a newly created feed. */
    'defaultCapabilities' |
    /** No flags exist for this feed. */
    'none' |
    /** This feed is currently under maintenance and may have reduced functionality. */
    'underMaintenance' |
    /** This feed can serve packages from upstream sources. Upstream packages must be manually promoted to views. */
    'upstreamV2';

/**
 * The type of an upstream source for a feed.
 */
export type UpstreamSourceType =
    /** Internal Azure DevOps feed. */
    'internal' |
    /** Public package registry (e.g., npmjs.com, nuget.org). */
    'public';

/**
 * Represents a feed in Azure DevOps, which is a container for packages.
 */
export interface Feed {
    /** The class to represent a collection of REST reference links. */
    _links: ReferenceLinks;
    /** If set, this feed supports generation of package badges. */
    badgesEnabled: boolean;
    /** Capabilities or flags associated with the feed. */
    capabilities: FeedCapabilities;
    /** The view that the feed administrator has indicated is the default experience for readers. */
    defaultViewId: string;
    /** The date that this feed was deleted. */
    deletedDate: string;
    /** A description for the feed. Descriptions must not exceed 255 characters. */
    description: string;
    /** This will either be the feed GUID or the feed GUID and view GUID depending on how the feed was accessed. */
    fullyQualifiedId: string;
    /** The fully qualified name of the feed. */
    fullyQualifiedName: string;
    /** If set, feed will hide all deleted/unpublished versions. */
    hideDeletedPackageVersions: boolean;
    /** A GUID that uniquely identifies this feed. */
    id: string;
    /** If set, all packages in the feed are immutable. It is important to note that feed views are immutable; therefore, this flag will always be set for views. */
    isReadOnly: boolean;
    /** A name for the feed. Feed names must follow these rules: Must not exceed 64 characters, must not contain whitespaces, must not start with an underscore or a period, must not end with a period, must not contain any of the following illegal characters: <![CDATA[ @, ~, ;, {, }, , +, =, <, >, |, /, \, ?, :, &, $, *, "", #, [, ] ]]> */
    name: string;
    /** Permissions assigned to identities for this feed. */
    permissions: FeedPermission[];
    /** OBSOLETE: This should always be true. Setting to false will override all sources in UpstreamSources. */
    upstreamEnabled: boolean;
    /** If set, time that the UpstreamEnabled property was changed. Will be null if UpstreamEnabled was never changed after Feed creation. */
    upstreamEnabledChangedDate: string;
    /** A list of sources that this feed will fetch packages from. An empty list indicates that this feed will not search any additional sources for packages. */
    upstreamSources: UpstreamSource[];
    /** The URL of the base feed in GUID form. */
    url: string;
    /** Feed view associated with this feed. */
    view: FeedView;
    /** The GUID of the view associated with this feed. */
    viewId: string;
    /** The name of the view associated with this feed. */
    viewName: string;
}

/**
 * Represents a view within a feed, used to organize packages.
 */
export interface FeedView {
    /** The class to represent a collection of REST reference links. */
    _links: ReferenceLinks;
    /** The GUID of the view. */
    id: string;
    /** The name of the view. */
    name: string;
    /** The type of the view. */
    type: FeedViewType;
    /** The URL of the view. */
    url: string;
    /** The visibility level of the view. */
    visibility: FeedVisibility;
}

/**
 * Represents a permission assigned to an identity for a feed.
 */
export interface FeedPermission {
    /** Display name for the identity. */
    displayName: string;
    /** An Identity descriptor is a wrapper for the identity type (Windows SID, Passport) along with a unique identifier such as the SID or PUID. */
    identityDescriptor: IdentityDescriptor;
    /** The GUID of the identity. */
    identityId: string;
    /** The role for this identity. Administrators have total control over the feed. Contributors can do anything to packages in the feed including adding new packages; however, they may not modify feed settings. Readers can only read packages and view settings. */
    role: FeedRole;
}

/**
 * Represents an identity descriptor for a feed permission.
 */
export interface IdentityDescriptor {
    /** The unique identifier for this identity, not exceeding 256 chars, which will be persisted. */
    identifier: string;
    /** Type of descriptor (for example, Windows, Passport, etc.). */
    identityType: string;
}

/**
 * Represents an upstream source from which a feed can fetch packages.
 */
export interface UpstreamSource {
    /** UTC date that this upstream source was deleted. */
    deletedDate: string;
    /** The GUID of the upstream source. */
    id: string;
    /** The collection ID of the internal upstream, if applicable. */
    internalUpstreamCollectionId: string;
    /** The feed ID of the internal upstream, if applicable. */
    internalUpstreamFeedId: string;
    /** The view ID of the internal upstream, if applicable. */
    internalUpstreamViewId: string;
    /** The location of the upstream source (e.g., URL). */
    location: string;
    /** The name of the upstream source. */
    name: string;
    /** The protocol of the upstream source (e.g., npm, nuget). */
    protocol: string;
    /** The type of the upstream source. */
    upstreamSourceType: UpstreamSourceType;
}

/**
 * Represents a package version in Azure DevOps, including detailed metadata.
 */
export interface PackageVersion {
    /** Related links. */
    _links: ReferenceLinks;
    /** Package version author. */
    author: string;
    /** UTC date that this package version was deleted. */
    deletedDate: string;
    /** List of dependencies for this package version. */
    dependencies: PackageDependency[];
    /** Package version description. */
    description: string;
    /** Upstream source this package was ingested from. */
    directUpstreamSourceId: string;
    /** Files associated with this package version, only relevant for multi-file package types. */
    files: PackageFile[];
    /** Id for the package. */
    id: string;
    /** [Obsolete] Used for legacy scenarios and may be removed in future versions. */
    isCachedVersion: boolean;
    /** True if this package has been deleted. */
    isDeleted: boolean;
    /** True if this is the latest version of the package by package type sort order. */
    isLatest: boolean;
    /** (NuGet Only) True if this package is listed. */
    isListed: boolean;
    /** Normalized version using normalization rules specific to a package type. */
    normalizedVersion: string;
    /** Other versions of this package. */
    otherVersions: MinimalPackageVersion[];
    /** Package description. */
    packageDescription: string;
    /** Extended data specific to a package type. */
    protocolMetadata: ProtocolMetadata;
    /** UTC Date the package was published to the service. */
    publishDate: string;
    /** List of upstream sources through which a package version moved to land in this feed. */
    sourceChain: UpstreamSource[];
    /** Internal storage id. */
    storageId: string;
    /** Package version summary. */
    summary: string;
    /** Package version tags. */
    tags: string[];
    /** Package version URL. */
    url: string;
    /** Display version. */
    version: string;
    /** List of views containing this package version. */
    views: FeedView[];
}

/**
 * Represents a dependency of a package version.
 */
export interface PackageDependency {
    /** Dependency package group (an optional classification within some package types). */
    group: string;
    /** Dependency package name. */
    packageName: string;
    /** Dependency package version range. */
    versionRange: string;
}

/**
 * Represents a file associated with a package version.
 */
export interface PackageFile {
    /** Hierarchical representation of files. */
    children: PackageFile[];
    /** File name. */
    name: string;
    /** Extended data unique to a specific package type. */
    protocolMetadata: ProtocolMetadata;
}

/**
 * Represents extended metadata for a specific package type.
 */
export interface ProtocolMetadata {
    /** Extended metadata for a specific package type, formatted to the associated schema version definition. */
    data: any;
    /** Schema version. */
    schemaVersion: number;
}

/**
 * Represents a package in Azure DevOps, including metadata and versions.
 */
export interface Package {
    /** The class to represent a collection of REST reference links. */
    _links: ReferenceLinks;
    /** The GUID of the package. */
    id: string;
    /** True if this package is cached from an upstream source. */
    isCached: boolean;
    /** The display name of the package. */
    name: string;
    /** The normalized name representing the identity of this package for this protocol type. */
    normalizedName: string;
    /** The protocol type of the package (e.g., npm, nuget). */
    protocolType: string;
    /** The number of stars or ratings for the package. */
    starCount: number;
    /** The URL of the package. */
    url: string;
    /** List of versions of this package. */
    versions: MinimalPackageVersion[];
}

/**
 * Represents a minimal version of a package, used in lists.
 */
export interface MinimalPackageVersion {
    /** The upstream source ID from which this version was ingested. */
    directUpstreamSourceId: string;
    /** The GUID of the package version. */
    id: string;
    /** [Obsolete] Used for legacy scenarios and may be removed in future versions. */
    isCachedVersion: boolean;
    /** True if this version has been deleted. */
    isDeleted: boolean;
    /** True if this is the latest version of the package. */
    isLatest: boolean;
    /** (NuGet Only) True if this version is listed. */
    isListed: boolean;
    /** The normalized version representing the identity of a package version. */
    normalizedVersion: string;
    /** Package version description. */
    packageDescription: string;
    /** UTC Date the package version was published. */
    storageId: string;
    /** The display version of the package version. */
    version: string;
    /** List of views containing this package version. */
    views: FeedView[];
}

/**
 * Represents provenance metadata for a package version.
 */
export interface PackageVersionProvenance {
    /** The GUID of the feed containing the package version. */
    feedId: string;
    /** The GUID of the package. */
    packageId: string;
    /** The GUID of the package version. */
    packageVersionId: string;
    /** Provenance details for the package version. */
    provenance: Provenance;
}

/**
 * Represents the provenance details for a package version.
 */
export interface Provenance {
    /** The source of the package version (e.g., upstream feed or direct publish). */
    source: string;
    /** The publisher or origin details, if available. */
    publisher?: string;
    /** Timestamp of the provenance record. */
    timestamp?: string;
}
