export var TypeInfo = {
    Feed: <any>{},
    FeedView: <any>{},
    FeedPermission: <any>{},
    IdentityDescriptor: <any>{},
    UpstreamSource: <any>{},
    Package: <any>{},
    PackageVersion: <any>{},
    MinimalPackageVersion: <any>{},
}

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

export type ReferenceLinks = any;

export type FeedViewType =
    'implicit' |
    'none' |
    'release';

export type FeedVisibility =
    /** Feed is accessible by all the valid users present in the collection where the feed resides */
    'collection' |
    /** Feed is accessible by all the valid users present in the organization where the feed resides */
    'organization' |
    /** Only accessible by the permissions explicitly set by the feed administrator */
    'private';

export type FeedCapabilities =
    /** The capabilities given to a newly created feed */
    'defaultCapabilities' |
    /** No flags exist for this feed */
    'none' |
    /** This feed is currently under maintenance and may have reduced functionality */
    'underMaintenance' |
    /** This feed can serve packages from upstream sources Upstream packages must be manually promoted to views */
    'upstreamV2';

export type UpstreamSourceType =
    'internal' |
    'public';

export interface Feed {
    /** The class to represent a collection of REST reference links. */
    _links: ReferenceLinks;
    /** If set, this feed supports generation of package badges. */
    badgesEnabled: boolean;
    capabilities: FeedCapabilities;
    /** The view that the feed administrator has indicated is the default experience for readers. */
    defaultViewId: string;
    /** The date that this feed was deleted. */
    deletedDate: string;
    /** A description for the feed. Descriptions must not exceed 255 characters. */
    description: string;
    /** This will either be the feed GUID or the feed GUID and view GUID depending on how the feed was accessed. */
    fullyQualifiedId: string;
    fullyQualifiedName: string;
    /** If set, feed will hide all deleted/unpublished versions */
    hideDeletedPackageVersions: boolean;
    /** A GUID that uniquely identifies this feed. */
    id: string;
    /** If set, all packages in the feed are immutable. It is important to note that feed views are immutable; therefore, this flag will always be set for views. */
    isReadOnly: boolean;
    /** A name for the feed. feed names must follow these rules: Must not exceed 64 characters Must not contain whitespaces Must not start with an underscore or a period Must not end with a period Must not contain any of the following illegal characters: <![CDATA[ @, ~, ;, {, }, , +, =, <, >, |, /, \, ?, :, &, $, *, "", #, [, ] ]]> */
    name: string;
    permissions: FeedPermission[];
    /** OBSOLETE: This should always be true. Setting to false will override all sources in UpstreamSources. */
    upstreamEnabled: boolean;
    /** If set, time that the UpstreamEnabled property was changed. Will be null if UpstreamEnabled was never changed after Feed creation. */
    upstreamEnabledChangedDate: string;
    /** A list of sources that this feed will fetch packages from. An empty list indicates that this feed will not search any additional sources for packages. */
    upstreamSources: UpstreamSource[];
    /** The URL of the base feed in GUID form. */
    url: string;
    /** Feed view */
    view: FeedView;
    viewId: string;
    viewName: string;
}

export interface FeedView {
    /** The class to represent a collection of REST reference links. */
    _links: ReferenceLinks;
    id: string;
    name: string;
    type: FeedViewType;
    url: string;
    visibility: FeedVisibility;
}


export interface FeedPermission {
    /** Display name for the identity */
    displayName: string;
    /** An Identity descriptor is a wrapper for the identity type (Windows SID, Passport) along with a unique identifier such as the SID or PUID. */
    identityDescriptor: IdentityDescriptor;
    identityId: string;
    /** The role for this identity. Administrators have total control over the feed. Contributors can do anything to packages in the feed including adding new packages; however, they may not modify feed settings. Readers can only read packages and view settings. */
    role: FeedRole;
}

export interface IdentityDescriptor {
    /** The unique identifier for this identity, not exceeding 256 chars, which will be persisted. */
    identifier: string;
    /** Type of descriptor (for example, Windows, Passport, etc.). */
    identityType: string;
}

export interface UpstreamSource {
    deletedDate: string;
    id: string;
    internalUpstreamCollectionId: string;
    internalUpstreamFeedId: string;
    internalUpstreamViewId: string;
    location: string;
    name: string;
    protocol: string;
    upstreamSourceType: UpstreamSourceType;
}

export interface PackageVersion {
    /** Related links */
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
    /** Package version url. */
    url: string;
    /** Display version. */
    version: string;
    /** List of views containing this package version. */
    views: FeedView[];
}

export interface PackageDependency {
    /** Dependency package group (an optional classification within some package types). */
    group: string;
    /** Dependency package name. */
    packageName: string;
    /** Dependency package version range. */
    versionRange: string;
}

export interface PackageFile {
    /** Hierarchical representation of files. */
    children: PackageFile[];
    /** File name. */
    name: string;
    /** Extended data unique to a specific package type. */
    protocolMetadata: ProtocolMetadata;
}

export interface ProtocolMetadata {
    /** Extended metadata for a specific package type, formatted to the associated schema version definition. */
    data: any;
    /** Schema version. */
    schemaVersion: number;
}

export interface Package {
    /** The class to represent a collection of REST reference links. */
    _links: ReferenceLinks;
    id: string;
    isCached: boolean;
    /** The display name of the package */
    name: string;
    /** The normalized name representing the identity of this package for this protocol type */
    normalizedName: string;
    protocolType: string;
    starCount: number;
    url: string;
    versions: MinimalPackageVersion[];
}

export interface MinimalPackageVersion {
    directUpstreamSourceId: string;
    id: string;
    isCachedVersion: boolean;
    isDeleted: boolean;
    isLatest: boolean;
    isListed: boolean;
    /** The normalized version representing the identity of a package version */
    normalizedVersion: string;
    packageDescription: string;
    publishDate: string;
    storageId: string;
    /** The display version of the package version */
    version: string;
    views: FeedView[];
}

export interface Provenance {
    /** The source of the package version (e.g., upstream feed or direct publish). */
    source: string;
    /** The publisher or origin details, if available. */
    publisher?: string;
    /** Timestamp of the provenance record. */
    timestamp?: string;
}