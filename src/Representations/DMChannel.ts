import Channel from "../Abstracts/Channel/Channel";
import MessageableChannel from "../Abstracts/Channel/MessageableChannel";
import User from "./User";

export default interface DMChannel extends Channel, MessageableChannel {
    recipient: User;
}
