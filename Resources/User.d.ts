import { Snowflake } from "discord-models";
import * as Channel from "discord-models/channel";
import { User as UserModel } from "discord-models/user";
import Water from "../";
import BaseResource from "../Abstracts/BaseResource";
import * as Options from "../Routing/Options";
/**
 * @class
 * @default
 * @export
 * @extends {BaseResource}
 * @name User
 */
export default class User extends BaseResource {
    avatar: string | null;
    bot: boolean;
    discriminator: number;
    id: Snowflake;
    name: string;
    /**
     * @param {Water} water
     * @param {UserModel} data
     * @constructor
     * @method
     * @public
     */
    constructor(water: Water, data: UserModel);
    /**
     * A URI to the user's avatar.
     *
     * Returns a GIF URI if the user's avatar is animated.
     *
     * @returns {string | null} The URI to the asset.
     * @memberof User
     * @public
     */
    readonly avatarUrl: string | null;
    /**
     * Creates a DM channel with the user.
     *
     * @returns {Promise.<Channel.DMChannel>} The newly created DM Channel.
     * @memberof User
     * @method
     * @public
     */
    createDMChannel(): Promise<Channel.DMChannel>;
    /**
     * A URI to the user's default avatar.
     *
     * This disregards the fact of whether they have an avatar set.
     *
     * @returns {string} The URI to the asset.
     * @memberof User
     * @public
     */
    readonly defaultAvatarUrl: string;
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
    directMessage(options: Options.MessageCreateOptions): Promise<Channel.Message>;
    /**
     * A URI to the user's static avatar asset, if they have one set.
     *
     * This will return a URI to a PNG.
     *
     * @returns {string | null} The URI to the static asset.
     * @memberof User
     * @public
     */
    readonly staticAvatarUrl: string | null;
    /**
     * A URI to the user's avatar asset, if they have one set.
     *
     * @param ext The extension to use for the asset URI.
     * @returns {string | null} The URI to the asset.
     * @memberof User
     * @method
     * @private
     */
    private avatarUrlConfigured(ext);
}
