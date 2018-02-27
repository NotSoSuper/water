import * as Application from "discord-models/application";
import * as Channel from "discord-models/channel";
import { Snowflake } from "discord-models/discord-models";
import * as Gateway from "discord-models/gateway";
import * as Guild from "discord-models/guild";
import * as User from "discord-models/user";
import * as Voice from "discord-models/voice";
import * as http from "http";
import * as https from "https";
import * as Constants from "./Constants";
import RateLimiter from "./RateLimiter";
import * as Options from "./Routing/Options";
import * as Routes from "./Routing/Routes";
import { RouteInfo } from "./Routing/Routes";
import * as utils from "./utils";

type Method = "delete" | "get" | "patch" | "post" | "put";

/**
 * @interface
 * @name RequestHeaders
 */
interface RequestHeaders {
    Authorization?: string | undefined;
    "Content-Type": string;
    "User-Agent": string;
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
    private static transformToken(token: string): string {
        return token.startsWith("Bot") ? token : `Bot ${token}`;
    }

    /**
     * Ratelimiter instance for this client, used to ensure that 429 requests
     * aren't performed.
     *
     * @memberof Water
     * @public
     * @property
     * @type {RateLimiter}
     */
    public rateLimiter = new RateLimiter();

    /**
     * The version of the library. Used in the user-agent.
     *
     * @memberof Water
     * @public
     * @property
     * @readonly
     * @type {string}
     */
    public readonly version = "0.0.1";

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
     * The User Agent to be used in all requests to the API.
     *
     * @memberof Water
     * @private
     * @property
     * @type {string}
     */
    private readonly userAgent = `DiscordBot (https://github.com/yuki-bot/water, ${this.version})`;

    /**
     * Creates an instance of Water.
     * @param {string} token
     * @constructor
     * @memberof Water
     * @method
     * @public
     */
    public constructor(token: string) {
        this.innerToken = Water.transformToken(token);
    }

    /**
     * Retrieves the currently-configured token.
     *
     * @returns {string}
     * @memberof Water
     * @method
     * @public
     */
    public get token(): string {
        return this.innerToken;
    }

    /**
     * Sets the token to use for the client.
     *
     * Prepends `Bot ` if not already prepended.
     *
     * @memberof Water
     * @method
     * @public
     */
    public set token(token: string) {
        this.token = Water.transformToken(token);
    }

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
    public addGroupRecipient(groupId: Snowflake, userId: Snowflake): Promise<null> {
        return this.get(Routes.channelsIdRecipientsId(groupId, userId));
    }

    public addMemberRole(
        guildId: Snowflake,
        userId: Snowflake,
        roleId: Snowflake,
    ): Promise<null> {
        return this.put(Routes.guildsIdUsersIdRolesId(guildId, userId, roleId));
    }

    public banUser(
        guildId: Snowflake,
        userId: Snowflake,
        deleteMessageDays?: number,
        reason?: string,
    ): Promise<void> {
        const info = Routes.guildsIdBansUserId(guildId, userId);

        if (deleteMessageDays || reason) {
            info.path += "?";

            if (deleteMessageDays) {
                info.path += `delete_message_days=${deleteMessageDays}&`;
            }

            if (reason) {
                const encodedReason = encodeURIComponent(reason);

                info.path += `reason=${encodedReason}`;
            }
        }

        return this.put(info);
    }

    public broadcastTyping(channelId: Snowflake): Promise<null> {
        return this.post(Routes.channelsIdTyping(channelId));
    }

    public createChannel(guildId: Snowflake, options: Options.ChannelOptions): Promise<Guild.GuildChannel> {
        return this.post(Routes.guildsIdChannels(guildId), options);
    }

    public createEmoji(guildId: Snowflake, options: Options.EmojiOptions): Promise<Guild.Emoji> {
        return this.post(Routes.guildsIdEmojis(guildId), options);
    }

    public createGuild(options: Options.GuildOptions): Promise<Guild.PartialGuild> {
        return this.post(Routes.guilds(), options);
    }

    public createGuildIntegration(guildId: Snowflake, options: Options.GuildIntegrationOptions): Promise<null> {
        return this.post(Routes.guildsIdIntegrations(guildId), options);
    }

    public createInvite(channelId: Snowflake, options: Options.InviteOptions): Promise<Guild.RichInvite> {
        return this.post(Routes.channelsIdInvites(channelId), options);
    }

    public createPermission(
        channelId: Snowflake,
        targetId: Snowflake,
        options: Options.PermissionOverwriteOptions,
    ): Promise<null> {
        return this.put(
            Routes.channelsIdPermissionsTargetId(channelId, targetId),
            options,
        );
    }

    public createPrivateChannel(userId: Snowflake): Promise<Channel.DMChannel> {
        return this.post(Routes.usersIdChannels("@me"), {
            recipient_id: userId,
        } as Options.PrivateChannelOptions);
    }

    public createReaction(
        channelId: Snowflake,
        messageId: Snowflake,
        reaction: Channel.Reaction,
    ): Promise<null> {
        return this.get(Routes.channelsIdMessagesIdReactionsTargetUserId(
            channelId,
            messageId,
            utils.parseReaction(reaction),
            "@me",
        ));
    }

    public createRole(guildId: Snowflake, options: Options.RoleOptions): Promise<Guild.Role> {
        return this.post(Routes.guildsIdRoles(guildId), options);
    }

    public createWebhook(channelId: Snowflake, options: Options.WebhookOptions): Promise<Channel.Webhook> {
        return this.post(Routes.channelsIdWebhooks(channelId), options);
    }

    public deleteChannel(channelId: Snowflake): Promise<Channel.Webhook> {
        return this.delete(Routes.channelsId(channelId));
    }

    public deleteEmoji(guildId: Snowflake, emojiId: Snowflake): Promise<null> {
        return this.delete(Routes.guildsIdEmojisId(guildId, emojiId));
    }

    public deleteGuild(guildId: Snowflake): Promise<Guild.PartialGuild> {
        return this.delete(Routes.guildsId(guildId));
    }

    public deleteGuildIntegration(guildId: Snowflake, integrationId: Snowflake): Promise<null> {
        return this.delete(Routes.guildsIdIntegrationsId(
            guildId,
            integrationId,
        ));
    }

    public deleteInvite(code: string): Promise<Guild.Invite> {
        return this.delete(Routes.invitesCode(code));
    }

    public deleteMessage(channelId: Snowflake, messageId: Snowflake): Promise<null> {
        return this.delete(Routes.channelsIdMessagesId(channelId, messageId));
    }

    public deleteMessages(channelId: Snowflake, messageIds: Snowflake[]): Promise<null> {
        return this.post(Routes.channelsIdMessages(channelId), messageIds);
    }

    public deleteMessageReactions(channelId: Snowflake, messageId: Snowflake): Promise<null> {
        return this.delete(Routes.channelsIdMessagesIdReactions(
            channelId,
            messageId,
        ));
    }

    public deletePermission(channelId: Snowflake, targetId: Snowflake): Promise<null> {
        return this.delete(Routes.channelsIdPermissionsTargetId(
            channelId,
            targetId,
        ));
    }

    public deleteReaction(
        channelId: Snowflake,
        messageId: Snowflake,
        userId: Snowflake | null,
        reaction: Channel.Reaction,
    ): Promise<null> {
        let configuredUserId;

        if (userId) {
            configuredUserId = userId.value;
        } else {
            configuredUserId = "@me";
        }

        return this.delete(Routes.channelsIdMessagesIdReactionsTargetUserId(
            channelId,
            messageId,
            utils.parseReaction(reaction),
            configuredUserId,
        ));
    }

    public deleteRole(guildId: Snowflake, roleId: Snowflake): Promise<null> {
        return this.delete(Routes.guildsIdRolesId(guildId, roleId));
    }

    public deleteWebhook(webhookId: Snowflake): Promise<null> {
        return this.delete(Routes.webhooksId(webhookId));
    }

    public deleteWebhookWithToken(webhookId: Snowflake, token: string): Promise<null> {
        const info = Routes.webhooksIdToken(webhookId, token);

        return this.request("delete", info.bucket, info.path, null, false);
    }

    public editChannel(channelId: Snowflake, options: Options.ChannelOptions): Promise<Guild.GuildChannel> {
        return this.patch(Routes.channelsId(channelId), options);
    }

    public editEmoji(guildId: Snowflake, emojiId: Snowflake, options: Options.EmojiOptions): Promise<Guild.Emoji> {
        return this.patch(Routes.guildsIdEmojisId(guildId, emojiId), options);
    }

    public editGuild(guildId: Snowflake, options: Options.GuildOptions): Promise<Guild.PartialGuild> {
        return this.patch(Routes.guildsId(guildId), options);
    }

    public editGuildChannelPositions(guildId: Snowflake, channels: Array<[Snowflake, number]>): Promise<null> {
        interface ChannelPositions {
            [key: string]: number;
        }

        const body = channels.reduce((acc, value) => {
            acc[value[0].value] = value[1];

            return acc;
        }, {} as ChannelPositions);

        return this.patch(Routes.guildsIdChannels(guildId), body);
    }

    public editGuildEmbed(guildId: Snowflake, options: Options.GuildEmbedOptions): Promise<Guild.GuildEmbed> {
        return this.patch(Routes.guildsIdEmbed(guildId), options);
    }

    public async editMember(guildId: Snowflake, userId: Snowflake, options: Options.MemberOptions): Promise<null> {
        return this.patch<null>(
            Routes.guildsIdMembersUserId(guildId, userId),
            options,
        );
    }

    public editMessage(
        channelId: Snowflake,
        messageId: Snowflake,
        options: Options.MessageCreateOptions,
    ): Promise<Channel.Message> {
        return this.patch(
            Routes.channelsIdMessagesId(channelId, messageId),
            options,
        );
    }

    public editNickname(guildId: Snowflake, newNickname: string | null = null): Promise<null> {
        const body = {
            new_nickname: newNickname,
        } as Options.NicknameOptions;

        return this.patch(
            Routes.guildsIdMembersTargetIdNick(guildId, "@me"),
            body,
        );
    }

    public editProfile(options: Options.ProfileOptions): Promise<User.AuthenticatedUser> {
        return this.patch(Routes.usersId("@me"), options);
    }

    public editRole(
        guildId: Snowflake,
        roleId: Snowflake,
        options: Options.RoleOptions,
    ): Promise<null> {
        return this.patch(Routes.guildsIdRolesId(guildId, roleId), options);
    }

    public editRolePosition(
        guildId: Snowflake,
        roleId: Snowflake,
        position: number,
    ): Promise<Guild.Role[]> {
        const body = {
            id: roleId,
            position,
        } as Options.RolePositionOptions;

        return this.patch(Routes.guildsIdRolesId(guildId, roleId), body);
    }

    public editWebhook(
        webhookId: Snowflake,
        options: Options.WebhookOptions,
    ): Promise<Channel.Webhook> {
        return this.patch(Routes.webhooksId(webhookId), options);
    }

    public editWebhookWithToken(
        webhookId: Snowflake,
        token: string,
        options: Options.WebhookOptions,
    ): Promise<Channel.Webhook> {
        const info = Routes.webhooksIdToken(webhookId, token);

        return this.request("delete", info.bucket, info.path, options, false);
    }

    public executeWebhook(
        webhookId: Snowflake,
        token: string,
        wait: boolean,
        options: Options.WebhookExecutionOptions,
    ): Promise<Channel.Message | null> {
        const info = Routes.webhooksIdToken(webhookId, token);

        if (wait) {
            info.path += `?wait=${wait}`;
        }

        return this.request("patch", info.bucket, info.path, options, false);
    }

    public getAuditLogs(
        guildId: Snowflake,
        actionType?: number,
        userId?: Snowflake,
        before?: number,
        limit?: number,
    ): Promise<Guild.AuditLog> {
        const info = Routes.guildsIdAuditLogs(guildId);

        actionType = actionType || 0;
        before = before || 0;
        limit = limit || 50;

        const configuredUserId = userId ? userId.value : "0";

        info.path += `?user_id=${configuredUserId}&action_type=${actionType}&before=${before}&limit=${limit}`;

        return this.get(info);
    }

    public getBans(guildId: Snowflake): Promise<Guild.Ban[]> {
        return this.get(Routes.guildsIdBans(guildId));
    }

    public getChannel(channelId: Snowflake): Promise<Channel.Channel> {
        return this.get(Routes.channelsId(channelId));
    }

    public getChannelInvites(channelId: Snowflake): Promise<Guild.RichInvite[]> {
        return this.get(Routes.channelsIdInvites(channelId));
    }

    public getChannelWebhooks(channelId: Snowflake): Promise<Channel.Webhook[]> {
        return this.get(Routes.channelsIdWebhooks(channelId));
    }

    public getCurrentApplicationInfo(): Promise<Application.CurrentApplicationInfo> {
        return this.get(Routes.oauth2ApplicationsTargetId("@me"));
    }

    public getCurrentUser(): Promise<User.AuthenticatedUser> {
        return this.get(Routes.usersId("@me"));
    }

    public getGateway(): Promise<Gateway.Gateway> {
        return this.get(Routes.gateway());
    }

    public getGatewayBot(): Promise<Gateway.BotGateway> {
        return this.get(Routes.gatewayBot());
    }

    public getGuild(guildId: Snowflake): Promise<Guild.PartialGuild> {
        return this.get(Routes.guildsId(guildId));
    }

    public getGuildChannels(guildId: Snowflake): Promise<Guild.GuildChannel[]> {
        return this.get(Routes.guildsIdChannels(guildId));
    }

    public getGuildEmbed(guildId: Snowflake): Promise<Guild.GuildEmbed> {
        return this.get(Routes.guildsIdEmbed(guildId));
    }

    public getGuildIntegrations(guildId: Snowflake): Promise<Guild.Integration[]> {
        return this.get(Routes.guildsIdIntegrations(guildId));
    }

    public getGuildInvites(guildId: Snowflake): Promise<Guild.RichInvite[]> {
        return this.get(Routes.guildsIdInvites(guildId));
    }

    public getGuildMembers(
        guildId: Snowflake,
        after?: Snowflake,
        limit?: number,
    ): Promise<Guild.Member[]> {
        const info = Routes.guildsIdMembers(guildId);

        if (after || limit) {
            info.path += "?";

            if (after) {
                info.path += `&after=${after}`;
            }

            if (limit) {
                info.path += `&limit=${limit}`;
            }
        }

        return this.get(info);
    }

    public getGuildPruneCount(guildId: Snowflake): Promise<Guild.GuildPrune> {
        return this.get(Routes.guildsIdPrune(guildId));
    }

    public getGuildRegions(guildId: Snowflake): Promise<Voice.VoiceRegion[]> {
        return this.get(Routes.guildsIdRegions(guildId));
    }

    public getGuildRoles(guildId: Snowflake): Promise<Guild.Role[]> {
        return this.get(Routes.guildsIdRoles(guildId));
    }

    public async getGuildVanityUrl(guildId: Snowflake): Promise<string> {
        interface VanityUrl {
            code: string;
        }

        const resp = await this.get<VanityUrl>(Routes.guildsIdVanityUrl(guildId));

        return resp.code;
    }

    public getGuildWebhooks(guildId: Snowflake): Promise<Channel.Webhook[]> {
        return this.get(Routes.guildsIdWebhooks(guildId));
    }

    public getInvite(code: string, stats: boolean = true): Promise<Guild.Invite> {
        const info = Routes.invitesCode(code);

        if (stats) {
            info.path += "?with_stats=true";
        }

        return this.get(info);
    }

    public async getMember(guildId: Snowflake, userId: Snowflake): Promise<Guild.Member> {
        const info = Routes.guildsIdMembersUserId(guildId, userId);

        const resp = await this.get<any>(info);
        resp.guild_id = guildId.value;

        return resp;
    }

    public getMessage(channelId: Snowflake, messageId: Snowflake): Promise<Channel.Message> {
        return this.get(Routes.channelsIdMessagesId(channelId, messageId));
    }

    public getMessages(
        channelId: Snowflake,
        options: Options.MessageRetrievalOptions,
    ): Promise<Channel.Message[]> {
        const limit = options.limit || 50;

        let query = `?limit=${limit}`;

        if (options.after) {
            query += `&after=${options.after}`;
        }

        if (options.around) {
            query += `&around=${options.around}`;
        }

        if (options.before) {
            query += `&before=${options.before}`;
        }

        const info = Routes.channelsIdMessages(channelId);
        info.path += query;

        return this.get(info);
    }

    public getPins(channelId: Snowflake): Promise<Channel.Message[]> {
        return this.get(Routes.channelsIdPins(channelId));
    }

    public getReactionUsers(
        channelId: Snowflake,
        messageId: Snowflake,
        reaction: Channel.Reaction,
        limit?: number,
        after?: Snowflake,
    ): Promise<User.User[]> {
        const info = Routes.channelsIdMessagesIdReactionsTarget(
            channelId,
            messageId,
            utils.parseReaction(reaction),
        );

        info.path += "?";

        if (after) {
            info.path += `&after=${after}`;
        }

        if (limit) {
            info.path += `&limit=${limit}`;
        }

        return this.get(info);
    }

    public getUser(userId: Snowflake): Promise<User.User> {
        return this.get(Routes.usersId(userId));
    }

    public getUserDmChannels(): Promise<Channel.DMChannel[]> {
        return this.get(Routes.usersIdChannels("@me"));
    }

    public getVoiceRegions(): Promise<Voice.VoiceRegion[]> {
        return this.get(Routes.voiceRegions());
    }

    public getWebhook(webhookId: Snowflake): Promise<Channel.Webhook> {
        return this.get(Routes.webhooksId(webhookId));
    }

    public getWebhookWithToken(webhookId: Snowflake, token: string): Promise<Channel.Webhook> {
        return this.get(Routes.webhooksIdToken(webhookId, token));
    }

    public kickMember(guildId: Snowflake, userId: Snowflake): Promise<null> {
        return this.delete(Routes.guildsIdMembersUserId(guildId, userId));
    }

    public leaveGroup(groupId: Snowflake): Promise<Channel.Group> {
        return this.delete(Routes.channelsId(groupId));
    }

    public leaveGuild(guildId: Snowflake): Promise<null> {
        return this.delete(Routes.usersIdGuildsId("@me", guildId));
    }

    public pinMessage(channelId: Snowflake, messageId: Snowflake): Promise<null> {
        return this.put(Routes.channelsIdPinsMessageId(channelId, messageId));
    }

    public removeBan(guildId: Snowflake, userId: Snowflake): Promise<null> {
        return this.delete(Routes.guildsIdBansUserId(guildId, userId));
    }

    public removeGroupRecipient(groupId: Snowflake, userId: Snowflake): Promise<null> {
        return this.delete(Routes.channelsIdRecipientsId(groupId, userId));
    }

    public removeMemberRole(
        guildId: Snowflake,
        userId: Snowflake,
        roleId: Snowflake,
    ): Promise<null> {
        return this.get(Routes.guildsIdMembersUserIdRolesId(
            guildId,
            userId,
            roleId,
        ));
    }

    public startGuildPrune(guildId: Snowflake, days: number = 7): Promise<Guild.GuildPrune> {
        const info = Routes.guildsIdPrune(guildId);
        info.path += `?days=${days}`;

        return this.post(info);
    }

    public startIntegrationSync(guildId: Snowflake, integrationId: Snowflake): Promise<null> {
        return this.post(Routes.guildsIdIntegrationsIdSync(guildId, integrationId));
    }

    public unpinMessage(channelId: Snowflake, messageId: Snowflake): Promise<null> {
        return this.delete(Routes.channelsIdPinsMessageId(channelId, messageId));
    }

    /**
     * Performs a DELETE request.
     *
     * @param {RouteInfo} route The request route information.
     * @returns {Promise.<T>}
     * @memberof Water
     * @method
     * @protected
     */
    protected delete<T>(route: RouteInfo): Promise<T> {
        return this.request("delete", route.bucket, route.path);
    }

    /**
     * Performs a GET request.
     *
     * @param {RouteInfo} route The request route information.
     * @returns {Promise.<T>}
     * @memberof Water
     * @method
     * @protected
     */
    protected get<T>(route: RouteInfo): Promise<T> {
        return this.request("get", route.bucket, route.path);
    }

    /**
     * Performs a PATCH request.
     *
     * @param {RouteInfo} route The request route information.
     * @param {any} [body=null] The request body, if any.
     * @returns {Promise.<T>}
     * @memberof Water
     * @method
     * @protected
     */
    protected patch<T>(route: RouteInfo, body: any = null): Promise<T> {
        return this.request("patch", route.bucket, route.path, body);
    }

    /**
     * Performs a POST request.
     *
     * @param {RouteInfo} route The request route information.
     * @param {any} [body=null] The request body, if any.
     * @returns {Promise.<T>}
     * @memberof Water
     * @method
     * @protected
     */
    protected post<T>(route: RouteInfo, body: any = null): Promise<T> {
        return this.request("post", route.bucket, route.path, body);
    }

    /**
     * Performs a PUT request.
     *
     * @param {RouteInfo} route The request route information.
     * @param {any} [body=null] The request body, if any.
     * @returns {Promise.<T>}
     * @memberof Water
     * @method
     * @protected
     */
    protected put<T>(route: RouteInfo, body: any = null): Promise<T> {
        return this.request("put", route.bucket, route.path, body);
    }

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
     * @protected
     */
    protected async request<T>(
        method: Method,
        bucketIdentifier: string,
        path: string,
        body: any = null,
        auth: boolean = true,
    ): Promise<T> {
        await this.rateLimiter.take(bucketIdentifier);

        const headers: RequestHeaders = {
            "Content-Type": "application/json",
            "User-Agent": this.userAgent,
        };

        if (auth) {
            headers.Authorization = this.token;
        }

        return new Promise<T>((resolve, reject) => {
            const request = https.request({
                headers: {
                    "Authorization": this.token,
                    "Content-Type": "application/json",
                },
                host: Constants.API_HOST,
                method,
                path: `${Constants.API_BASE_PATH}/${path}`,
            });

            request.once("error", (e: Error) => {
                reject(e);
            });

            request.on("response", (response: http.ClientResponse) => {
                let data = "";

                response.on("data", (chunk: Buffer) => {
                    data += chunk;
                });

                response.once("end", () => {
                    this.rateLimiter.process(bucketIdentifier, response);

                    if (data.length === 0) {
                        return resolve(undefined);
                    }

                    if (response.headers["Content-Type"] !== "application/json") {
                        return resolve(undefined);
                    }

                    try {
                        resolve(JSON.parse(data));
                    } catch (e) {
                        reject(e);
                    }
                });

                response.on("error", (e: Error) => {
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
