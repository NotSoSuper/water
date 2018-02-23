import * as https from 'https';
import Snowflake from './Abstracts/Snowflake';
import Channel from './Resources/Channel';
import * as Constants from './Constants';
import * as Endpoints from './Routing/Endpoints';
import RateLimiter from './RateLimiter';
import * as Routes from './Routing/Routes';

type Method = 'delete' | 'get' | 'patch' | 'post' | 'put';

interface RequestHeaders {
    Authorization?: string | undefined;
    'Content-Type': string;
    'User-Agent': string;
}

/**
 * @export
 * @class Water
 */
export default class Water {
    public rateLimiter = new RateLimiter();
    public readonly version = "0.0.1";

    protected _token: string;

    private readonly userAgent = `DiscordBot (https://github.com/yuki-bot/water) ${this.version}`;

    /**
     * Creates an instance of Water.
     * @param {string} token
     * @param {object} [options]
     * @memberof Water
     */
    public constructor(token: string) {
        this._token = Water.transformToken(token);
    }

    private static transformToken(token: string): string {
        return token.startsWith('Bot') ? token : `Bot ${token}`;
    }

    public get token(): string {
        return this._token;
    }

    public set token(token: string) {
        this.token = Water.transformToken(token);
    }

    public getChannel(channelId: Snowflake): Promise<Channel> {
        return this.get(
            Routes.channelsId(channelId),
            Endpoints.channel(channelId),
        );
    }

    protected delete<T>(bucketIdentifier: string, path: string): Promise<T> {
        return this.request('delete', bucketIdentifier, path);
    }

    protected get<T>(bucketIdentifier: string, path: string): Promise<T> {
        return this.request('get', bucketIdentifier, path);
    }

    protected patch<T>(bucketIdentifier: string, path: string, body: any): Promise<T> {
        return this.request('patch', bucketIdentifier, path, body);
    }

    protected post<T>(bucketIdentifier: string, path: string, body: any): Promise<T> {
        return this.request('post', bucketIdentifier, path, body);
    }

    protected put<T>(bucketIdentifier: string, path: string, body: any): Promise<T> {
        return this.request('put', bucketIdentifier, path, body);
    }

    protected async request<T>(
        method: Method,
        bucketIdentifier: string,
        path: string,
        body: any = null,
        auth: boolean = true,
    ): Promise<T> {
        await this.rateLimiter.take(bucketIdentifier);

        let headers: RequestHeaders = {
            'Content-Type': 'application/json',
            'User-Agent': this.userAgent,
        };

        if (auth) {
            headers.Authorization = this.token;
        }

        return new Promise<T>((resolve, reject) => {
            const request = https.request({
                headers: {
                    Authorization: this.token,
                    'Content-Type': 'application/json',
                },
                host: Constants.API_HOST,
                method,
                path: `${Constants.API_BASE_PATH}/${path}`,
            });

            request.once('error', e => {
                reject(e);
            });

            request.on('response', response => {
                let data = '';

                response.on('data', (chunk: Buffer) => {
                    data += chunk;
                });

                response.once('end', () => {
                    this.rateLimiter.process(bucketIdentifier, response);

                    if (response.length === 0) {
                        return resolve(undefined);
                    }

                    if (response.headers['Content-Type'] !== 'application/json') {
                        return resolve(undefined);
                    }

                    try {
                        resolve(JSON.parse(data));
                    } catch (e) {
                        reject(e);
                    }
                });

                response.on('error', (e: Error) => {
                    reject(e);
                });
            });

            if (body) {
                request.write(body);
            }

            request.end();
        });
    }
}
