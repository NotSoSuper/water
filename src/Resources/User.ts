import { User as UserModel } from "discord-models/user";
import Water from "../";
import BaseResource from "../Abstracts/BaseResource";

/**
 * @class
 * @default
 * @export
 * @extends {BaseResource}
 * @name User
 */
export default class User extends BaseResource {
    /**
     * @param {Water} water
     * @param {UserModel} data
     * @constructor
     * @method
     * @public
     */
    // tslint:disable-next-line:variable-name
    public constructor(water: Water, _data: UserModel) {
        super(water);
    }
}
