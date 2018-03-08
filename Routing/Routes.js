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
//# sourceMappingURL=Routes.js.map