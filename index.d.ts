import { Snowflake } from "discord-models";
import * as Application from "discord-models/application";
import * as Channel from "discord-models/channel";
import * as Gateway from "discord-models/gateway";
import * as Guild from "discord-models/guild";
import * as User from "discord-models/user";
import * as Voice from "discord-models/voice";
import RateLimiter from "./RateLimiter";
import * as Options from "./Routing/Options";
import { RouteInfo } from "./Routing/Routes";
export declare type Method = "delete" | "get" | "patch" | "post" | "put";
/**
 * @export
 * @interface
 * @name WaterOptions
 */
export interface WaterOptions {
    /**
     * Optional details when using a request proxy.
     *
     * @type {object?}
     */
    proxy?: {
        /**
         * The host to use.
         *
         * For example, this could be `0.0.0.0:15000`.
         *
         * @type {string}
         */
        host: string;
        /**
         * The path to use.
         *
         * For example, this could be "/api" or an empty string.
         *
         * @type {string}
         */
        path: string;
        /**
         * The protocol to use.
         *
         * This should probably be `http` or `https`.
         *
         * @type {string}
         */
        protocol: string;
    };
    /**
     * The bot token to use.
     *
     * `Bot ` will automatically be prefixed.
     *
     * @type {string}
     */
    token: string;
}
/**
 * @class
 * @default
 * @export
 * @name Water
 * @public
 */
export default class Water {
    /**
     * Transforms a token for use, prepending `Bot ` if it's not already.
     *
     * @param {string} token The new token to use.
     * @returns {string} The transformed token.
     * @memberof Water
     * @private
     * @static
     */
    private static transformToken(token);
    /**
     * Ratelimiter instance for this client, used to ensure that 429 requests
     * aren't performed.
     *
     * @memberof Water
     * @public
     * @property
     * @type {RateLimiter}
     */
    rateLimiter: RateLimiter;
    /**
     * The version of the library. Used in the user-agent.
     *
     * @memberof Water
     * @public
     * @property
     * @readonly
     * @type {string}
     */
    readonly version: string;
    /**
     * The configured token. Used for Authorization, when authorization is
     * enabled for a request.
     *
     * @memberof Water
     * @property
     * @protected
     * @type {string}
     */
    protected innerToken: string;
    /**
     * The host to use when making requests.
     *
     * For example, this could be `0.0.0.0:15000`.
     *
     * @memberof Water
     * @property
     * @protected
     * @readonly
     * @type {string}
     */
    protected readonly requestHost: string;
    /**
     * The configured path to use when making requests.
     *
     * For example, this could be `/api/v6`.
     *
     * @memberof Water
     * @property
     * @protected
     * @readonly
     * @type {string}
     */
    protected readonly requestPath: string;
    /**
     * The protocol to use when making requests.
     *
     * For example, this could be `https`.
     *
     * @memberof Water
     * @property
     * @protected
     * @readonly
     * @type {string}
     */
    protected readonly requestProtocol: string;
    /**
     * The User Agent to be used in all requests to the API.
     *
     * @memberof Water
     * @private
     * @property
     * @type {string}
     */
    private readonly userAgent;
    /**
     * Creates an instance of Water.
     * @param {WaterOptions} options
     * @constructor
     * @memberof Water
     * @method
     * @public
     */
    constructor(options: WaterOptions);
    /**
     * Retrieves the currently-configured token.
     *
     * @returns {string}
     * @memberof Water
     * @method
     * @public
     */
    /**
     * Sets the token to use for the client.
     *
     * Prepends `Bot ` if not already prepended.
     *
     * @memberof Water
     * @method
     * @public
     */
    token: string;
    /**
     * Adds a user to a group.
     *
     * @param groupId The ID of the group.
     * @param userId The ID of the user.
     * @returns {Promise.<null>}
     * @memberof Water
     * @method
     * @public
     */
    addGroupRecipient(groupId: Snowflake, userId: Snowflake): Promise<null>;
    addMemberRole(guildId: Snowflake, userId: Snowflake, roleId: Snowflake): Promise<null>;
    banUser(guildId: Snowflake, userId: Snowflake, deleteMessageDays?: number, reason?: string): Promise<void>;
    broadcastTyping(channelId: Snowflake): Promise<null>;
    createChannel(guildId: Snowflake, options: Options.ChannelOptions): Promise<Guild.GuildChannel>;
    createEmoji(guildId: Snowflake, options: Options.EmojiOptions): Promise<Guild.Emoji>;
    createGuild(options: Options.GuildOptions): Promise<Guild.PartialGuild>;
    createGuildIntegration(guildId: Snowflake, options: Options.GuildIntegrationOptions): Promise<null>;
    createInvite(channelId: Snowflake, options: Options.InviteOptions): Promise<Guild.RichInvite>;
    createMessage(channelId: Snowflake, options: Options.MessageCreateOptions): Promise<Channel.Message>;
    createPermission(channelId: Snowflake, targetId: Snowflake, options: Options.PermissionOverwriteOptions): Promise<null>;
    createPrivateChannel(userId: Snowflake): Promise<Channel.DMChannel>;
    createReaction(channelId: Snowflake, messageId: Snowflake, reaction: Channel.Reaction): Promise<null>;
    createRole(guildId: Snowflake, options: Options.RoleOptions): Promise<Guild.Role>;
    createWebhook(channelId: Snowflake, options: Options.WebhookOptions): Promise<Channel.Webhook>;
    deleteChannel(channelId: Snowflake): Promise<Channel.Webhook>;
    deleteEmoji(guildId: Snowflake, emojiId: Snowflake): Promise<null>;
    deleteGuild(guildId: Snowflake): Promise<Guild.PartialGuild>;
    deleteGuildIntegration(guildId: Snowflake, integrationId: Snowflake): Promise<null>;
    deleteInvite(code: string): Promise<Guild.Invite>;
    deleteMessage(channelId: Snowflake, messageId: Snowflake): Promise<null>;
    deleteMessages(channelId: Snowflake, messageIds: Snowflake[]): Promise<null>;
    deleteMessageReactions(channelId: Snowflake, messageId: Snowflake): Promise<null>;
    deletePermission(channelId: Snowflake, targetId: Snowflake): Promise<null>;
    deleteReaction(channelId: Snowflake, messageId: Snowflake, userId: Snowflake | null, reaction: Channel.Reaction): Promise<null>;
    deleteRole(guildId: Snowflake, roleId: Snowflake): Promise<null>;
    deleteWebhook(webhookId: Snowflake): Promise<null>;
    deleteWebhookWithToken(webhookId: Snowflake, token: string): Promise<null>;
    editChannel(channelId: Snowflake, options: Options.ChannelOptions): Promise<Guild.GuildChannel>;
    editEmoji(guildId: Snowflake, emojiId: Snowflake, options: Options.EmojiOptions): Promise<Guild.Emoji>;
    editGuild(guildId: Snowflake, options: Options.GuildOptions): Promise<Guild.PartialGuild>;
    editGuildChannelPositions(guildId: Snowflake, channels: Array<[Snowflake, number]>): Promise<null>;
    editGuildEmbed(guildId: Snowflake, options: Options.GuildEmbedOptions): Promise<Guild.GuildEmbed>;
    editMember(guildId: Snowflake, userId: Snowflake, options: Options.MemberOptions): Promise<null>;
    editMessage(channelId: Snowflake, messageId: Snowflake, options: Options.MessageCreateOptions): Promise<Channel.Message>;
    editNickname(guildId: Snowflake, newNickname?: string | null): Promise<null>;
    editProfile(options: Options.ProfileOptions): Promise<User.AuthenticatedUser>;
    editRole(guildId: Snowflake, roleId: Snowflake, options: Options.RoleOptions): Promise<null>;
    editRolePosition(guildId: Snowflake, roleId: Snowflake, position: number): Promise<Guild.Role[]>;
    editWebhook(webhookId: Snowflake, options: Options.WebhookOptions): Promise<Channel.Webhook>;
    editWebhookWithToken(webhookId: Snowflake, token: string, options: Options.WebhookOptions): Promise<Channel.Webhook>;
    executeWebhook(webhookId: Snowflake, token: string, wait: boolean, options: Options.WebhookExecutionOptions): Promise<Channel.Message | null>;
    getAuditLogs(guildId: Snowflake, actionType?: number, userId?: Snowflake, before?: number, limit?: number): Promise<Guild.AuditLog>;
    getBans(guildId: Snowflake): Promise<Guild.Ban[]>;
    getChannel(channelId: Snowflake): Promise<Channel.Channel>;
    getChannelInvites(channelId: Snowflake): Promise<Guild.RichInvite[]>;
    getChannelWebhooks(channelId: Snowflake): Promise<Channel.Webhook[]>;
    getCurrentApplicationInfo(): Promise<Application.CurrentApplicationInfo>;
    getCurrentUser(): Promise<User.AuthenticatedUser>;
    getGateway(): Promise<Gateway.Gateway>;
    getGatewayBot(): Promise<Gateway.BotGateway>;
    getGuild(guildId: Snowflake): Promise<Guild.PartialGuild>;
    getGuildChannels(guildId: Snowflake): Promise<Guild.GuildChannel[]>;
    getGuildEmbed(guildId: Snowflake): Promise<Guild.GuildEmbed>;
    getGuildIntegrations(guildId: Snowflake): Promise<Guild.Integration[]>;
    getGuildInvites(guildId: Snowflake): Promise<Guild.RichInvite[]>;
    getGuildMembers(guildId: Snowflake, after?: Snowflake, limit?: number): Promise<Guild.Member[]>;
    getGuildPruneCount(guildId: Snowflake): Promise<Guild.GuildPrune>;
    getGuildRegions(guildId: Snowflake): Promise<Voice.VoiceRegion[]>;
    getGuildRoles(guildId: Snowflake): Promise<Guild.Role[]>;
    getGuildVanityUrl(guildId: Snowflake): Promise<string>;
    getGuildWebhooks(guildId: Snowflake): Promise<Channel.Webhook[]>;
    getInvite(code: string, stats?: boolean): Promise<Guild.Invite>;
    getMember(guildId: Snowflake, userId: Snowflake): Promise<Guild.Member>;
    getMessage(channelId: Snowflake, messageId: Snowflake): Promise<Channel.Message>;
    getMessages(channelId: Snowflake, options: Options.MessageRetrievalOptions): Promise<Channel.Message[]>;
    getPins(channelId: Snowflake): Promise<Channel.Message[]>;
    getReactionUsers(channelId: Snowflake, messageId: Snowflake, reaction: Channel.Reaction, limit?: number, after?: Snowflake): Promise<User.User[]>;
    getUser(userId: Snowflake): Promise<User.User>;
    getUserDmChannels(): Promise<Channel.DMChannel[]>;
    getVoiceRegions(): Promise<Voice.VoiceRegion[]>;
    getWebhook(webhookId: Snowflake): Promise<Channel.Webhook>;
    getWebhookWithToken(webhookId: Snowflake, token: string): Promise<Channel.Webhook>;
    kickMember(guildId: Snowflake, userId: Snowflake): Promise<null>;
    leaveGroup(groupId: Snowflake): Promise<Channel.Group>;
    leaveGuild(guildId: Snowflake): Promise<null>;
    pinMessage(channelId: Snowflake, messageId: Snowflake): Promise<null>;
    removeBan(guildId: Snowflake, userId: Snowflake): Promise<null>;
    removeGroupRecipient(groupId: Snowflake, userId: Snowflake): Promise<null>;
    removeMemberRole(guildId: Snowflake, userId: Snowflake, roleId: Snowflake): Promise<null>;
    startGuildPrune(guildId: Snowflake, days?: number): Promise<Guild.GuildPrune>;
    startIntegrationSync(guildId: Snowflake, integrationId: Snowflake): Promise<null>;
    unpinMessage(channelId: Snowflake, messageId: Snowflake): Promise<null>;
    /**
     * Performs a DELETE request.
     *
     * @param {RouteInfo} route The request route information.
     * @returns {Promise.<T>}
     * @memberof Water
     * @method
     * @public
     */
    delete<T>(route: RouteInfo): Promise<T>;
    /**
     * Performs a GET request.
     *
     * @param {RouteInfo} route The request route information.
     * @returns {Promise.<T>}
     * @memberof Water
     * @method
     * @public
     */
    get<T>(route: RouteInfo): Promise<T>;
    /**
     * Performs a PATCH request.
     *
     * @param {RouteInfo} route The request route information.
     * @param {any} [body=null] The request body, if any.
     * @returns {Promise.<T>}
     * @memberof Water
     * @method
     * @public
     */
    patch<T>(route: RouteInfo, body?: any): Promise<T>;
    /**
     * Performs a POST request.
     *
     * @param {RouteInfo} route The request route information.
     * @param {any} [body=null] The request body, if any.
     * @returns {Promise.<T>}
     * @memberof Water
     * @method
     * @public
     */
    post<T>(route: RouteInfo, body?: any): Promise<T>;
    /**
     * Performs a PUT request.
     *
     * @param {RouteInfo} route The request route information.
     * @param {any} [body=null] The request body, if any.
     * @returns {Promise.<T>}
     * @memberof Water
     * @method
     * @public
     */
    put<T>(route: RouteInfo, body?: any): Promise<T>;
    /**
     * Performs a request to the Discord REST API.
     *
     * @param {Method} method The request verb to use, e.g. `get`.
     * @param {string} bucketIdentifier The ID of the ratelimiting bucket to
     * use.
     * @param {string} path The URL path to make a request to.
     * @param {any} [body=null] The request body. Only applicable to
     * PATCH/POST/PUT requests.
     * @param {boolean} [auth=true] Whether to use the internally configured bot
     * token.
     * @returns {Promise.<T>} A promise that will resolve to the defined type
     * after JSON parsing, if a response body exists.
     * @async
     * @memberof Water
     * @method
     * @public
     */
    request<T>(method: Method, bucketIdentifier: string, path: string, body?: any, auth?: boolean): Promise<T>;
}
