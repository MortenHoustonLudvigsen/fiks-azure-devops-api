/**
 * Represents an npm package version in Azure DevOps, including detailed metadata.
 */
export interface NpmPackageVersion {
    /** The unique identifier of the package version (GUID). */
    id: string;
    /** The name of the package (e.g., 'package' or '@scope/package'). */
    name: string;
    /** The display version of the package version (e.g., '1.0.0'). */
    version: string;
    /** The description of the package version. */
    description?: string;
    /** The author of the package version. */
    author?: string | { name: string; email?: string; url?: string };
    /** Dependencies of the package version. */
    dependencies?: { [key: string]: string };
    /** Dev dependencies of the package version. */
    devDependencies?: { [key: string]: string };
    /** The distribution details for the package version (e.g., tarball URL). */
    dist?: {
        tarball: string;
        shasum: string;
        integrity?: string;
    };
    /** UTC date the package version was published to the feed. */
    publishDate?: string;
    /** True if the package version is listed (npm-specific). */
    isListed?: boolean;
    /** Tags associated with the package version. */
    tags?: string[];
    /** The license of the package version. */
    license?: string;
    /** The URL to the package's homepage, if available. */
    homepage?: string;
    /** The URL to the package's repository, if available. */
    repository?: string | { type: string; url: string };
    /** True if the package version has been deleted. */
    isDeleted?: boolean;
}