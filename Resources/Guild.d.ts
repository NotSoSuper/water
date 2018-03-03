import { Guild as GuildModel } from "discord-models/guild";
import Water from "..";
import BaseResource from "../Abstracts/BaseResource";
/**
 * @class
 * @default
 * @export
 * @extends {BaseResource}
 * @name Guild
 */
export default class Guild extends BaseResource {
    /**
     * @param {Water} client
     * @param {GuildModel} data
     * @constructor
     * @method
     * @public
     */
    constructor(client: Water, _data: GuildModel);
}
