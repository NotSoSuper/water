import { AxiosResponse } from 'axios';

/**
 * Container for bucket-specific information, such as when a bucket resets and
 * how many tickets are remaining in the bucket.
 *
 * @class
 */
export class Bucket {
    /**
     * The total number of tickets that are allowed to be taken.
     */
    public limit: number = 0;

    /**
     * The number of tickets remaining.
     */
    public remaining: number = 1;

    /**
     * The unix timestamp - in seconds - of when the bucket resets.
     */
    public reset: number = 0;

    /**
     * Takes a ticket from the bucket, sleeping if necessary if the number of
     * remaining tickets is 0.
     *
     * @public
     * @method
     */
    public async take(): Promise<void> {
        for (;;) {
            // If the remaining is greater than zero, decrement it, and let the
            // ticket retrieval finish.
            if (this.remaining > 0) {
                this.remaining -= 1;

                return;
            }

            const now = new Date().getTime();

            // If the reset was in the past, just set it back to the limit,
            // minus one (for this request).
            if (now > this.reset) {
                this.remaining = this.limit - 1;

                return;
            }

            // Since the `reset` hasn't been reached yet in time, and
            // `remaining` is zero, we need to queue the ticket retrieval.
            await new Promise(resolve => setTimeout(resolve, this.reset - now));

            // Finally, set `remaining` back to `limit`, but only if it's still
            // 0.
            //
            // This avoids other queued ticket retrievals from also setting it
            // back to 0.
            if (this.remaining === 0) {
                this.remaining = this.limit;
            }

            // Re-loop so that the ticket retrieval can start back from the
            // beginning. If _a lot_ of requests were queued, this will re-queue
            // the later requests.
        }
    }
}

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

        const limit = response.headers['X-RateLimit-Limit'];
        const remaining = response.headers['X-RateLimit-Remaining'];
        const reset = response.headers['X-RateLimit-Reset'];

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

        const retryAfter = response.headers['Retry-After'];

        if (!retryAfter) {
            return null;
        }

        if (Boolean(response.headers['X-RateLimit-Global'])) {
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

            await new Promise(resolve => setTimeout(resolve, diff));
        }

        const bucket = this.get(bucketIdentifier);
        await bucket.take();
    }
}
