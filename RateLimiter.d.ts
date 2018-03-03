/// <reference types="node" />
import { Bucket } from "branches";
import * as http from "http";
/**
 * Container for path-specific buckets and retrieving tickets from them.
 *
 * Manages ratelimits, queueing requests, and a global ratelimit lock.
 *
 * @class
 * @export
 * @name RateLimiter
 */
export default class RateLimiter {
    /**
     * Map containing the buckets, keyed by their path.
     *
     * For example, a bucket may have a path of `/channels/{}`.
     *
     * @prop
     * @public
     * @type {Map<string, Bucket>}
     */
    buckets: Map<string, Bucket>;
    /**
     * The global ratelimit lock.
     *
     * If this is set to true, then it is a unix timestamp with millisecond
     * precision. All requests must sleep until this time.
     *
     * If this is null, then the global ratelimit has not yet (knowingly) been
     * reached.
     *
     * @prop
     * @public
     * @type {number | null}
     */
    global: number | null;
    /**
     * Retrieves a bucket by identifier.
     *
     * This should be in the form of `/channels/1234567890/messages/{}`.
     *
     * Creates a new bucket if one does not exist for the identifier.
     *
     * @param bucketIdentifier The ID of the bucket.
     * @returns {Bucket} The ratelimit bucket.
     * @method
     * @public
     */
    get(bucketIdentifier: string): Bucket;
    /**
     * Processess a response, searching for ratelimit headers, a 'Retry-After'
     * header, and 'X-RateLimit-Global' header.
     *
     * If the 'X-RateLimit-Global' header is present, then the global bucket is
     * set. Otherwise, only this request is slept for the time specified in
     * `Retry-After`.
     *
     * @param bucketIdentifier The ID of the bucket.
     * @param response The Axios response from sending a request.
     * @returns Returns the number of milliseconds to wait before re-requesting.
     * This is only valid if a 429 was approached. Otherwise, returns null,
     * indicating the response is successful.
     * @method
     * @public
     */
    process(bucketIdentifier: string, response: http.ClientResponse): number | null;
    /**
     * Takes a ticket from the given bucket identifier.
     *
     * @param {string} bucketIdentifier The ID of the bucket.
     * @method
     * @public
     */
    take(bucketIdentifier: string): Promise<void>;
}
