import { Collection } from "branches";
import GuildRepresentation from "./Guild";
import Message from "./Message";

export default interface ChannelRepresentation {
    id: string;
    mention: string;
    type: number;
    createdAt: number;
    guild: GuildRepresentation;
    messages: Collection<Message>;
}