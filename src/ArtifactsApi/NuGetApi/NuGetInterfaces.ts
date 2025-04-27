import { PackageDependency } from "../ArtifactsInterfaces";

export interface NuGetPackageVersion {
    id: string;
    version: string;
    normalizedVersion: string;
    authors?: string;
    description?: string;
    dependencies?: PackageDependency[];
    publishDate?: string;
    isListed?: boolean;
    tags?: string[];
    licenseUrl?: string;
    projectUrl?: string;
}