"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseResource_1 = require("../Abstracts/BaseResource");
/**
 * @class
 * @default
 * @export
 * @extends {BaseResource}
 * @name Channel
 */
class Channel extends BaseResource_1.default {
    /**
     *
     * @param {Water} client
     * @param {ChannelModel} data
     * @constructor
     * @method
     * @public
     */
    // tslint:disable-next-line:variable-name
    constructor(client, _data) {
        super(client);
    }
}
exports.default = Channel;
//# sourceMappingURL=Channel.js.map