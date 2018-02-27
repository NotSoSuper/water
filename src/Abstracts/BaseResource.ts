import Water from "../";

/**
 * @class
 * @default
 * @export
 * @name BaseResource
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
