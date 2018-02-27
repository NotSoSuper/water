import { CustomReaction, Reaction, ReactionType, UnicodeReaction } from "discord-models/channel";

export function parseReactionType(reactionType: Reaction): string {
    if (reactionType.type === ReactionType.Custom) {
        reactionType = reactionType as CustomReaction;

        return `${reactionType.id}:${reactionType.name}`;
    } else {
        reactionType = reactionType as UnicodeReaction;

        return `${reactionType.value}`;
    }
}
