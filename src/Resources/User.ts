import { User as UserModel } from "discord-models/user";
import Water from "../";
import BaseResource from "../Abstracts/BaseResource";

/**
 * @class
 * @default
 * @export
 * @extends {BaseResource}
 * @name User
 * @public
 */
export default class User extends BaseResource {
    /**
     * @param {Water} water
     * @param {UserModel} data
     * @constructor
     * @method
     * @public
     */
    public constructor(water: Water, data: UserModel) {
        super(water);
    }
}
