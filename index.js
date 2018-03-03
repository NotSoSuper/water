define("Constants", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * The supported REST API version.
     *
     * @constant
     * @export
     * @type {number}
     */
    exports.API_VERSION = 7;
    /**
     * The base path of the API. Uses the version set to `API_VERSION`.
     *
     * @constant
     * @export
     * @type {string}
     */
    exports.API_BASE_PATH = `/v${exports.API_VERSION}`;
    /**
     * The host of the API.
     *
     * @constant
     * @export
     * @type {string}
     */
    exports.API_HOST = "discordapp.com";
    /**
     * The host of the CDN.
     *
     * @constant
     * @export
     * @type {string}
     */
    exports.CDN_HOST = "cdn.discordapp.com";
    /**
     * The base URI of the CDN.
     *
     * @constant
     * @export
     * @type {string}
     */
    exports.CDN_BASE = `https://${exports.CDN_HOST}`;
});
define("RateLimiter", ["require", "exports", "branches"], function (require, exports, branches_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Container for path-specific buckets and retrieving tickets from them.
     *
     * Manages ratelimits, queueing requests, and a global ratelimit lock.
     *
     * @class
     * @export
     * @name RateLimiter
     */
    class RateLimiter {
        constructor() {
            /**
             * Map containing the buckets, keyed by their path.
             *
             * For example, a bucket may have a path of `/channels/{}`.
             *
             * @prop
             * @public
             * @type {Map<string, Bucket>}
             */
            this.buckets = new Map();
            /**
             * The global ratelimit lock.
             *
             * If this is set to true, then it is a unix timestamp with millisecond
             * precision. All requests must sleep until this time.
             *
             * If this is null, then the global ratelimit has not yet (knowingly) been
             * reached.
             *
             * @prop
             * @public
             * @type {number | null}
             */
            this.global = null;
        }
        /**
         * Retrieves a bucket by identifier.
         *
         * This should be in the form of `/channels/1234567890/messages/{}`.
         *
         * Creates a new bucket if one does not exist for the identifier.
         *
         * @param bucketIdentifier The ID of the bucket.
         * @returns {Bucket} The ratelimit bucket.
         * @method
         * @public
         */
        get(bucketIdentifier) {
            if (!this.buckets.has(bucketIdentifier)) {
                this.buckets.set(bucketIdentifier, new branches_1.Bucket());
            }
            // Guarenteed to never be undefined.
            return this.buckets.get(bucketIdentifier);
        }
        /**
         * Processess a response, searching for ratelimit headers, a 'Retry-After'
         * header, and 'X-RateLimit-Global' header.
         *
         * If the 'X-RateLimit-Global' header is present, then the global bucket is
         * set. Otherwise, only this request is slept for the time specified in
         * `Retry-After`.
         *
         * @param bucketIdentifier The ID of the bucket.
         * @param response The Axios response from sending a request.
         * @returns Returns the number of milliseconds to wait before re-requesting.
         * This is only valid if a 429 was approached. Otherwise, returns null,
         * indicating the response is successful.
         * @method
         * @public
         */
        process(bucketIdentifier, response) {
            const bucket = this.get(bucketIdentifier);
            const limit = response.headers["X-RateLimit-Limit"];
            const remaining = response.headers["X-RateLimit-Remaining"];
            const reset = response.headers["X-RateLimit-Reset"];
            if (limit && typeof limit === "number") {
                bucket.limit = limit;
            }
            if (remaining && typeof remaining === "number") {
                bucket.remaining = remaining;
            }
            if (reset && typeof reset === "number") {
                bucket.reset = reset;
            }
            if (response.statusCode !== 429) {
                return null;
            }
            let retryAfter = null;
            const retryHeader = response.headers["Retry-After"];
            if (retryHeader) {
                const value = typeof retryHeader === "string" ? retryHeader : retryHeader[0];
                const parsed = parseInt(value, 10);
                if (!isNaN(parsed)) {
                    retryAfter = parsed;
                }
            }
            if (!retryAfter) {
                return null;
            }
            if (Boolean(response.headers["X-RateLimit-Global"])) {
                this.global = new Date().getTime() + retryAfter;
            }
            return retryAfter;
        }
        /**
         * Takes a ticket from the given bucket identifier.
         *
         * @param {string} bucketIdentifier The ID of the bucket.
         * @method
         * @public
         */
        async take(bucketIdentifier) {
            if (this.global) {
                const diff = this.global - new Date().getTime();
                await new Promise((resolve) => setTimeout(resolve, diff));
            }
            const bucket = this.get(bucketIdentifier);
            await bucket.take();
        }
    }
    exports.default = RateLimiter;
});
define("Routing/Options", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("Routing/Routes", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @param {string} res The path to use for both the `bucket` and `path` of a
     * `RouteInfo`.
     * @returns {RouteInfo} The information for a route.
     * @function
     */
    function single(res) {
        return {
            bucket: res,
            path: res,
        };
    }
    /**
     * @param {Snowflake} channelId The ID of the channel.
     * @returns {RouteInfo}
     * @export
     * @function
     */
    function channelsId(channelId) {
        return single(`/channels/${channelId}`);
    }
    exports.channelsId = channelsId;
    /**
     * @param {Snowflake} channelId The ID of the channel.
     * @returns {RouteInfo}
     * @export
     * @function
     */
    function channelsIdInvites(channelId) {
        return single(`/channels/${channelId}/invites`);
    }
    exports.channelsIdInvites = channelsIdInvites;
    /**
     * @param {Snowflake} channelId The ID of the channel.
     * @returns {RouteInfo}
     * @export
     * @function
     */
    function channelsIdMessages(channelId) {
        return single(`/channels/${channelId}/messages`);
    }
    exports.channelsIdMessages = channelsIdMessages;
    /**
     * @param {Snowflake} channelId The ID of the channel.
     * @param {Snowflake} messageId The ID of the message.
     * @returns {RouteInfo}
     * @export
     * @function
     */
    function channelsIdMessagesId(channelId, messageId) {
        return {
            bucket: `/channels/${channelId}/messages/{}`,
            path: `/channels/${channelId}/messages/${messageId}`,
        };
    }
    exports.channelsIdMessagesId = channelsIdMessagesId;
    /**
     * @param {Snowflake} channelId The ID of the channel.
     * @param {Snowflake} messageId The ID of the message.
     * @returns {RouteInfo}
     * @export
     * @function
     */
    function channelsIdMessagesIdReactions(channelId, messageId) {
        return {
            bucket: `/channels/${channelId}/messages/{}/reactions`,
            path: `/channels/${channelId}/messages/${messageId}/reactions`,
        };
    }
    exports.channelsIdMessagesIdReactions = channelsIdMessagesIdReactions;
    /**
     * @param {Snowflake} channelId The ID of the channel.
     * @param {Snowflake} messageId The ID of the message.
     * @param {string} reactionData
     * @returns {RouteInfo}
     * @export
     * @function
     */
    function channelsIdMessagesIdReactionsTarget(channelId, messageId, reactionData) {
        return {
            bucket: `/channels/${channelId}/messages/{}/reactions/{}`,
            path: `/channels/${channelId}/messages/${messageId}/reactions/${reactionData}`,
        };
    }
    exports.channelsIdMessagesIdReactionsTarget = channelsIdMessagesIdReactionsTarget;
    /**
     * @param {Snowflake} channelId The ID of the channel.
     * @param {Snowflake} messageId The ID of the message.
     * @param {string} reactionData
     * @param {Snowflake | string} userId
     * @returns {RouteInfo}
     * @export
     * @function
     */
    function channelsIdMessagesIdReactionsTargetUserId(channelId, messageId, reactionData, userId) {
        return {
            bucket: `/channels/${channelId}/messages/{}/reactions/{}/{}`,
            path: `/channels/${channelId}/messages/${messageId}/reactions/${reactionData}/${userId}`,
        };
    }
    exports.channelsIdMessagesIdReactionsTargetUserId = channelsIdMessagesIdReactionsTargetUserId;
    /**
     * @param {Snowflake} channelId The ID of the channel.
     * @param {Snowflake} targetId The ID of the target.
     * @returns {RouteInfo}
     * @export
     * @function
     */
    function channelsIdPermissionsTargetId(channelId, targetId) {
        return {
            bucket: `/channels/${channelId}/permissions/{}`,
            path: `/channels/${channelId}/permissions/${targetId}`,
        };
    }
    exports.channelsIdPermissionsTargetId = channelsIdPermissionsTargetId;
    /**
     * @param {Snowflake} channelId The ID of the channel.
     * @returns {RouteInfo}
     * @export
     * @function
     */
    function channelsIdPins(channelId) {
        return single(`/channels/${channelId}/pins`);
    }
    exports.channelsIdPins = channelsIdPins;
    /**
     * @param {Snowflake} channelId The ID of the channel.
     * @param {Snowflake} messageId The ID of the message.
     * @returns {RouteInfo}
     * @export
     * @function
     */
    function channelsIdPinsMessageId(channelId, messageId) {
        return {
            bucket: `/channels/${channelId}/pins/{}`,
            path: `/channels/${channelId}/pins/${messageId}`,
        };
    }
    exports.channelsIdPinsMessageId = channelsIdPinsMessageId;
    /**
     * @param {Snowflake} channelId The ID of the channel.
     * @param {Snowflake} userId The ID of the user.
     * @returns {RouteInfo}
     * @export
     * @function
     */
    function channelsIdRecipientsId(groupId, userId) {
        return {
            bucket: `/channels/${groupId}/recipients/{}`,
            path: `/channels/${groupId}/recipients/${userId}`,
        };
    }
    exports.channelsIdRecipientsId = channelsIdRecipientsId;
    /**
     * @param {Snowflake} channelId The ID of the channel.
     * @returns {RouteInfo}
     * @export
     * @function
     */
    function channelsIdTyping(channelId) {
        return single(`/channels/${channelId}/typing`);
    }
    exports.channelsIdTyping = channelsIdTyping;
    /**
     * @param {Snowflake} channelId The ID of the channel.
     * @returns {RouteInfo}
     * @export
     * @function
     */
    function channelsIdWebhooks(channelId) {
        return single(`/channels/${channelId}/webhooks`);
    }
    exports.channelsIdWebhooks = channelsIdWebhooks;
    /**
     * @returns {RouteInfo}
     * @export
     * @function
     */
    function gateway() {
        return single("/gateway");
    }
    exports.gateway = gateway;
    /**
     * @returns {RouteInfo}
     * @export
     * @function
     */
    function gatewayBot() {
        return single("/gateway/bot");
    }
    exports.gatewayBot = gatewayBot;
    /**
     * @returns {RouteInfo}
     * @export
     * @function
     */
    function guilds() {
        return {
            bucket: "/guilds",
            path: "/guilds",
        };
    }
    exports.guilds = guilds;
    /**
     * @returns {RouteInfo}
     * @export
     * @function
     */
    function guildsId(guildId) {
        return single(`/guilds/${guildId}`);
    }
    exports.guildsId = guildsId;
    /**
     * @param {Snowflake} guildId The ID of the guild.
     * @returns {RouteInfo}
     * @export
     * @function
     */
    function guildsIdAuditLogs(guildId) {
        return single(`/guilds/${guildId}/audit-logs`);
    }
    exports.guildsIdAuditLogs = guildsIdAuditLogs;
    /**
     * @param {Snowflake} guildId The ID of the guild.
     * @returns {RouteInfo}
     * @export
     * @function
     */
    function guildsIdBans(guildId) {
        return single(`/guilds/${guildId}/bans`);
    }
    exports.guildsIdBans = guildsIdBans;
    /**
     * @param {Snowflake} guildId The ID of the guild.
     * @param {Snowflake} userId The ID of the user.
     * @returns {RouteInfo}
     * @export
     * @function
     */
    function guildsIdBansUserId(guildId, userId) {
        return {
            bucket: `/guilds/${guildId}/bans/{}`,
            path: `/guilds/${guildId}/bans/${userId}`,
        };
    }
    exports.guildsIdBansUserId = guildsIdBansUserId;
    /**
     * @param {Snowflake} guildId The ID of the guild.
     * @returns {RouteInfo}
     * @export
     * @function
     */
    function guildsIdChannels(guildId) {
        return single(`/guilds/${guildId}/channels`);
    }
    exports.guildsIdChannels = guildsIdChannels;
    /**
     * @param {Snowflake} guildId The ID of the guild.
     * @returns {RouteInfo}
     * @export
     * @function
     */
    function guildsIdEmbed(guildId) {
        return single(`/guilds/${guildId}/embed`);
    }
    exports.guildsIdEmbed = guildsIdEmbed;
    /**
     * @param {Snowflake} guildId The ID of the guild.
     * @returns {RouteInfo}
     * @export
     * @function
     */
    function guildsIdEmojis(guildId) {
        return single(`/guilds/${guildId}/emojis`);
    }
    exports.guildsIdEmojis = guildsIdEmojis;
    /**
     * @param {Snowflake} guildId The ID of the guild.
     * @param {Snowflake} emojiId The ID of the emoji.
     * @returns {RouteInfo}
     * @export
     * @function
     */
    function guildsIdEmojisId(guildId, emojiId) {
        return {
            bucket: `/guilds/${guildId}/emojis/{}`,
            path: `/guilds/${guildId}/emojis/${emojiId}`,
        };
    }
    exports.guildsIdEmojisId = guildsIdEmojisId;
    /**
     * @param {Snowflake} guildId The ID of the guild.
     * @returns {RouteInfo}
     * @export
     * @function
     */
    function guildsIdIntegrations(guildId) {
        return single(`/guilds/${guildId}/integrations`);
    }
    exports.guildsIdIntegrations = guildsIdIntegrations;
    /**
     * @param {Snowflake} guildId The ID of the guild.
     * @param {Snowflake} integrationId The ID of the integration.
     * @returns {RouteInfo}
     * @export
     * @function
     */
    function guildsIdIntegrationsId(guildId, integrationId) {
        return {
            bucket: `/guilds/${guildId}/integrations/{}`,
            path: `/guilds/${guildId}/integrations/${integrationId}`,
        };
    }
    exports.guildsIdIntegrationsId = guildsIdIntegrationsId;
    /**
     * @param {Snowflake} guildId The ID of the guild.
     * @param {Snowflake} integrationId The ID of the integration.
     * @returns {RouteInfo}
     * @export
     * @function
     */
    function guildsIdIntegrationsIdSync(guildId, integrationId) {
        return {
            bucket: `/guilds/${guildId}/integrations/{}/sync`,
            path: `/guilds/${guildId}/integrations/${integrationId}/sync`,
        };
    }
    exports.guildsIdIntegrationsIdSync = guildsIdIntegrationsIdSync;
    /**
     * @param {Snowflake} guildId The ID of the guild.
     * @returns {RouteInfo}
     * @export
     * @function
     */
    function guildsIdInvites(guildId) {
        return single(`/guilds/${guildId}/invites`);
    }
    exports.guildsIdInvites = guildsIdInvites;
    /**
     * @param {Snowflake} guildId The ID of the guild.
     * @returns {RouteInfo}
     * @export
     * @function
     */
    function guildsIdMembers(guildId) {
        return single(`/guilds/${guildId}/members`);
    }
    exports.guildsIdMembers = guildsIdMembers;
    /**
     * @param {Snowflake} guildId The ID of the guild.
     * @param {string} targetId The ID of the target.
     * @returns {RouteInfo}
     * @export
     * @function
     */
    function guildsIdMembersTargetIdNick(guildId, targetId) {
        return {
            bucket: `/guilds/${guildId}/members/{}/nick`,
            path: `/guilds/${guildId}/members/${targetId}/nick`,
        };
    }
    exports.guildsIdMembersTargetIdNick = guildsIdMembersTargetIdNick;
    /**
     * @param {Snowflake} guildId The ID of the guild.
     * @param {Snowflake} userId The ID of the user.
     * @returns {RouteInfo}
     * @export
     * @function
     */
    function guildsIdMembersUserId(guildId, userId) {
        return {
            bucket: `/guilds/${guildId}/members/{}`,
            path: `/guilds/${guildId}/members/${userId}`,
        };
    }
    exports.guildsIdMembersUserId = guildsIdMembersUserId;
    /**
     * @param {Snowflake} guildId The ID of the guild.
     * @param {Snowflake} userId The ID of the user.
     * @param {Snowflake} roleId The ID of the role.
     * @returns {RouteInfo}
     * @export
     * @function
     */
    function guildsIdMembersUserIdRolesId(guildId, userId, roleId) {
        return {
            bucket: `/guilds/${guildId}/members/{}/roles/{}`,
            path: `/guilds/${guildId}/members/${userId}/roles/${roleId}`,
        };
    }
    exports.guildsIdMembersUserIdRolesId = guildsIdMembersUserIdRolesId;
    /**
     * @param {Snowflake} guildId The ID of the guild.
     * @returns {RouteInfo}
     * @export
     * @function
     */
    function guildsIdPrune(guildId) {
        return single(`/guilds/${guildId}/prune`);
    }
    exports.guildsIdPrune = guildsIdPrune;
    /**
     * @param {Snowflake} guildId The ID of the guild.
     * @returns {RouteInfo}
     * @export
     * @function
     */
    function guildsIdRegions(guildId) {
        return single(`/guilds/${guildId}/regions`);
    }
    exports.guildsIdRegions = guildsIdRegions;
    /**
     * @param {Snowflake} guildId The ID of the guild.
     * @returns {RouteInfo}
     * @export
     * @function
     */
    function guildsIdRoles(guildId) {
        return single(`/guilds/${guildId}/roles`);
    }
    exports.guildsIdRoles = guildsIdRoles;
    /**
     * @param {Snowflake} guildId The ID of the guild.
     * @param {Snowflake} roleId The ID of the role.
     * @returns {RouteInfo}
     * @export
     * @function
     */
    function guildsIdRolesId(guildId, roleId) {
        return {
            bucket: `/guilds/${guildId}/roles/{}`,
            path: `/guilds/${guildId}/roles/${roleId}`,
        };
    }
    exports.guildsIdRolesId = guildsIdRolesId;
    /**
     * @param {Snowflake} guildId The ID of the guild.
     * @param {Snowflake} userId The ID of the user.
     * @param {Snowflake} roleId The ID of the role.
     * @returns {RouteInfo}
     * @export
     * @function
     */
    function guildsIdUsersIdRolesId(guildId, userId, roleId) {
        return {
            bucket: `/guilds/${guildId}/members/{}/roles/{}`,
            path: `/guilds/${guildId}/members/${userId}/roles/${roleId}`,
        };
    }
    exports.guildsIdUsersIdRolesId = guildsIdUsersIdRolesId;
    /**
     * @param {Snowflake} guildId The ID of the guild.
     * @returns {RouteInfo}
     * @export
     * @function
     */
    function guildsIdVanityUrl(guildId) {
        return single(`/guilds/${guildId}/vanity-url`);
    }
    exports.guildsIdVanityUrl = guildsIdVanityUrl;
    /**
     * @param {Snowflake} guildId The ID of the guild.
     * @returns {RouteInfo}
     * @export
     * @function
     */
    function guildsIdWebhooks(guildId) {
        return single(`/guilds/${guildId}/webhooks`);
    }
    exports.guildsIdWebhooks = guildsIdWebhooks;
    /**
     * @param {string} code The invite code.
     * @returns {RouteInfo}
     * @export
     * @function
     */
    function invitesCode(code) {
        return single(`/invites/${code}`);
    }
    exports.invitesCode = invitesCode;
    /**
     * @param {Snowflake | string} targetId The ID of the target.
     * @returns {RouteInfo}
     * @export
     * @function
     */
    function oauth2ApplicationsTargetId(targetId) {
        return {
            bucket: "/oauth2/applications/{}",
            path: `/oauth2/applications/${targetId}`,
        };
    }
    exports.oauth2ApplicationsTargetId = oauth2ApplicationsTargetId;
    /**
     * @param {Snowflake | string} userId The ID of the user.
     * @returns {RouteInfo}
     * @export
     * @function
     */
    function usersId(userId) {
        return single(`/users/${userId}`);
    }
    exports.usersId = usersId;
    /**
     * @param {Snowflake | string} userId The ID of the user.
     * @returns {RouteInfo}
     * @export
     * @function
     */
    // Accepts a string for the special case of '@me'.
    function usersIdChannels(userId) {
        return single(`/users/${userId}/channels`);
    }
    exports.usersIdChannels = usersIdChannels;
    /**
     * @param {Snowflake | string} userId The ID of the user.
     * @returns {RouteInfo}
     * @export
     * @function
     */
    function usersIdGuilds(userId) {
        return single(`/users/${userId}/guilds`);
    }
    exports.usersIdGuilds = usersIdGuilds;
    /**
     * @param {Snowflake | string} userId The ID of the user.
     * @param {Snowflake} guildId The ID of the guild.
     * @returns {RouteInfo}
     * @export
     * @function
     */
    function usersIdGuildsId(userId, guildId) {
        return {
            bucket: `/users/${userId}/guilds/{}`,
            path: `/users/${userId}/guilds/${guildId}`,
        };
    }
    exports.usersIdGuildsId = usersIdGuildsId;
    /**
     * @returns {RouteInfo}
     * @export
     * @function
     */
    function voiceRegions() {
        return single(`/voice/regions`);
    }
    exports.voiceRegions = voiceRegions;
    /**
     * @param {Snowflake} userId The ID of the webhook.
     * @returns {RouteInfo}
     * @export
     * @function
     */
    function webhooksId(webhookId) {
        return single(`/webhooks/${webhookId}`);
    }
    exports.webhooksId = webhooksId;
    /**
     * @param {Snowflake} userId The ID of the webhook.
     * @param {string} token The webhook's token.
     * @returns {RouteInfo}
     * @export
     * @function
     */
    function webhooksIdToken(webhookId, token) {
        return {
            bucket: `/webhooks/${webhookId}/{}`,
            path: `/webhooks/${webhookId}/${token}`,
        };
    }
    exports.webhooksIdToken = webhooksIdToken;
});
define("utils", ["require", "exports", "discord-models/channel"], function (require, exports, channel_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Parses a reaction into data that can be passed as a URL query parameter.
     *
     * @param {Reaction} reactionType The reaction to parse for use in URLs.
     * @returns {string} The parsed URI encoded reaction data.
     * @export
     * @function
     */
    function parseReaction(reaction) {
        let data;
        if (reaction.type === channel_1.ReactionType.Custom) {
            reaction = reaction;
            data = `${reaction.id}:${reaction.name}`;
        }
        else {
            reaction = reaction;
            data = `${reaction.value}`;
        }
        return encodeURIComponent(data);
    }
    exports.parseReaction = parseReaction;
});
define("index", ["require", "exports", "https", "Constants", "RateLimiter", "Routing/Routes", "utils"], function (require, exports, https, Constants, RateLimiter_1, Routes, utils) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
         * @param {string} token
         * @constructor
         * @memberof Water
         * @method
         * @public
         */
        constructor(token) {
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
             * The User Agent to be used in all requests to the API.
             *
             * @memberof Water
             * @private
             * @property
             * @type {string}
             */
            this.userAgent = `DiscordBot (https://github.com/yuki-bot/water, ${this.version})`;
            this.innerToken = Water.transformToken(token);
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
         * @protected
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
         * @protected
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
         * @protected
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
         * @protected
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
         * @protected
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
         * @protected
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
                    host: Constants.API_HOST,
                    method,
                    path: `${Constants.API_BASE_PATH}/${path}`,
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
});
define("Abstracts/BaseResource", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @class
     * @default
     * @export
     * @name BaseResource
     */
    class BaseResource {
        /**
         * @param client
         * @constructor
         * @method
         * @public
         */
        constructor(client) {
            this.client = client;
        }
    }
    exports.default = BaseResource;
});
define("Resources/Channel", ["require", "exports", "Abstracts/BaseResource"], function (require, exports, BaseResource_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @class
     * @default
     * @export
     * @extends {BaseResource}
     * @name Channel
     */
    class Channel extends BaseResource_1.default {
        /**
         *
         * @param {Water} client
         * @param {ChannelModel} data
         * @constructor
         * @method
         * @public
         */
        // tslint:disable-next-line:variable-name
        constructor(client, _data) {
            super(client);
        }
    }
    exports.default = Channel;
});
define("Resources/Guild", ["require", "exports", "Abstracts/BaseResource"], function (require, exports, BaseResource_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @class
     * @default
     * @export
     * @extends {BaseResource}
     * @name Guild
     */
    class Guild extends BaseResource_2.default {
        /**
         * @param {Water} client
         * @param {GuildModel} data
         * @constructor
         * @method
         * @public
         */
        // tslint:disable-next-line:variable-name
        constructor(client, _data) {
            super(client);
        }
    }
    exports.default = Guild;
});
define("Resources/User", ["require", "exports", "Abstracts/BaseResource", "Constants"], function (require, exports, BaseResource_3, Constants) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @class
     * @default
     * @export
     * @extends {BaseResource}
     * @name User
     */
    class User extends BaseResource_3.default {
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
    exports.default = User;
});
define("Resources/index", ["require", "exports", "Resources/Channel", "Resources/Guild", "Resources/User"], function (require, exports, Channel_1, Guild_1, User_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Channel = Channel_1.default;
    exports.Guild = Guild_1.default;
    exports.User = User_1.default;
});
