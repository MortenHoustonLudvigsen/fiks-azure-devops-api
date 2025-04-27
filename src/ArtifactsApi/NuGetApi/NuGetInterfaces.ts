import { PackageDependency } from "../ArtifactsInterfaces";

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
    /** The description of the package version. */
    description?: string;
    /** List of dependencies for this package version. */
    dependencies?: PackageDependency[];
    /** UTC date the package version was published to the feed. */
    publishDate?: string;
    /** True if the package version is listed (NuGet-specific). */
    isListed?: boolean;
    /** Tags associated with the package version. */
    tags?: string[];
    /** The URL to the package's license, if available. */
    licenseUrl?: string;
    /** The URL to the package's project or homepage, if available. */
    projectUrl?: string;
    /** True if the package version has been deleted. */
    isDeleted?: boolean;
    /** The internal storage ID for the package version. */
    storageId?: string;
}
