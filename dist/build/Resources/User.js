import BaseResource from "../Abstracts/BaseResource";
import * as Constants from "../Constants";
/**
 * @class
 * @default
 * @export
 * @extends {BaseResource}
 * @name User
 */
export default class User extends BaseResource {
    /**
     * @param {Water} water
     * @param {UserModel} data
     * @constructor
     * @method
     * @public
     */
    constructor(water, data) {
        super(water);
        this.avatar = data.avatar;
        this.bot = data.bot || false;
        this.discriminator = data.discriminator;
        this.id = data.id;
        this.name = data.username;
    }
    /**
     * A URI to the user's avatar.
     *
     * Returns a GIF URI if the user's avatar is animated.
     *
     * @returns {string | null} The URI to the asset.
     * @memberof User
     * @public
     */
    get avatarUrl() {
        if (!this.avatar) {
            return null;
        }
        return this.avatar.startsWith("a_")
            ? this.avatarUrlConfigured("gif")
            : this.staticAvatarUrl;
    }
    /**
     * Creates a DM channel with the user.
     *
     * @returns {Promise.<Channel.DMChannel>} The newly created DM Channel.
     * @memberof User
     * @method
     * @public
     */
    createDMChannel() {
        return this.client.createPrivateChannel(this.id);
    }
    /**
     * A URI to the user's default avatar.
     *
     * This disregards the fact of whether they have an avatar set.
     *
     * @returns {string} The URI to the asset.
     * @memberof User
     * @public
     */
    get defaultAvatarUrl() {
        const num = this.discriminator % 5;
        return `${Constants.CDN_BASE}/embed/avatars/${num}.png`;
    }
    /**
     * Sends a message to the DM Channel with the user.
     *
     * @param options The options defining the message payload.
     * @returns {Promise.<Channel.Message>} The newly created message.
     * @async
     * @memberof User
     * @method
     * @public
     */
    async directMessage(options) {
        const channel = await this.createDMChannel();
        return this.client.createMessage(channel.id, options);
    }
    /**
     * A URI to the user's static avatar asset, if they have one set.
     *
     * This will return a URI to a PNG.
     *
     * @returns {string | null} The URI to the static asset.
     * @memberof User
     * @public
     */
    get staticAvatarUrl() {
        return this.avatarUrlConfigured("png");
    }
    /**
     * A URI to the user's avatar asset, if they have one set.
     *
     * @param ext The extension to use for the asset URI.
     * @returns {string | null} The URI to the asset.
     * @memberof User
     * @method
     * @private
     */
    avatarUrlConfigured(ext) {
        return `${Constants.CDN_BASE}/avatars/${this.id}/${this.avatar}/${ext}`;
    }
}
//# sourceMappingURL=User.js.map