import Axios, { AxiosInstance } from 'axios';
import Snowflake from './Abstracts/Snowflake';
import Channel from './Resources/Channel';
import * as Constants from './Constants';
import * as Endpoints from './Routing/Endpoints';
import RateLimiter from './RateLimiter';
import * as Routes from './Routing/Routes';

type Method = 'delete' | 'get' | 'patch' | 'post' | 'put';

/**
 * @export
 * @class Water
 */
export default class Water {
    public rateLimiter = new RateLimiter();
    public token: string;
    public readonly version = "0.0.1";

    private client: AxiosInstance;
    private readonly userAgent = `DiscordBot (https://github.com/yuki-bot/water) ${this.version}`;

    /**
     * Creates an instance of Water.
     * @param {string} token
     * @param {object} [options]
     * @memberof Water
     */
    public constructor(token: string) {
        const tokenEdited = Water.transformToken(token);

        this.token = tokenEdited;
        this.client = Axios.create({
            baseURL: Constants.BASE_URL,
            headers: {
                Authorization: tokenEdited,
                'User-Agent': this.userAgent,
            },
        });
    }

    private static transformToken(token: string): string {
        return token.startsWith('Bot') ? token : `Bot ${token}`;
    }

    public setToken(token: string) {
        let tokenEdited = Water.transformToken(token);

        this.client.defaults.headers['Authorization'] = tokenEdited;
        this.token = token;
    }

    public getChannel(channelId: Snowflake): Promise<Channel> {
        return this.get(
            Routes.channelsId(channelId),
            Endpoints.channel(channelId),
        );
    }

    private delete<T>(bucketIdentifier: string, path: string): Promise<T> {
        return this.request('delete', bucketIdentifier, path);
    }

    private get<T>(bucketIdentifier: string, path: string): Promise<T> {
        return this.request('get', bucketIdentifier, path);
    }

    private patch<T>(bucketIdentifier: string, path: string, data: any): Promise<T> {
        return this.request('patch', bucketIdentifier, path);
    }

    private post<T>(bucketIdentifier: string, path: string, data: any): Promise<T> {
        return this.request('post', bucketIdentifier, path);
    }

    private put<T>(bucketIdentifier: string, path: string, data: any): Promise<T> {
        return this.request('put', bucketIdentifier, path);
    }

    private async request<T>(
        method: Method,
        bucketIdentifier: string,
        path: string,
        data: any = null,
    ): Promise<T> {
        await this.rateLimiter.take(bucketIdentifier);

        const response = await this.client({
            url: path,
            data,
            method,
        });

        return JSON.parse(response.data);
    }
}
