"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const https = require("https");
const Constants = require("./Constants");
const RateLimiter_1 = require("./RateLimiter");
const Routes = require("./Routing/Routes");
const utils = require("./utils");
/**
 * @class
 * @default
 * @export
 * @name Water
 * @public
 */
class Water {
    /**
     * Creates an instance of Water.
     * @param {WaterOptions} options
     * @constructor
     * @memberof Water
     * @method
     * @public
     */
    constructor(options) {
        /**
         * Ratelimiter instance for this client, used to ensure that 429 requests
         * aren't performed.
         *
         * @memberof Water
         * @public
         * @property
         * @type {RateLimiter}
         */
        this.rateLimiter = new RateLimiter_1.default();
        /**
         * The version of the library. Used in the user-agent.
         *
         * @memberof Water
         * @public
         * @property
         * @readonly
         * @type {string}
         */
        this.version = "0.0.1";
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
        this.requestHost = Constants.API_HOST;
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
        this.requestPath = Constants.API_BASE_PATH;
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
        this.requestProtocol = Constants.API_PROTOCOL;
        /**
         * The User Agent to be used in all requests to the API.
         *
         * @memberof Water
         * @private
         * @property
         * @type {string}
         */
        this.userAgent = `DiscordBot (https://github.com/yuki-bot/water, ${this.version})`;
        this.innerToken = Water.transformToken(options.token);
        if (options.proxy) {
            this.requestHost = options.proxy.host;
            this.requestPath = options.proxy.path;
            this.requestProtocol = options.proxy.protocol;
        }
    }
    /**
     * Transforms a token for use, prepending `Bot ` if it's not already.
     *
     * @param {string} token The new token to use.
     * @returns {string} The transformed token.
     * @memberof Water
     * @private
     * @static
     */
    static transformToken(token) {
        return token.startsWith("Bot") ? token : `Bot ${token}`;
    }
    /**
     * Retrieves the currently-configured token.
     *
     * @returns {string}
     * @memberof Water
     * @method
     * @public
     */
    get token() {
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
    set token(token) {
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
    addGroupRecipient(groupId, userId) {
        return this.get(Routes.channelsIdRecipientsId(groupId, userId));
    }
    addMemberRole(guildId, userId, roleId) {
        return this.put(Routes.guildsIdUsersIdRolesId(guildId, userId, roleId));
    }
    banUser(guildId, userId, deleteMessageDays, reason) {
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
    broadcastTyping(channelId) {
        return this.post(Routes.channelsIdTyping(channelId));
    }
    createChannel(guildId, options) {
        return this.post(Routes.guildsIdChannels(guildId), options);
    }
    createEmoji(guildId, options) {
        return this.post(Routes.guildsIdEmojis(guildId), options);
    }
    createGuild(options) {
        return this.post(Routes.guilds(), options);
    }
    createGuildIntegration(guildId, options) {
        return this.post(Routes.guildsIdIntegrations(guildId), options);
    }
    createInvite(channelId, options) {
        return this.post(Routes.channelsIdInvites(channelId), options);
    }
    createMessage(channelId, options) {
        return this.post(Routes.channelsIdMessages(channelId), options);
    }
    createPermission(channelId, targetId, options) {
        return this.put(Routes.channelsIdPermissionsTargetId(channelId, targetId), options);
    }
    createPrivateChannel(userId) {
        return this.post(Routes.usersIdChannels("@me"), {
            recipient_id: userId,
        });
    }
    createReaction(channelId, messageId, reaction) {
        return this.get(Routes.channelsIdMessagesIdReactionsTargetUserId(channelId, messageId, utils.parseReaction(reaction), "@me"));
    }
    createRole(guildId, options) {
        return this.post(Routes.guildsIdRoles(guildId), options);
    }
    createWebhook(channelId, options) {
        return this.post(Routes.channelsIdWebhooks(channelId), options);
    }
    deleteChannel(channelId) {
        return this.delete(Routes.channelsId(channelId));
    }
    deleteEmoji(guildId, emojiId) {
        return this.delete(Routes.guildsIdEmojisId(guildId, emojiId));
    }
    deleteGuild(guildId) {
        return this.delete(Routes.guildsId(guildId));
    }
    deleteGuildIntegration(guildId, integrationId) {
        return this.delete(Routes.guildsIdIntegrationsId(guildId, integrationId));
    }
    deleteInvite(code) {
        return this.delete(Routes.invitesCode(code));
    }
    deleteMessage(channelId, messageId) {
        return this.delete(Routes.channelsIdMessagesId(channelId, messageId));
    }
    deleteMessages(channelId, messageIds) {
        return this.post(Routes.channelsIdMessages(channelId), messageIds);
    }
    deleteMessageReactions(channelId, messageId) {
        return this.delete(Routes.channelsIdMessagesIdReactions(channelId, messageId));
    }
    deletePermission(channelId, targetId) {
        return this.delete(Routes.channelsIdPermissionsTargetId(channelId, targetId));
    }
    deleteReaction(channelId, messageId, userId, reaction) {
        let configuredUserId;
        if (userId) {
            configuredUserId = userId.value;
        }
        else {
            configuredUserId = "@me";
        }
        return this.delete(Routes.channelsIdMessagesIdReactionsTargetUserId(channelId, messageId, utils.parseReaction(reaction), configuredUserId));
    }
    deleteRole(guildId, roleId) {
        return this.delete(Routes.guildsIdRolesId(guildId, roleId));
    }
    deleteWebhook(webhookId) {
        return this.delete(Routes.webhooksId(webhookId));
    }
    deleteWebhookWithToken(webhookId, token) {
        const info = Routes.webhooksIdToken(webhookId, token);
        return this.request("delete", info.bucket, info.path, null, false);
    }
    editChannel(channelId, options) {
        return this.patch(Routes.channelsId(channelId), options);
    }
    editEmoji(guildId, emojiId, options) {
        return this.patch(Routes.guildsIdEmojisId(guildId, emojiId), options);
    }
    editGuild(guildId, options) {
        return this.patch(Routes.guildsId(guildId), options);
    }
    editGuildChannelPositions(guildId, channels) {
        const body = channels.reduce((acc, value) => {
            acc[value[0].value] = value[1];
            return acc;
        }, {});
        return this.patch(Routes.guildsIdChannels(guildId), body);
    }
    editGuildEmbed(guildId, options) {
        return this.patch(Routes.guildsIdEmbed(guildId), options);
    }
    async editMember(guildId, userId, options) {
        return this.patch(Routes.guildsIdMembersUserId(guildId, userId), options);
    }
    editMessage(channelId, messageId, options) {
        return this.patch(Routes.channelsIdMessagesId(channelId, messageId), options);
    }
    editNickname(guildId, newNickname = null) {
        const body = {
            new_nickname: newNickname,
        };
        return this.patch(Routes.guildsIdMembersTargetIdNick(guildId, "@me"), body);
    }
    editProfile(options) {
        return this.patch(Routes.usersId("@me"), options);
    }
    editRole(guildId, roleId, options) {
        return this.patch(Routes.guildsIdRolesId(guildId, roleId), options);
    }
    editRolePosition(guildId, roleId, position) {
        const body = {
            id: roleId,
            position,
        };
        return this.patch(Routes.guildsIdRolesId(guildId, roleId), body);
    }
    editWebhook(webhookId, options) {
        return this.patch(Routes.webhooksId(webhookId), options);
    }
    editWebhookWithToken(webhookId, token, options) {
        const info = Routes.webhooksIdToken(webhookId, token);
        return this.request("delete", info.bucket, info.path, options, false);
    }
    executeWebhook(webhookId, token, wait, options) {
        const info = Routes.webhooksIdToken(webhookId, token);
        if (wait) {
            info.path += `?wait=${wait}`;
        }
        return this.request("patch", info.bucket, info.path, options, false);
    }
    getAuditLogs(guildId, actionType, userId, before, limit) {
        const info = Routes.guildsIdAuditLogs(guildId);
        actionType = actionType || 0;
        before = before || 0;
        limit = limit || 50;
        const configuredUserId = userId ? userId.value : "0";
        info.path += `?user_id=${configuredUserId}&action_type=${actionType}&before=${before}&limit=${limit}`;
        return this.get(info);
    }
    getBans(guildId) {
        return this.get(Routes.guildsIdBans(guildId));
    }
    getChannel(channelId) {
        return this.get(Routes.channelsId(channelId));
    }
    getChannelInvites(channelId) {
        return this.get(Routes.channelsIdInvites(channelId));
    }
    getChannelWebhooks(channelId) {
        return this.get(Routes.channelsIdWebhooks(channelId));
    }
    getCurrentApplicationInfo() {
        return this.get(Routes.oauth2ApplicationsTargetId("@me"));
    }
    getCurrentUser() {
        return this.get(Routes.usersId("@me"));
    }
    getGateway() {
        return this.get(Routes.gateway());
    }
    getGatewayBot() {
        return this.get(Routes.gatewayBot());
    }
    getGuild(guildId) {
        return this.get(Routes.guildsId(guildId));
    }
    getGuildChannels(guildId) {
        return this.get(Routes.guildsIdChannels(guildId));
    }
    getGuildEmbed(guildId) {
        return this.get(Routes.guildsIdEmbed(guildId));
    }
    getGuildIntegrations(guildId) {
        return this.get(Routes.guildsIdIntegrations(guildId));
    }
    getGuildInvites(guildId) {
        return this.get(Routes.guildsIdInvites(guildId));
    }
    getGuildMembers(guildId, after, limit) {
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
    getGuildPruneCount(guildId) {
        return this.get(Routes.guildsIdPrune(guildId));
    }
    getGuildRegions(guildId) {
        return this.get(Routes.guildsIdRegions(guildId));
    }
    getGuildRoles(guildId) {
        return this.get(Routes.guildsIdRoles(guildId));
    }
    async getGuildVanityUrl(guildId) {
        const resp = await this.get(Routes.guildsIdVanityUrl(guildId));
        return resp.code;
    }
    getGuildWebhooks(guildId) {
        return this.get(Routes.guildsIdWebhooks(guildId));
    }
    getInvite(code, stats = true) {
        const info = Routes.invitesCode(code);
        if (stats) {
            info.path += "?with_stats=true";
        }
        return this.get(info);
    }
    async getMember(guildId, userId) {
        const info = Routes.guildsIdMembersUserId(guildId, userId);
        const resp = await this.get(info);
        resp.guild_id = guildId.value;
        return resp;
    }
    getMessage(channelId, messageId) {
        return this.get(Routes.channelsIdMessagesId(channelId, messageId));
    }
    getMessages(channelId, options) {
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
    getPins(channelId) {
        return this.get(Routes.channelsIdPins(channelId));
    }
    getReactionUsers(channelId, messageId, reaction, limit, after) {
        const info = Routes.channelsIdMessagesIdReactionsTarget(channelId, messageId, utils.parseReaction(reaction));
        info.path += "?";
        if (after) {
            info.path += `&after=${after}`;
        }
        if (limit) {
            info.path += `&limit=${limit}`;
        }
        return this.get(info);
    }
    getUser(userId) {
        return this.get(Routes.usersId(userId));
    }
    getUserDmChannels() {
        return this.get(Routes.usersIdChannels("@me"));
    }
    getVoiceRegions() {
        return this.get(Routes.voiceRegions());
    }
    getWebhook(webhookId) {
        return this.get(Routes.webhooksId(webhookId));
    }
    getWebhookWithToken(webhookId, token) {
        return this.get(Routes.webhooksIdToken(webhookId, token));
    }
    kickMember(guildId, userId) {
        return this.delete(Routes.guildsIdMembersUserId(guildId, userId));
    }
    leaveGroup(groupId) {
        return this.delete(Routes.channelsId(groupId));
    }
    leaveGuild(guildId) {
        return this.delete(Routes.usersIdGuildsId("@me", guildId));
    }
    pinMessage(channelId, messageId) {
        return this.put(Routes.channelsIdPinsMessageId(channelId, messageId));
    }
    removeBan(guildId, userId) {
        return this.delete(Routes.guildsIdBansUserId(guildId, userId));
    }
    removeGroupRecipient(groupId, userId) {
        return this.delete(Routes.channelsIdRecipientsId(groupId, userId));
    }
    removeMemberRole(guildId, userId, roleId) {
        return this.get(Routes.guildsIdMembersUserIdRolesId(guildId, userId, roleId));
    }
    startGuildPrune(guildId, days = 7) {
        const info = Routes.guildsIdPrune(guildId);
        info.path += `?days=${days}`;
        return this.post(info);
    }
    startIntegrationSync(guildId, integrationId) {
        return this.post(Routes.guildsIdIntegrationsIdSync(guildId, integrationId));
    }
    unpinMessage(channelId, messageId) {
        return this.delete(Routes.channelsIdPinsMessageId(channelId, messageId));
    }
    /**
     * Performs a DELETE request.
     *
     * @param {RouteInfo} route The request route information.
     * @returns {Promise.<T>}
     * @memberof Water
     * @method
     * @public
     */
    delete(route) {
        return this.request("delete", route.bucket, route.path);
    }
    /**
     * Performs a GET request.
     *
     * @param {RouteInfo} route The request route information.
     * @returns {Promise.<T>}
     * @memberof Water
     * @method
     * @public
     */
    get(route) {
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
     * @public
     */
    patch(route, body = null) {
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
     * @public
     */
    post(route, body = null) {
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
     * @public
     */
    put(route, body = null) {
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
     * @public
     */
    async request(method, bucketIdentifier, path, body = null, auth = true) {
        await this.rateLimiter.take(bucketIdentifier);
        const headers = {
            "Content-Type": "application/json",
            "User-Agent": this.userAgent,
        };
        if (auth) {
            headers.Authorization = this.token;
        }
        return new Promise((resolve, reject) => {
            const request = https.request({
                headers: {
                    "Authorization": this.token,
                    "Content-Type": "application/json",
                },
                host: this.requestHost,
                method,
                path: `${this.requestPath}/${path}`,
                protocol: this.requestProtocol,
            });
            request.once("error", (e) => {
                reject(e);
            });
            request.on("response", (response) => {
                let data = "";
                response.on("data", (chunk) => {
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
                    }
                    catch (e) {
                        reject(e);
                    }
                });
                response.on("error", (e) => {
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
exports.default = Water;
//# sourceMappingURL=index.js.map