import Channel from "../Abstracts/Channel/Channel";
import User from "./User";
import MessageableChannel from "../Abstracts/Channel/MessageableChannel";

export default interface DMChannel extends Channel, MessageableChannel {
    recipient: User;
}