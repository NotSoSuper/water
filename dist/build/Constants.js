/**
 * The supported REST API version.
 *
 * @constant
 * @export
 * @type {number}
 */
export const API_VERSION = 7;
/**
 * The base path of the API. Uses the version set to `API_VERSION`.
 *
 * @constant
 * @export
 * @type {string}
 */
export const API_BASE_PATH = `/v${API_VERSION}`;
/**
 * The host of the API.
 *
 * @constant
 * @export
 * @type {string}
 */
export const API_HOST = "discordapp.com";
/**
 * The protocol of the API.
 *
 * @constant
 * @export
 * @type {string}
 */
export const API_PROTOCOL = "https";
/**
 * The base URI of the API.
 *
 * @constant
 * @export
 * @type {string}
 */
export const API_BASE = `https://${API_HOST}/api${API_BASE_PATH}`;
/**
 * The host of the CDN.
 *
 * @constant
 * @export
 * @type {string}
 */
export const CDN_HOST = "cdn.discordapp.com";
/**
 * The base URI of the CDN.
 *
 * @constant
 * @export
 * @type {string}
 */
export const CDN_BASE = `https://${CDN_HOST}`;
//# sourceMappingURL=Constants.js.map