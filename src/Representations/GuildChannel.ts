import Channel from "../Abstracts/Channel/Channel";
import MessageableChannel from "../Abstracts/Channel/MessageableChannel";

export default interface GuildChannel extends Channel, MessageableChannel {
}
