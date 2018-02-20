import Snowflake from "../Abstracts/Snowflake";

export function channel(channelId: Snowflake): string {
    return `/channels/${channelId}`;
}
