import { JsonPatchOperation } from './JsonPatchOperation';

/**
 * The type of batch operation to perform on NuGet package versions.
 */
export type NuGetBatchOperationType =
  /** Promote package versions to a feed view. */
  'promote' |
  /** Delete package versions from the feed. */
  'delete' |
  /** Permanently delete package versions from the recycle bin. */
  'permanentDelete' |
  /** Update the listed state of package versions. */
  'list';

/**
 * Represents a package identifier for a batch operation.
 */
export interface NuGetBatchPackage {
  /** Name of the package. */
  packageName: string;
  /** Version of the package. */
  packageVersion: string;
}

/**
 * Represents a batch request for updating NuGet package versions.
 */
export interface NuGetBatchRequest {
  /** The operation to perform on the package versions. */
  operation: NuGetBatchOperationType;
  /** The list of packages and versions to update. */
  packages: NuGetBatchPackage[];
  /** Additional operation-specific data (e.g., view ID for promote). */
  data?: any;
}

/**
 * Represents details for updating a package version.
 */
export interface PackageVersionDetails {
  /** Whether the package version should be listed. */
  listed?: boolean;
  /** The view to which the package version will be added. */
  views?: JsonPatchOperation;
}

/**
 * Represents a NuGet package version in Azure DevOps, including detailed metadata.
 */
export interface NuGetPackageVersion {
  /** The unique identifier of the package version (GUID). */
  id: string;
  /** The display version of the package version (e.g., '1.0.0'). */
  version: string;
  /** The normalized version using NuGet normalization rules (e.g., '1.0.0.0'). */
  normalizedVersion: string;
  /** The author(s) of the package version. */
  authors?: string;
  /** The title of the package version, if different from the package name. */
  title?: string;
  /** The description of the package version. */
  description?: string;
  /** A short summary of the package version, if provided. */
  summary?: string;
  /** List of dependencies for this package version. */
  dependencies?: PackageDependency[];
  /** UTC date the package version was published to the feed. */
  publishDate?: string;
  /** True if the package version is listed (NuGet-specific). */
  isListed?: boolean;
  /** Tags associated with the package version. */
  tags?: string[];
  /** The SPDX license expression for the package, if available. */
  license?: string;
  /** The URL to the package's project or homepage, if available. */
  projectUrl?: string;
  /** The URL to the package's icon, if available. */
  iconUrl?: string;
  /** True if the package requires license acceptance by the consumer. */
  requireLicenseAcceptance?: boolean;
  /** The total number of downloads for the package across all versions. */
  downloadCount?: number;
  /** The number of downloads for this specific package version. */
  versionDownloadCount?: number;
  /** The owners of the package, often overlapping with authors. */
  owners?: string;
  /** True if the package version has been deleted. */
  isDeleted?: boolean;
}

/**
 * Represents the deletion state of a NuGet package version in the recycle bin.
 */
export interface NuGetPackageVersionDeletionState {
  /** The UTC date the package version was deleted. */
  deletedDate: string;
  /** The name of the package. */
  name: string;
  /** The version of the package. */
  version: string;
}

/**
 * Represents a dependency of a NuGet package version.
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
 * Describes upstreaming behavior for a given feed/protocol/package
 */
export interface UpstreamingBehavior {
    /** Indicates whether external upstream versions should be considered for this package. */
    versionsFromExternalUpstreams?: UpstreamVersionVisibility;
}

/**
 * Indicates whether external upstream versions should be considered for this package
 */
export type UpstreamVersionVisibility =
    'allowExternalVersions' |
    'auto';
