import { Snowflake } from "discord-models";
/**
 * Information about a route, including the ratelimit bucket to use and the URL
 * path to use for the request.
 *
 * @export
 * @interface
 * @name RouteInfo
 */
export interface RouteInfo {
    bucket: string;
    path: string;
}
/**
 * @param {Snowflake} channelId The ID of the channel.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export declare function channelsId(channelId: Snowflake): RouteInfo;
/**
 * @param {Snowflake} channelId The ID of the channel.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export declare function channelsIdInvites(channelId: Snowflake): RouteInfo;
/**
 * @param {Snowflake} channelId The ID of the channel.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export declare function channelsIdMessages(channelId: Snowflake): RouteInfo;
/**
 * @param {Snowflake} channelId The ID of the channel.
 * @param {Snowflake} messageId The ID of the message.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export declare function channelsIdMessagesId(channelId: Snowflake, messageId: Snowflake): RouteInfo;
/**
 * @param {Snowflake} channelId The ID of the channel.
 * @param {Snowflake} messageId The ID of the message.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export declare function channelsIdMessagesIdReactions(channelId: Snowflake, messageId: Snowflake): RouteInfo;
/**
 * @param {Snowflake} channelId The ID of the channel.
 * @param {Snowflake} messageId The ID of the message.
 * @param {string} reactionData
 * @returns {RouteInfo}
 * @export
 * @function
 */
export declare function channelsIdMessagesIdReactionsTarget(channelId: Snowflake, messageId: Snowflake, reactionData: string): RouteInfo;
/**
 * @param {Snowflake} channelId The ID of the channel.
 * @param {Snowflake} messageId The ID of the message.
 * @param {string} reactionData
 * @param {Snowflake | string} userId
 * @returns {RouteInfo}
 * @export
 * @function
 */
export declare function channelsIdMessagesIdReactionsTargetUserId(channelId: Snowflake, messageId: Snowflake, reactionData: string, userId: Snowflake | string): RouteInfo;
/**
 * @param {Snowflake} channelId The ID of the channel.
 * @param {Snowflake} targetId The ID of the target.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export declare function channelsIdPermissionsTargetId(channelId: Snowflake, targetId: Snowflake): RouteInfo;
/**
 * @param {Snowflake} channelId The ID of the channel.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export declare function channelsIdPins(channelId: Snowflake): RouteInfo;
/**
 * @param {Snowflake} channelId The ID of the channel.
 * @param {Snowflake} messageId The ID of the message.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export declare function channelsIdPinsMessageId(channelId: Snowflake, messageId: Snowflake): RouteInfo;
/**
 * @param {Snowflake} channelId The ID of the channel.
 * @param {Snowflake} userId The ID of the user.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export declare function channelsIdRecipientsId(groupId: Snowflake, userId: Snowflake): RouteInfo;
/**
 * @param {Snowflake} channelId The ID of the channel.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export declare function channelsIdTyping(channelId: Snowflake): RouteInfo;
/**
 * @param {Snowflake} channelId The ID of the channel.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export declare function channelsIdWebhooks(channelId: Snowflake): RouteInfo;
/**
 * @returns {RouteInfo}
 * @export
 * @function
 */
export declare function gateway(): RouteInfo;
/**
 * @returns {RouteInfo}
 * @export
 * @function
 */
export declare function gatewayBot(): RouteInfo;
/**
 * @returns {RouteInfo}
 * @export
 * @function
 */
export declare function guilds(): RouteInfo;
/**
 * @returns {RouteInfo}
 * @export
 * @function
 */
export declare function guildsId(guildId: Snowflake): RouteInfo;
/**
 * @param {Snowflake} guildId The ID of the guild.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export declare function guildsIdAuditLogs(guildId: Snowflake): RouteInfo;
/**
 * @param {Snowflake} guildId The ID of the guild.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export declare function guildsIdBans(guildId: Snowflake): RouteInfo;
/**
 * @param {Snowflake} guildId The ID of the guild.
 * @param {Snowflake} userId The ID of the user.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export declare function guildsIdBansUserId(guildId: Snowflake, userId: Snowflake): RouteInfo;
/**
 * @param {Snowflake} guildId The ID of the guild.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export declare function guildsIdChannels(guildId: Snowflake): RouteInfo;
/**
 * @param {Snowflake} guildId The ID of the guild.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export declare function guildsIdEmbed(guildId: Snowflake): RouteInfo;
/**
 * @param {Snowflake} guildId The ID of the guild.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export declare function guildsIdEmojis(guildId: Snowflake): RouteInfo;
/**
 * @param {Snowflake} guildId The ID of the guild.
 * @param {Snowflake} emojiId The ID of the emoji.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export declare function guildsIdEmojisId(guildId: Snowflake, emojiId: Snowflake): RouteInfo;
/**
 * @param {Snowflake} guildId The ID of the guild.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export declare function guildsIdIntegrations(guildId: Snowflake): RouteInfo;
/**
 * @param {Snowflake} guildId The ID of the guild.
 * @param {Snowflake} integrationId The ID of the integration.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export declare function guildsIdIntegrationsId(guildId: Snowflake, integrationId: Snowflake): RouteInfo;
/**
 * @param {Snowflake} guildId The ID of the guild.
 * @param {Snowflake} integrationId The ID of the integration.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export declare function guildsIdIntegrationsIdSync(guildId: Snowflake, integrationId: Snowflake): RouteInfo;
/**
 * @param {Snowflake} guildId The ID of the guild.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export declare function guildsIdInvites(guildId: Snowflake): RouteInfo;
/**
 * @param {Snowflake} guildId The ID of the guild.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export declare function guildsIdMembers(guildId: Snowflake): RouteInfo;
/**
 * @param {Snowflake} guildId The ID of the guild.
 * @param {string} targetId The ID of the target.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export declare function guildsIdMembersTargetIdNick(guildId: Snowflake, targetId: string): RouteInfo;
/**
 * @param {Snowflake} guildId The ID of the guild.
 * @param {Snowflake} userId The ID of the user.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export declare function guildsIdMembersUserId(guildId: Snowflake, userId: Snowflake): RouteInfo;
/**
 * @param {Snowflake} guildId The ID of the guild.
 * @param {Snowflake} userId The ID of the user.
 * @param {Snowflake} roleId The ID of the role.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export declare function guildsIdMembersUserIdRolesId(guildId: Snowflake, userId: Snowflake, roleId: Snowflake): RouteInfo;
/**
 * @param {Snowflake} guildId The ID of the guild.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export declare function guildsIdPrune(guildId: Snowflake): RouteInfo;
/**
 * @param {Snowflake} guildId The ID of the guild.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export declare function guildsIdRegions(guildId: Snowflake): RouteInfo;
/**
 * @param {Snowflake} guildId The ID of the guild.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export declare function guildsIdRoles(guildId: Snowflake): RouteInfo;
/**
 * @param {Snowflake} guildId The ID of the guild.
 * @param {Snowflake} roleId The ID of the role.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export declare function guildsIdRolesId(guildId: Snowflake, roleId: Snowflake): RouteInfo;
/**
 * @param {Snowflake} guildId The ID of the guild.
 * @param {Snowflake} userId The ID of the user.
 * @param {Snowflake} roleId The ID of the role.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export declare function guildsIdUsersIdRolesId(guildId: Snowflake, userId: Snowflake, roleId: Snowflake): RouteInfo;
/**
 * @param {Snowflake} guildId The ID of the guild.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export declare function guildsIdVanityUrl(guildId: Snowflake): RouteInfo;
/**
 * @param {Snowflake} guildId The ID of the guild.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export declare function guildsIdWebhooks(guildId: Snowflake): RouteInfo;
/**
 * @param {string} code The invite code.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export declare function invitesCode(code: string): RouteInfo;
/**
 * @param {Snowflake | string} targetId The ID of the target.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export declare function oauth2ApplicationsTargetId(targetId: Snowflake | string): RouteInfo;
/**
 * @param {Snowflake | string} userId The ID of the user.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export declare function usersId(userId: Snowflake | string): RouteInfo;
/**
 * @param {Snowflake | string} userId The ID of the user.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export declare function usersIdChannels(userId: Snowflake | string): RouteInfo;
/**
 * @param {Snowflake | string} userId The ID of the user.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export declare function usersIdGuilds(userId: Snowflake | string): RouteInfo;
/**
 * @param {Snowflake | string} userId The ID of the user.
 * @param {Snowflake} guildId The ID of the guild.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export declare function usersIdGuildsId(userId: Snowflake | string, guildId: Snowflake): RouteInfo;
/**
 * @returns {RouteInfo}
 * @export
 * @function
 */
export declare function voiceRegions(): RouteInfo;
/**
 * @param {Snowflake} userId The ID of the webhook.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export declare function webhooksId(webhookId: Snowflake): RouteInfo;
/**
 * @param {Snowflake} userId The ID of the webhook.
 * @param {string} token The webhook's token.
 * @returns {RouteInfo}
 * @export
 * @function
 */
export declare function webhooksIdToken(webhookId: Snowflake, token: string): RouteInfo;
