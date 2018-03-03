import { Channel as ChannelModel } from "discord-models/channel";
import Water from "..";
import BaseResource from "../Abstracts/BaseResource";
/**
 * @class
 * @default
 * @export
 * @extends {BaseResource}
 * @name Channel
 */
export default class Channel extends BaseResource {
    /**
     *
     * @param {Water} client
     * @param {ChannelModel} data
     * @constructor
     * @method
     * @public
     */
    constructor(client: Water, _data: ChannelModel);
}
