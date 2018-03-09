"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The supported REST API version.
 *
 * @constant
 * @export
 * @type {number}
 */
exports.API_VERSION = 7;
/**
 * The base path of the API. Uses the version set to `API_VERSION`.
 *
 * @constant
 * @export
 * @type {string}
 */
exports.API_BASE_PATH = `/v${exports.API_VERSION}`;
/**
 * The host of the API.
 *
 * @constant
 * @export
 * @type {string}
 */
exports.API_HOST = "discordapp.com";
/**
 * The protocol of the API.
 *
 * @constant
 * @export
 * @type {string}
 */
exports.API_PROTOCOL = "https:";
/**
 * The base URI of the API.
 *
 * @constant
 * @export
 * @type {string}
 */
exports.API_BASE = `https://${exports.API_HOST}/api${exports.API_BASE_PATH}`;
/**
 * The host of the CDN.
 *
 * @constant
 * @export
 * @type {string}
 */
exports.CDN_HOST = "cdn.discordapp.com";
/**
 * The base URI of the CDN.
 *
 * @constant
 * @export
 * @type {string}
 */
exports.CDN_BASE = `https://${exports.CDN_HOST}`;
//# sourceMappingURL=Constants.js.map