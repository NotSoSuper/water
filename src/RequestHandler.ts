import Water from "./Water";
/**
 *
 *
 * @export
 * @class RequestHandler
 */
export default class RequestHandler {
    private client: Water;
    private userAgent: string;

constructor(client: Water) {
        this.client = client;
        this.userAgent = `DiscordBot (https://github.com/yuki-bot/water) ${this.client.version}`;
    }
}
