import { Reaction } from "discord-models/channel";
/**
 * Parses a reaction into data that can be passed as a URL query parameter.
 *
 * @param {Reaction} reactionType The reaction to parse for use in URLs.
 * @returns {string} The parsed URI encoded reaction data.
 * @export
 * @function
 */
export declare function parseReaction(reaction: Reaction): string;
