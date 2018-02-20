import { AxiosResponse } from "axios";
import { Bucket } from "branches";

/**
 * Container for path-specific buckets and retrieving tickets from them.
 *
 * Manages ratelimits, queueing requests, and a global ratelimit lock.
 *
 * @class
 */
export default class RateLimiter {
    /**
     * Map containing the buckets, keyed by their path.
     *
     * For example, a bucket may have a path of `/channels/{}`.
     */
    public buckets: Map<String, Bucket> = new Map();

    /**
     * The global ratelimit lock.
     *
     * If this is set to true, then it is a unix timestamp with millisecond
     * precision. All requests must sleep until this time.
     *
     * If this is null, then the global ratelimit has not yet (knowingly) been
     * reached.
     */
    public global: number | null = null;

    /**
     *
     * @param bucketIdentifier
     * @returns
     * @public
     * @method
     */
    public get(bucketIdentifier: string): Bucket {
        if (!this.buckets.has(bucketIdentifier)) {
            this.buckets.set(bucketIdentifier, new Bucket());
        }

        // Guarenteed to never be undefined.
        return this.buckets.get(bucketIdentifier) as Bucket;
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
     * @public
     * @method
     */
    public process(bucketIdentifier: string, response: AxiosResponse): number | null {
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

        if (response.status !== 429) {
            return null;
        }

        const retryAfter = response.headers["Retry-After"];

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
     * @param bucketIdentifier
     * @public
     * @method
     */
    public async take(bucketIdentifier: string) {
        if (this.global) {
            const diff = this.global - new Date().getTime();

            await new Promise((resolve) => setTimeout(resolve, diff));
        }

        const bucket = this.get(bucketIdentifier);
        await bucket.take();
    }
}
