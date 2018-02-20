import Snowflake from "../Abstracts/Snowflake";

export function channelsId(channelId: Snowflake): string {
    return `/channels/${channelId}`;
}
