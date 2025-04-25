import fetch from 'node-fetch';
import { ListResponse } from './ListResponse';

export type QueryValue = string | boolean | number;
export type Query = Record<string, QueryValue>;

export enum HttpCodes {
    OK = 200,
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
        const { pat } = this;

        const authString = `:${pat}`;
        const base64Auth = Buffer.from(authString).toString('base64');        

        const init: fetch.RequestInit = {
            method: 'GET',
            headers: { 'Authorization': `Basic ${base64Auth}` }
        };

        const url = this.getUrl(pathSegments, query);

        console.log(`GET ${url}`);

        const response = await fetch(url, init);

        switch (response.status) {
            case HttpCodes.OK:
                const result = await response.json();
                return result as T;
            default:
                throw new Error(`${response.status} - ${response.statusText}`);
        }
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
