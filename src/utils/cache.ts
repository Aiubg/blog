/**
 * Memoizes an async function, caching results by arguments
 *
 * @param fn - The async function to memoize
 * @returns Memoized function that caches results
 */
export function memoize<Args extends unknown[], T>(
  fn: (...args: Args) => Promise<T>,
): (...args: Args) => Promise<T> {
  // Content changes during development must be visible without a restart.
  if (import.meta.env.DEV) {
    return fn
  }

  const cache = new Map<string, Promise<T>>()

  return (...args: Args): Promise<T> => {
    // Generate cache key from function arguments
    const key = JSON.stringify(args)

    // Return cached promise if it exists
    const cached = cache.get(key)
    if (cached) {
      return cached
    }

    // Execute the original function and cache the promise
    const promise = fn(...args)
    cache.set(key, promise)

    // Remove failed promises from cache to allow retry
    promise.catch(() => {
      cache.delete(key)
    })

    return promise
  }
}
