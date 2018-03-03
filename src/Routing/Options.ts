import { Snowflake } from "discord-models";
import * as Channel from "discord-models/channel";
import * as Guild from "discord-models/guild";

/**
 * @export
 * @interface
 * @name ChannelOptions
 */
export interface ChannelOptions {
    bitrate: number;
    name: string;
    nsfw: boolean;
    parent_id: Snowflake;
    permission_overwrites: Channel.PermissionOverwrite[];
    type: Channel.ChannelType;
    user_limit: number;
}

/**
 * @export
 * @interface
 * @name EmojiOptions
 */
export interface EmojiOptions {
    name: string;
    image: string;
    roles?: Snowflake[];
}

/**
 * @export
 * @interface
 * @name GuildEmbedOptions
 */
export interface GuildEmbedOptions {
    channel_id?: Snowflake;
    enabled?: boolean;
}

/**
 * @export
 * @interface
 * @name GuildIntegrationOptions
 */
export interface GuildIntegrationOptions {
    id: Snowflake;
    type: string;
}

/**
 * @export
 * @interface
 * @name GuildOptions
 */
export interface GuildOptions {
    channel?: ChannelOptions[];
    default_message_notifications?: Guild.DefaultMessageNotificationLevel;
    explicit_content_filter?: Guild.ExplicitContentFilterLevel;
    icon?: string;
    name: string;
    region?: string;
    roles?: Guild.Role[];
    verification_level?: Guild.VerificationLevel;
}

/**
 * @export
 * @interface
 * @name InviteOptions
 */
export interface InviteOptions {
    max_age?: number;
    max_uses?: number;
    temporary?: boolean;
    unique?: boolean;
}

/**
 * @export
 * @interface
 * @name MemberOptions
 */
export interface MemberOptions {
    channel_id?: Snowflake;
    deaf?: boolean;
    mute?: boolean;
    nick?: string;
    roles?: Snowflake[];
}

/**
 * @export
 * @interface
 * @name MessageCreateOptions
 */
export interface MessageCreateOptions {
    content?: string;
    embed?: Channel.Embed;
    file?: Buffer;
    nonce?: Snowflake;
    tts?: boolean;
}

/**
 * @export
 * @interface
 * @name MessageRetrievalOptions
 */
export interface MessageRetrievalOptions {
    after?: Snowflake;
    around?: Snowflake;
    before?: Snowflake;
    limit?: number;
}

/**
 * @export
 * @interface
 * @name NicknameOptions
 */
export interface NicknameOptions {
    new_nickname: string | null;
}

/**
 * @export
 * @interface
 * @name PermissionOverwriteOptions
 */
export interface PermissionOverwriteOptions {
    allow: number;
    deny: number;
    type: Channel.PermissionOverwriteType;
}

/**
 * @export
 * @interface
 * @name PrivateChannelOptions
 */
export interface PrivateChannelOptions {
    recipient_id: Snowflake;
}

/**
 * @export
 * @interface
 * @name ProfileOptions
 */
export interface ProfileOptions {
    avatar?: string | null;
    username?: string;
}

/**
 * @export
 * @interface
 * @name RoleOptions
 */
export interface RoleOptions {
    color?: number;
    hoist?: boolean;
    mentionable?: boolean;
    name?: string;
    permissions?: number;
}

/**
 * @export
 * @interface
 * @name RolePositionOptions
 */
export interface RolePositionOptions {
    id: Snowflake;
    position: number;
}

/**
 * @export
 * @interface
 * @name WebhookExecutionOptions
 */
export interface WebhookExecutionOptions {
    avatar_url?: string;
    content?: string;
    embeds?: Channel.Embed[];
    file?: Buffer;
    tts?: boolean;
    username?: string;
}

/**
 * @export
 * @interface
 * @name WebhookOptions
 */
export interface WebhookOptions {
    avatar?: string;
    name?: string;
}
