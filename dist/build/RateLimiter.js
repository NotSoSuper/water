import { Bucket } from "branches";
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
    constructor() {
        /**
         * Map containing the buckets, keyed by their path.
         *
         * For example, a bucket may have a path of `/channels/{}`.
         *
         * @prop
         * @public
         * @type {Map<string, Bucket>}
         */
        this.buckets = new Map();
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
        this.global = null;
    }
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
    get(bucketIdentifier) {
        if (!this.buckets.has(bucketIdentifier)) {
            this.buckets.set(bucketIdentifier, new Bucket());
        }
        // Guarenteed to never be undefined.
        return this.buckets.get(bucketIdentifier);
    }
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
    process(bucketIdentifier, response) {
        const bucket = this.get(bucketIdentifier);
        const limit = response.headers["X-RateLimit-Limit"];
        const remaining = response.headers["X-RateLimit-Remaining"];
        const reset = response.headers["X-RateLimit-Reset"];
        if (limit && typeof limit === "number") {
            bucket.limit = limit;
        }
        if (remaining && typeof remaining === "number") {
            bucket.remaining = remaining;
        }
        if (reset && typeof reset === "number") {
            bucket.reset = reset;
        }
        if (response.statusCode !== 429) {
            return null;
        }
        let retryAfter = null;
        const retryHeader = response.headers["Retry-After"];
        if (retryHeader) {
            const value = typeof retryHeader === "string" ? retryHeader : retryHeader[0];
            const parsed = parseInt(value, 10);
            if (!isNaN(parsed)) {
                retryAfter = parsed;
            }
        }
        if (!retryAfter) {
            return null;
        }
        if (Boolean(response.headers["X-RateLimit-Global"])) {
            this.global = new Date().getTime() + retryAfter;
        }
        return retryAfter;
    }
    /**
     * Takes a ticket from the given bucket identifier.
     *
     * @param {string} bucketIdentifier The ID of the bucket.
     * @method
     * @public
     */
    async take(bucketIdentifier) {
        if (this.global) {
            const diff = this.global - new Date().getTime();
            await new Promise((resolve) => setTimeout(resolve, diff));
        }
        const bucket = this.get(bucketIdentifier);
        await bucket.take();
    }
}
//# sourceMappingURL=RateLimiter.js.map