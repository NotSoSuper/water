import { Channel as ChannelModel } from "discord-models/build/channel";
import Water from "..";
import BaseResource from "../Abstracts/BaseResource";

/**
 * @class
 * @default
 * @export
 * @extends {BaseResource}
 * @name Channel
 * @public
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
    public constructor(client: Water, data: ChannelModel) {
        super(client);
    }
}
