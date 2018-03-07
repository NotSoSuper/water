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
export function channelsId(channelId) {
    return single(`/channels/${channelId}`);
}
/**
 * @param {Snowflake} channelId The ID of the channel.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export function channelsIdInvites(channelId) {
    return single(`/channels/${channelId}/invites`);
}
/**
 * @param {Snowflake} channelId The ID of the channel.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export function channelsIdMessages(channelId) {
    return single(`/channels/${channelId}/messages`);
}
/**
 * @param {Snowflake} channelId The ID of the channel.
 * @param {Snowflake} messageId The ID of the message.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export function channelsIdMessagesId(channelId, messageId) {
    return {
        bucket: `/channels/${channelId}/messages/{}`,
        path: `/channels/${channelId}/messages/${messageId}`,
    };
}
/**
 * @param {Snowflake} channelId The ID of the channel.
 * @param {Snowflake} messageId The ID of the message.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export function channelsIdMessagesIdReactions(channelId, messageId) {
    return {
        bucket: `/channels/${channelId}/messages/{}/reactions`,
        path: `/channels/${channelId}/messages/${messageId}/reactions`,
    };
}
/**
 * @param {Snowflake} channelId The ID of the channel.
 * @param {Snowflake} messageId The ID of the message.
 * @param {string} reactionData
 * @returns {RouteInfo}
 * @export
 * @function
 */
export function channelsIdMessagesIdReactionsTarget(channelId, messageId, reactionData) {
    return {
        bucket: `/channels/${channelId}/messages/{}/reactions/{}`,
        path: `/channels/${channelId}/messages/${messageId}/reactions/${reactionData}`,
    };
}
/**
 * @param {Snowflake} channelId The ID of the channel.
 * @param {Snowflake} messageId The ID of the message.
 * @param {string} reactionData
 * @param {Snowflake | string} userId
 * @returns {RouteInfo}
 * @export
 * @function
 */
export function channelsIdMessagesIdReactionsTargetUserId(channelId, messageId, reactionData, userId) {
    return {
        bucket: `/channels/${channelId}/messages/{}/reactions/{}/{}`,
        path: `/channels/${channelId}/messages/${messageId}/reactions/${reactionData}/${userId}`,
    };
}
/**
 * @param {Snowflake} channelId The ID of the channel.
 * @param {Snowflake} targetId The ID of the target.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export function channelsIdPermissionsTargetId(channelId, targetId) {
    return {
        bucket: `/channels/${channelId}/permissions/{}`,
        path: `/channels/${channelId}/permissions/${targetId}`,
    };
}
/**
 * @param {Snowflake} channelId The ID of the channel.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export function channelsIdPins(channelId) {
    return single(`/channels/${channelId}/pins`);
}
/**
 * @param {Snowflake} channelId The ID of the channel.
 * @param {Snowflake} messageId The ID of the message.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export function channelsIdPinsMessageId(channelId, messageId) {
    return {
        bucket: `/channels/${channelId}/pins/{}`,
        path: `/channels/${channelId}/pins/${messageId}`,
    };
}
/**
 * @param {Snowflake} channelId The ID of the channel.
 * @param {Snowflake} userId The ID of the user.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export function channelsIdRecipientsId(groupId, userId) {
    return {
        bucket: `/channels/${groupId}/recipients/{}`,
        path: `/channels/${groupId}/recipients/${userId}`,
    };
}
/**
 * @param {Snowflake} channelId The ID of the channel.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export function channelsIdTyping(channelId) {
    return single(`/channels/${channelId}/typing`);
}
/**
 * @param {Snowflake} channelId The ID of the channel.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export function channelsIdWebhooks(channelId) {
    return single(`/channels/${channelId}/webhooks`);
}
/**
 * @returns {RouteInfo}
 * @export
 * @function
 */
export function gateway() {
    return single("/gateway");
}
/**
 * @returns {RouteInfo}
 * @export
 * @function
 */
export function gatewayBot() {
    return single("/gateway/bot");
}
/**
 * @returns {RouteInfo}
 * @export
 * @function
 */
export function guilds() {
    return {
        bucket: "/guilds",
        path: "/guilds",
    };
}
/**
 * @returns {RouteInfo}
 * @export
 * @function
 */
export function guildsId(guildId) {
    return single(`/guilds/${guildId}`);
}
/**
 * @param {Snowflake} guildId The ID of the guild.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export function guildsIdAuditLogs(guildId) {
    return single(`/guilds/${guildId}/audit-logs`);
}
/**
 * @param {Snowflake} guildId The ID of the guild.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export function guildsIdBans(guildId) {
    return single(`/guilds/${guildId}/bans`);
}
/**
 * @param {Snowflake} guildId The ID of the guild.
 * @param {Snowflake} userId The ID of the user.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export function guildsIdBansUserId(guildId, userId) {
    return {
        bucket: `/guilds/${guildId}/bans/{}`,
        path: `/guilds/${guildId}/bans/${userId}`,
    };
}
/**
 * @param {Snowflake} guildId The ID of the guild.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export function guildsIdChannels(guildId) {
    return single(`/guilds/${guildId}/channels`);
}
/**
 * @param {Snowflake} guildId The ID of the guild.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export function guildsIdEmbed(guildId) {
    return single(`/guilds/${guildId}/embed`);
}
/**
 * @param {Snowflake} guildId The ID of the guild.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export function guildsIdEmojis(guildId) {
    return single(`/guilds/${guildId}/emojis`);
}
/**
 * @param {Snowflake} guildId The ID of the guild.
 * @param {Snowflake} emojiId The ID of the emoji.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export function guildsIdEmojisId(guildId, emojiId) {
    return {
        bucket: `/guilds/${guildId}/emojis/{}`,
        path: `/guilds/${guildId}/emojis/${emojiId}`,
    };
}
/**
 * @param {Snowflake} guildId The ID of the guild.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export function guildsIdIntegrations(guildId) {
    return single(`/guilds/${guildId}/integrations`);
}
/**
 * @param {Snowflake} guildId The ID of the guild.
 * @param {Snowflake} integrationId The ID of the integration.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export function guildsIdIntegrationsId(guildId, integrationId) {
    return {
        bucket: `/guilds/${guildId}/integrations/{}`,
        path: `/guilds/${guildId}/integrations/${integrationId}`,
    };
}
/**
 * @param {Snowflake} guildId The ID of the guild.
 * @param {Snowflake} integrationId The ID of the integration.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export function guildsIdIntegrationsIdSync(guildId, integrationId) {
    return {
        bucket: `/guilds/${guildId}/integrations/{}/sync`,
        path: `/guilds/${guildId}/integrations/${integrationId}/sync`,
    };
}
/**
 * @param {Snowflake} guildId The ID of the guild.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export function guildsIdInvites(guildId) {
    return single(`/guilds/${guildId}/invites`);
}
/**
 * @param {Snowflake} guildId The ID of the guild.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export function guildsIdMembers(guildId) {
    return single(`/guilds/${guildId}/members`);
}
/**
 * @param {Snowflake} guildId The ID of the guild.
 * @param {string} targetId The ID of the target.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export function guildsIdMembersTargetIdNick(guildId, targetId) {
    return {
        bucket: `/guilds/${guildId}/members/{}/nick`,
        path: `/guilds/${guildId}/members/${targetId}/nick`,
    };
}
/**
 * @param {Snowflake} guildId The ID of the guild.
 * @param {Snowflake} userId The ID of the user.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export function guildsIdMembersUserId(guildId, userId) {
    return {
        bucket: `/guilds/${guildId}/members/{}`,
        path: `/guilds/${guildId}/members/${userId}`,
    };
}
/**
 * @param {Snowflake} guildId The ID of the guild.
 * @param {Snowflake} userId The ID of the user.
 * @param {Snowflake} roleId The ID of the role.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export function guildsIdMembersUserIdRolesId(guildId, userId, roleId) {
    return {
        bucket: `/guilds/${guildId}/members/{}/roles/{}`,
        path: `/guilds/${guildId}/members/${userId}/roles/${roleId}`,
    };
}
/**
 * @param {Snowflake} guildId The ID of the guild.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export function guildsIdPrune(guildId) {
    return single(`/guilds/${guildId}/prune`);
}
/**
 * @param {Snowflake} guildId The ID of the guild.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export function guildsIdRegions(guildId) {
    return single(`/guilds/${guildId}/regions`);
}
/**
 * @param {Snowflake} guildId The ID of the guild.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export function guildsIdRoles(guildId) {
    return single(`/guilds/${guildId}/roles`);
}
/**
 * @param {Snowflake} guildId The ID of the guild.
 * @param {Snowflake} roleId The ID of the role.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export function guildsIdRolesId(guildId, roleId) {
    return {
        bucket: `/guilds/${guildId}/roles/{}`,
        path: `/guilds/${guildId}/roles/${roleId}`,
    };
}
/**
 * @param {Snowflake} guildId The ID of the guild.
 * @param {Snowflake} userId The ID of the user.
 * @param {Snowflake} roleId The ID of the role.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export function guildsIdUsersIdRolesId(guildId, userId, roleId) {
    return {
        bucket: `/guilds/${guildId}/members/{}/roles/{}`,
        path: `/guilds/${guildId}/members/${userId}/roles/${roleId}`,
    };
}
/**
 * @param {Snowflake} guildId The ID of the guild.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export function guildsIdVanityUrl(guildId) {
    return single(`/guilds/${guildId}/vanity-url`);
}
/**
 * @param {Snowflake} guildId The ID of the guild.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export function guildsIdWebhooks(guildId) {
    return single(`/guilds/${guildId}/webhooks`);
}
/**
 * @param {string} code The invite code.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export function invitesCode(code) {
    return single(`/invites/${code}`);
}
/**
 * @param {Snowflake | string} targetId The ID of the target.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export function oauth2ApplicationsTargetId(targetId) {
    return {
        bucket: "/oauth2/applications/{}",
        path: `/oauth2/applications/${targetId}`,
    };
}
/**
 * @param {Snowflake | string} userId The ID of the user.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export function usersId(userId) {
    return single(`/users/${userId}`);
}
/**
 * @param {Snowflake | string} userId The ID of the user.
 * @returns {RouteInfo}
 * @export
 * @function
 */
// Accepts a string for the special case of '@me'.
export function usersIdChannels(userId) {
    return single(`/users/${userId}/channels`);
}
/**
 * @param {Snowflake | string} userId The ID of the user.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export function usersIdGuilds(userId) {
    return single(`/users/${userId}/guilds`);
}
/**
 * @param {Snowflake | string} userId The ID of the user.
 * @param {Snowflake} guildId The ID of the guild.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export function usersIdGuildsId(userId, guildId) {
    return {
        bucket: `/users/${userId}/guilds/{}`,
        path: `/users/${userId}/guilds/${guildId}`,
    };
}
/**
 * @returns {RouteInfo}
 * @export
 * @function
 */
export function voiceRegions() {
    return single(`/voice/regions`);
}
/**
 * @param {Snowflake} userId The ID of the webhook.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export function webhooksId(webhookId) {
    return single(`/webhooks/${webhookId}`);
}
/**
 * @param {Snowflake} userId The ID of the webhook.
 * @param {string} token The webhook's token.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export function webhooksIdToken(webhookId, token) {
    return {
        bucket: `/webhooks/${webhookId}/{}`,
        path: `/webhooks/${webhookId}/${token}`,
    };
}
//# sourceMappingURL=Routes.js.map