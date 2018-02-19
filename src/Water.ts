import { version } from "../package.json";
/**
 *
 *
 * @export
 * @class Water
 */
export default class Water {
    public token: string;
    public options: object | undefined;
    public readonly version = "0.0.1";
/**
 * Creates an instance of Water.
 * @param {string} token
 * @param {object} [options]
 * @memberof Water
 */
constructor(token: string, options?: object) {
        this.token = !token.startsWith("Bot") ? `Bot ${token}` : token;
        this.options = options;
    }
}
