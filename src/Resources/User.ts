import { Snowflake } from "discord-models";
import * as Channel from "discord-models/channel";
import { User as UserModel } from "discord-models/user";
import Water from "../";
import BaseResource from "../Abstracts/BaseResource";
import * as Constants from "../Constants";
import * as Options from "../Routing/Options";

/**
 * @class
 * @default
 * @export
 * @extends {BaseResource}
 * @name User
 */
export default class User extends BaseResource {
    public avatar: string | null;
    public bot: boolean;
    public discriminator: number;
    public id: Snowflake;
    public name: string;

    /**
     * @param {Water} water
     * @param {UserModel} data
     * @constructor
     * @method
     * @public
     */
    public constructor(water: Water, data: UserModel) {
        super(water);

        this.avatar = data.avatar;
        this.bot = data.bot || false;
        this.discriminator = data.discriminator;
        this.id = data.id;
        this.name = data.name;
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
    public get avatarUrl(): string | null {
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
    public createDMChannel(): Promise<Channel.DMChannel> {
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
    public get defaultAvatarUrl(): string {
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
    public async directMessage(options: Options.MessageCreateOptions): Promise<Channel.Message> {
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
    public get staticAvatarUrl(): string | null {
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
    private avatarUrlConfigured(ext: string): string | null {
        return `${Constants.CDN_BASE}/avatars/${this.id}/${this.avatar}/${ext}`;
    }
}
