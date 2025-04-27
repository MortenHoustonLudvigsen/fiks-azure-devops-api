import { RepositoriesApi } from './RepositoriesApi';
import { GitRepository, GitRepositoryRef, TeamProjectReference } from '../GitInterfaces';
import { AzureDevOpsApiVersion } from '../../constants';

interface Options {
    /** Specify the source refs to use while creating a fork repo */
    sourceRef?: string;
}

/**
 * Represents options for creating a Git repository.
 */
interface Request {
    /** The name of the repository. */
    name: string;
    parentRepository?: GitRepositoryRef;
    project?: TeamProjectReference;
}

declare module './RepositoriesApi' {
    interface RepositoriesApi {
        /**
         * Create a git repository in a project.
         *
         * The project parameter must be supplied to create the repository in a specific project.
         * @param project Project ID or project name
         * @param options Options for creating the repository
         * @param request Information about the repository to be created
         */
        create(project: string, options: Options, request: Request): Promise<GitRepository>;
    }
}

Object.assign(RepositoriesApi.prototype, {
    async create(this: RepositoriesApi, project: string, options: Options, request: Request): Promise<GitRepository> {
        return await this.post<GitRepository>([project, '_apis', 'git', 'repositories'], {
            ...options,
            'api-version': AzureDevOpsApiVersion,
        }, request);
    },
});
