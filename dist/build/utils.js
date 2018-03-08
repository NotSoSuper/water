"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const channel_1 = require("discord-models/channel");
/**
 * Parses a reaction into data that can be passed as a URL query parameter.
 *
 * @param {Reaction} reactionType The reaction to parse for use in URLs.
 * @returns {string} The parsed URI encoded reaction data.
 * @export
 * @function
 */
function parseReaction(reaction) {
    let data;
    if (reaction.type === channel_1.ReactionType.Custom) {
        reaction = reaction;
        data = `${reaction.id}:${reaction.name}`;
    }
    else {
        reaction = reaction;
        data = `${reaction.value}`;
    }
    return encodeURIComponent(data);
}
exports.parseReaction = parseReaction;
//# sourceMappingURL=utils.js.map