import Water from "../";
/**
 * @class
 * @default
 * @export
 * @name BaseResource
 */
export default class BaseResource {
    protected client: Water;
    /**
     * @param client
     * @constructor
     * @method
     * @public
     */
    constructor(client: Water);
}
