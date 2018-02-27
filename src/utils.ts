import { CustomReaction, Reaction, ReactionType, UnicodeReaction } from "discord-models/channel";

/**
 * Parses a reaction into data that can be passed as a URL query parameter.
 *
 * @param {Reaction} reactionType The reaction to parse for use in URLs.
 * @returns {string} The parsed URI encoded reaction data.
 * @export
 * @function
 */
export function parseReaction(reaction: Reaction): string {
    let data;

    if (reaction.type === ReactionType.Custom) {
        reaction = reaction as CustomReaction;

        data = `${reaction.id}:${reaction.name}`;
    } else {
        reaction = reaction as UnicodeReaction;

        data = `${reaction.value}`;
    }

    return encodeURIComponent(data);
}
