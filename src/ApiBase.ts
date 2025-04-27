import fetch from 'node-fetch';
import { log } from '@fiks-tools/node-logging';
import { ListResponse } from './ListResponse';

export type QueryValue = string | boolean | number;
export type Query = Record<string, QueryValue>;

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

    getUrl(pathSegments: string[], query: Query): string {
        const path = pathSegments.filter(s => /\S/.test(s)).map(s => `/${encodeURIComponent(s)}`).join('');
        return `${this.getBaseUrl()}${path}${getQueryString(query)}`;
    }

    async getList<T>(pathSegments: string[], query: Query): Promise<T[]> {
        const result = await this.get<ListResponse<T>>(pathSegments, query);
        return result.value;
    }

    async get<T>(pathSegments: string[], query: Query): Promise<T> {
        return await this.fetch<T>('GET', pathSegments, query);
    }

    async putList<T>(pathSegments: string[], query: Query, body: any): Promise<T[]> {
        const result = await this.put<ListResponse<T>>(pathSegments, query, body);
        return result.value;
    }

    async put<T>(pathSegments: string[], query: Query, body: any): Promise<T> {
        return await this.fetch<T>('PUT', pathSegments, query, body);
    }

    async postList<T>(pathSegments: string[], query: Query, body: any): Promise<T[]> {
        const result = await this.post<ListResponse<T>>(pathSegments, query, body);
        return result.value;
    }

    async post<T>(pathSegments: string[], query: Query, body: any): Promise<T> {
        return await this.fetch<T>('POST', pathSegments, query, body);
    }

    private async fetch<T>(method: 'GET' | 'PUT' | 'POST', pathSegments: string[], query: Query, body?: any): Promise<T> {
        const { pat } = this;

        const authString = `:${pat}`;
        const base64Auth = Buffer.from(authString).toString('base64');

        const init: fetch.RequestInit = {
            method,
            headers: {
                'Authorization': `Basic ${base64Auth}`,
                'Content-Type': 'application/json',
            },
            body: body != null ? JSON.stringify(body) : undefined
        };

        const url = this.getUrl(pathSegments, query);

        log.debug(`${method} ${url}`);

        return await getJsonResult<T>(await fetch(url, init));
    }
}

async function getJsonResult<T>(response: fetch.Response) {
    switch (response.status) {
        case HttpCodes.OK:
        case HttpCodes.Created:
            return (await response.json()) as T;
        default:
            throw new Error(`${response.status} - ${response.statusText}`);
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
