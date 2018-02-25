import { Guild as GuildModel } from "discord-models/build/guild";
import Water from "..";
import BaseResource from "../Abstracts/BaseResource";

/**
 * @class
 * @default
 * @export
 * @extends {BaseResource}
 * @name Guild
 * @public
 */
export default class Guild extends BaseResource {
    /**
     * @param {Water} client
     * @param {GuildModel} data
     * @constructor
     * @method
     * @public
     */
    public constructor(client: Water, data: GuildModel) {
        super(client);
    }
}
