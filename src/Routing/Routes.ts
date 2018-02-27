import { Snowflake } from "discord-models/discord-models";

/**
 * @param {string} res The path to use for both the `bucket` and `path` of a
 * `RouteInfo`.
 * @returns {RouteInfo} The information for a route.
 * @function
 */
function single(res: string): RouteInfo {
    return {
        bucket: res,
        path: res,
    };
}

export interface RouteInfo {
    bucket: string;
    path: string;
}

export function channelsId(channelId: Snowflake): RouteInfo {
    return single(`/channels/${channelId}`);
}

export function channelsIdInvites(channelId: Snowflake): RouteInfo {
    return single(`/channels/${channelId}/invites`);
}

export function channelsIdMessages(channelId: Snowflake): RouteInfo {
    return single(`/channels/${channelId}/messages`);
}

export function channelsIdMessagesId(channelId: Snowflake, messageId: Snowflake): RouteInfo {
    return {
        bucket: `/channels/${channelId}/messages/{}`,
        path: `/channels/${channelId}/messages/${messageId}`,
    };
}

export function channelsIdMessagesIdReactions(
    channelId: Snowflake,
    messageId: Snowflake,
): RouteInfo {
    return {
        bucket: `/channels/${channelId}/messages/{}/reactions`,
        path: `/channels/${channelId}/messages/${messageId}/reactions`,
    };
}

export function channelsIdMessagesIdReactionsTarget(
    channelId: Snowflake,
    messageId: Snowflake,
    reactionData: string,
): RouteInfo {
    return {
        bucket: `/channels/${channelId}/messages/{}/reactions/{}`,
        path: `/channels/${channelId}/messages/${messageId}/reactions/${reactionData}`,
    };
}

export function channelsIdMessagesIdReactionsTargetUserId(
    channelId: Snowflake,
    messageId: Snowflake,
    reactionData: string,
    userId: Snowflake | string,
): RouteInfo {
    return {
        bucket: `/channels/${channelId}/messages/{}/reactions/{}/{}`,
        path: `/channels/${channelId}/messages/${messageId}/reactions/${reactionData}/${userId}`,
    };
}

export function channelsIdPermissionsTargetId(
    channelId: Snowflake,
    targetId: Snowflake,
): RouteInfo {
    return {
        bucket: `/channels/${channelId}/permissions/{}`,
        path: `/channels/${channelId}/permissions/${targetId}`,
    };
}

export function channelsIdPins(channelId: Snowflake): RouteInfo {
    return single(`/channels/${channelId}/pins`);
}

export function channelsIdPinsMessageId(channelId: Snowflake, messageId: Snowflake): RouteInfo {
    return {
        bucket: `/channels/${channelId}/pins/{}`,
        path: `/channels/${channelId}/pins/${messageId}`,
    };
}

export function channelsIdRecipientsId(groupId: Snowflake, userId: Snowflake): RouteInfo {
    return {
        bucket: `/channels/${groupId}/recipients/{}`,
        path: `/channels/${groupId}/recipients/${userId}`,
    };
}

export function channelsIdTyping(channelId: Snowflake): RouteInfo {
    return single(`/channels/${channelId}/typing`);
}

export function channelsIdWebhooks(channelId: Snowflake): RouteInfo {
    return single(`/channels/${channelId}/webhooks`);
}

export function gateway(): RouteInfo {
    return single("/gateway");
}

export function gatewayBot(): RouteInfo {
    return single("/gateway/bot");
}

export function guilds(): RouteInfo {
    return {
        bucket: "/guilds",
        path: "/guilds",
    };
}

export function guildsId(guildId: Snowflake): RouteInfo {
    return single(`/guilds/${guildId}`);
}

export function guildsIdAuditLogs(guildId: Snowflake): RouteInfo {
    return single(`/guilds/${guildId}/audit-logs`);
}

export function guildsIdBans(guildId: Snowflake): RouteInfo {
    return single(`/guilds/${guildId}/bans`);
}

export function guildsIdBansUserId(guildId: Snowflake, userId: Snowflake): RouteInfo {
    return {
        bucket: `/guilds/${guildId}/bans/{}`,
        path: `/guilds/${guildId}/bans/${userId}`,
    };
}

export function guildsIdChannels(guildId: Snowflake): RouteInfo {
    return single(`/guilds/${guildId}/channels`);
}

export function guildsIdEmbed(guildId: Snowflake): RouteInfo {
    return single(`/guilds/${guildId}/embed`);
}

export function guildsIdEmojis(guildId: Snowflake): RouteInfo {
    return single(`/guilds/${guildId}/emojis`);
}

export function guildsIdEmojisId(guildId: Snowflake, emojiId: Snowflake): RouteInfo {
    return {
        bucket: `/guilds/${guildId}/emojis/{}`,
        path: `/guilds/${guildId}/emojis/${emojiId}`,
    };
}

export function guildsIdIntegrations(guildId: Snowflake): RouteInfo {
    return single(`/guilds/${guildId}/integrations`);
}

export function guildsIdIntegrationsId(
    guildId: Snowflake,
    integrationId: Snowflake,
): RouteInfo {
    return {
        bucket: `/guilds/${guildId}/integrations/{}`,
        path: `/guilds/${guildId}/integrations/${integrationId}`,
    };
}

export function guildsIdIntegrationsIdSync(
    guildId: Snowflake,
    integrationId: Snowflake,
): RouteInfo {
    return {
        bucket: `/guilds/${guildId}/integrations/{}/sync`,
        path: `/guilds/${guildId}/integrations/${integrationId}/sync`,
    };
}

export function guildsIdInvites(guildId: Snowflake): RouteInfo {
    return single(`/guilds/${guildId}/invites`);
}

export function guildsIdMembers(guildId: Snowflake): RouteInfo {
    return single(`/guilds/${guildId}/members`);
}

export function guildsIdMembersTargetIdNick(guildId: Snowflake, targetId: string): RouteInfo {
    return {
        bucket: `/guilds/${guildId}/members/{}/nick`,
        path: `/guilds/${guildId}/members/${targetId}/nick`,
    };
}

export function guildsIdMembersUserId(guildId: Snowflake, userId: Snowflake): RouteInfo {
    return {
        bucket: `/guilds/${guildId}/members/{}`,
        path: `/guilds/${guildId}/members/${userId}`,
    };
}

export function guildsIdMembersUserIdRolesId(
    guildId: Snowflake,
    userId: Snowflake,
    roleId: Snowflake,
): RouteInfo {
    return {
        bucket: `/guilds/${guildId}/members/{}/roles/{}`,
        path: `/guilds/${guildId}/members/${userId}/roles/${roleId}`,
    };
}

export function guildsIdPrune(guildId: Snowflake): RouteInfo {
    return single(`/guilds/${guildId}/prune`);
}

export function guildsIdRegions(guildId: Snowflake): RouteInfo {
    return single(`/guilds/${guildId}/regions`);
}

export function guildsIdRoles(guildId: Snowflake): RouteInfo {
    return single(`/guilds/${guildId}/roles`);
}

export function guildsIdRolesId(guildId: Snowflake, roleId: Snowflake): RouteInfo {
    return {
        bucket: `/guilds/${guildId}/roles/{}`,
        path: `/guilds/${guildId}/roles/${roleId}`,
    };
}

export function guildsIdUsersIdRolesId(guildId: Snowflake, userId: Snowflake, roleId: Snowflake): RouteInfo {
    return {
        bucket: `/guilds/${guildId}/members/{}/roles/{}`,
        path: `/guilds/${guildId}/members/${userId}/roles/${roleId}`,
    };
}

export function guildsIdVanityUrl(guildId: Snowflake): RouteInfo {
    return single(`/guilds/${guildId}/vanity-url`);
}

export function guildsIdWebhooks(guildId: Snowflake): RouteInfo {
    return single(`/guilds/${guildId}/webhooks`);
}

export function invitesCode(code: string): RouteInfo {
    return single(`/invites/${code}`);
}

export function oauth2ApplicationsTargetId(targetId: Snowflake | string): RouteInfo {
    return {
        bucket: "/oauth2/applications/{}",
        path: `/oauth2/applications/${targetId}`,
    };
}

export function usersId(userId: Snowflake | string): RouteInfo {
    return single(`/users/${userId}`);
}

// Accepts a string for the special case of '@me'.
export function usersIdChannels(userId: Snowflake | string): RouteInfo {
    return single(`/users/${userId}/channels`);
}

export function usersIdGuilds(userId: Snowflake | string): RouteInfo {
    return single(`/users/${userId}/guilds`);
}

export function usersIdGuildsId(
    userId: Snowflake | string,
    guildId: Snowflake,
): RouteInfo {
    return {
        bucket: `/users/${userId}/guilds/{}`,
        path: `/users/${userId}/guilds/${guildId}`,
    };
}

export function voiceRegions(): RouteInfo {
    return single(`/voice/regions`);
}

export function webhooksId(webhookId: Snowflake): RouteInfo {
    return single(`/webhooks/${webhookId}`);
}

export function webhooksIdToken(webhookId: Snowflake, token: string): RouteInfo {
    return {
        bucket: `/webhooks/${webhookId}/{}`,
        path: `/webhooks/${webhookId}/${token}`,
    };
}
