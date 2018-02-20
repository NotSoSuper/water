import { ChannelType } from "./ChannelType";
import Snowflake from "../Snowflake";

export default interface Channel {
    id: Snowflake;
    type: ChannelType;
}