import fetch from 'node-fetch';
import { log } from '@fiks-tools/node-logging';
import { ListResponse } from './ListResponse';
import { HttpCodes } from './HttpCodes';
import { ApiBase } from './ApiBase';

export type QueryValue = string | boolean | number;
export type Query = Record<string, QueryValue | QueryValue[]>;
export type PathSegment = string | undefined;
type HttpMethod = 'GET' | 'PUT' | 'POST' | 'PATCH' | 'DELETE';

export class AzureDevOpsHttpClient {
    constructor(readonly api: ApiBase) { }

    getUrl(pathSegments: PathSegment[], query: Query): string {
        const path = pathSegments.filter(hasStringValue).map(s => `/${encodeURIComponent(s)}`).join('');
        return `${this.api.getBaseUrl()}${path}${getQueryString(query)}`;
    }

    async getList<T>(pathSegments: PathSegment[], query: Query): Promise<T[]> {
        const result = await this.get<ListResponse<T>>(pathSegments, query);
        return result.value;
    }

    async get<T>(pathSegments: PathSegment[], query: Query): Promise<T> {
        return await this.fetchJson<T>('GET', pathSegments, query);
    }

    async putList<T>(pathSegments: PathSegment[], query: Query, body: any): Promise<T[]> {
        const result = await this.put<ListResponse<T>>(pathSegments, query, body);
        return result.value;
    }

    async put<T>(pathSegments: PathSegment[], query: Query, body: any): Promise<T> {
        return await this.fetchJson<T>('PUT', pathSegments, query, body);
    }

    async postList<T>(pathSegments: PathSegment[], query: Query, body: any): Promise<T[]> {
        const result = await this.post<ListResponse<T>>(pathSegments, query, body);
        return result.value;
    }

    async post<T>(pathSegments: PathSegment[], query: Query, body: any): Promise<T> {
        return await this.fetchJson<T>('POST', pathSegments, query, body);
    }

    async patchList<T>(pathSegments: PathSegment[], query: Query, body: any): Promise<T[]> {
        const result = await this.patch<ListResponse<T>>(pathSegments, query, body);
        return result.value;
    }

    async patch<T>(pathSegments: PathSegment[], query: Query, body: any): Promise<T> {
        return await this.fetchJson<T>('PATCH', pathSegments, query, body);
    }

    async delete(pathSegments: PathSegment[], query: Query, body?: any): Promise<void> {
        await this.fetch('DELETE', pathSegments, query, body);
    }

    async getBinary(pathSegments: PathSegment[], query: Query): Promise<Buffer> {
        return await this.fetchBinary('GET', pathSegments, query);
    }

    async fetchBinary(method: HttpMethod, pathSegments: PathSegment[], query: Query, body?: any): Promise<Buffer> {
        const response = await this.fetch(method, pathSegments, query, body);

        switch (response.status) {
            case HttpCodes.OK:
            case HttpCodes.Created:
                return await response.buffer();
            default:
                throw new Error(`${response.status} - ${response.statusText}`);
        }
    }

    async fetchJson<T>(method: HttpMethod, pathSegments: PathSegment[], query: Query, body?: any): Promise<T> {
        const response = await this.fetch(method, pathSegments, query, body);

        switch (response.status) {
            case HttpCodes.OK:
            case HttpCodes.Created:
                return (await response.json()) as T;
            default:
                throw new Error(`${response.status} - ${response.statusText}`);
        }
    }

    async fetch(method: HttpMethod, pathSegments: PathSegment[], query: Query, body?: any): Promise<fetch.Response> {
        const { pat } = this.api;

        const authString = `:${pat}`;
        const base64Auth = Buffer.from(authString).toString('base64');
        const authorization = `Basic ${base64Auth}`;

        let init: fetch.RequestInit = {
            method,
            headers: {
                Authorization: authorization,
            }
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

        const url = this.getUrl(pathSegments, query);

        log.debug(`${method} ${url}`);

        return await fetch(url, init);
    }
}

function getQueryString(query: Query): string {
    let queryString = '';
    for (const [name, values] of Object.entries(query)) {
        for (const value of array(values)) {
            queryString += queryString === '' ? '?' : '&';
            queryString += encodeURIComponent(name);
            queryString += '=';
            queryString += encodeURIComponent(formatQueryValue(value));
        }
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

function array<T>(value: T | T[] | null | undefined): T[] {
    if (value == null)
        return [];

    if (Array.isArray(value))
        return value;

    return [value];
}
