import MessageableChannel from "../Abstracts/Channel/MessageableChannel";
import Channel from "../Abstracts/Channel/Channel";

export default interface GuildChannel extends Channel, MessageableChannel {
}