import { Guild as GuildModel } from "discord-models/guild";
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
    // tslint:disable-next-line:variable-name
    public constructor(client: Water, _data: GuildModel) {
        super(client);
    }
}
