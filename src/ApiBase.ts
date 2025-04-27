import fetch from 'node-fetch';
import { log } from '@fiks-tools/node-logging';
import { ListResponse } from './ListResponse';

export type QueryValue = string | boolean | number;
export type Query = Record<string, QueryValue>;
export type PathSegment = string | undefined;
type HttpMethod = 'GET' | 'PUT' | 'POST';

export enum HttpCodes {
    OK = 200,
    Created = 201,
    MultipleChoices = 300,
    MovedPermanently = 301,
    ResourceMoved = 302,
    SeeOther = 303,
    NotModified = 304,
    UseProxy = 305,
    SwitchProxy = 306,
    TemporaryRedirect = 307,
    PermanentRedirect = 308,
    BadRequest = 400,
    Unauthorized = 401,
    PaymentRequired = 402,
    Forbidden = 403,
    NotFound = 404,
    MethodNotAllowed = 405,
    NotAcceptable = 406,
    ProxyAuthenticationRequired = 407,
    RequestTimeout = 408,
    Conflict = 409,
    Gone = 410,
    TooManyRequests = 429,
    InternalServerError = 500,
    NotImplemented = 501,
    BadGateway = 502,
    ServiceUnavailable = 503,
    GatewayTimeout = 504,
}

export abstract class ApiBase {
    constructor(public readonly organization: string, private pat: string) {
    }

    protected abstract getBaseUrl(): string;

    getUrl(pathSegments: PathSegment[], query: Query): string {
        const path = pathSegments.filter(hasStringValue).map(s => `/${encodeURIComponent(s)}`).join('');
        return `${this.getBaseUrl()}${path}${getQueryString(query)}`;
    }

    async getList<T>(pathSegments: PathSegment[], query: Query): Promise<T[]> {
        const result = await this.get<ListResponse<T>>(pathSegments, query);
        return result.value;
    }

    async get<T>(pathSegments: PathSegment[], query: Query): Promise<T> {
        return await this.fetch<T>('GET', pathSegments, query);
    }

    async putList<T>(pathSegments: PathSegment[], query: Query, body: any): Promise<T[]> {
        const result = await this.put<ListResponse<T>>(pathSegments, query, body);
        return result.value;
    }

    async put<T>(pathSegments: PathSegment[], query: Query, body: any): Promise<T> {
        return await this.fetch<T>('PUT', pathSegments, query, body);
    }

    async postList<T>(pathSegments: PathSegment[], query: Query, body: any): Promise<T[]> {
        const result = await this.post<ListResponse<T>>(pathSegments, query, body);
        return result.value;
    }

    async post<T>(pathSegments: PathSegment[], query: Query, body: any): Promise<T> {
        return await this.fetch<T>('POST', pathSegments, query, body);
    }

    async getBinary(pathSegments: string[], query: Query): Promise<Buffer> {
        const init = this.getRequestInit('GET');

        const url = this.getUrl(pathSegments, query);

        log.debug(`GET ${url}`);

        const response = await fetch(url, init);

        switch (response.status) {
            case HttpCodes.OK:
                return await response.buffer();
            default:
                throw new Error(`${response.status} - ${response.statusText}`);
        }
    }

    private async fetch<T>(method: HttpMethod, pathSegments: PathSegment[], query: Query, body?: any): Promise<T> {
        const init = this.getRequestInit(method, body);

        const url = this.getUrl(pathSegments, query);

        log.debug(`${method} ${url}`);

        const response = await fetch(url, init);

        switch (response.status) {
            case HttpCodes.OK:
            case HttpCodes.Created:
                return (await response.json()) as T;
            default:
                throw new Error(`${response.status} - ${response.statusText}`);
        }
    }

    private getRequestInit(method: HttpMethod, body?: any): fetch.RequestInit {
        const { pat } = this;

        const authString = `:${pat}`;
        const base64Auth = Buffer.from(authString).toString('base64');
        const authorization = `Basic ${base64Auth}`;

        let init: fetch.RequestInit = {
            method,
            headers: {
                Authorization: authorization,
                'Content-Type': 'application/json',
            },
            body: body != null ? JSON.stringify(body) : undefined
        };

        if (body != null) {
            init = {
                ...init,
                body: JSON.stringify(body),
                headers: {
                    ...init.headers,
                    'Content-Type': 'application/json',
                },
            };
        }

        return init
    }
}

function getQueryString(query: Query): string {
    let queryString = '';
    for (const [name, value] of Object.entries(query)) {
        queryString += queryString === '' ? '?' : '&';
        queryString += encodeURIComponent(name);
        queryString += '=';
        queryString += encodeURIComponent(formatQueryValue(value));
    }
    return queryString;
}

function formatQueryValue(value: QueryValue): string {
    switch (typeof value) {
        case 'string':
            return value;
        case 'boolean':
            return value ? 'true' : 'false';
        case 'number':
            return `${value}`;
        default:
            return `${value}`;
    }
}

function hasStringValue(value: string | null | undefined): value is string {
    return value != null
        && typeof value === 'string'
        && /\S/.test(value);
}