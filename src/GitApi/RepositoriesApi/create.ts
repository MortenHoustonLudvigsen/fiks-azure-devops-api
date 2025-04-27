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
    /** The parent repository for forking. */
    parentRepository?: GitRepositoryRef;
    /** The project in which to create the repository. */
    project?: TeamProjectReference;
}

declare module './RepositoriesApi' {
    interface RepositoriesApi {
        /**
         * Create a git repository in a project.
         *
         * The project parameter must be supplied to create the repository in a specific project.
         * @param project Project ID or project name
         * @param request Information about the repository to be created
         * @param options Optional parameters for the request
         */
        create(project: string, request: Request, options?: Options): Promise<GitRepository>;
    }
}

Object.assign(RepositoriesApi.prototype, {
    async create(this: RepositoriesApi, project: string, request: Request, options: Options = {}): Promise<GitRepository> {
        return await this.client.post<GitRepository>([project, '_apis', 'git', 'repositories'], {
            ...options,
            'api-version': AzureDevOpsApiVersion,
        }, request);
    },
});
