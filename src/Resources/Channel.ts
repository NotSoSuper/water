import { Channel as ChannelModel } from "discord-models/channel";
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
    // tslint:disable-next-line:variable-name
    public constructor(client: Water, _data: ChannelModel) {
        super(client);
    }
}
