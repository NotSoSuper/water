import Water from "../";

/**
 * @class
 * @default
 * @export
 * @name BaseResource
 * @public
 */
export default class BaseResource {
    /**
     * @param client
     * @constructor
     * @method
     * @public
     */
    public constructor(protected client: Water) {
    }
}
