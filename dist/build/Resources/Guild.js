"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseResource_1 = require("../Abstracts/BaseResource");
/**
 * @class
 * @default
 * @export
 * @extends {BaseResource}
 * @name Guild
 */
class Guild extends BaseResource_1.default {
    /**
     * @param {Water} client
     * @param {GuildModel} data
     * @constructor
     * @method
     * @public
     */
    // tslint:disable-next-line:variable-name
    constructor(client, _data) {
        super(client);
    }
}
exports.default = Guild;
//# sourceMappingURL=Guild.js.map