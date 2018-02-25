import Snowflake from "../Snowflake";
import { ChannelType } from "./ChannelType";

export default interface Channel {
    id: Snowflake;
    type: ChannelType;
}
