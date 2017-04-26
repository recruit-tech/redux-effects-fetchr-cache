import createCache from 'lru-cache';

/*
 * Action types
 */
export const FETCHR = 'EFFECT_FETCHR';

/*
 * Middleware
 */

export default function fetchrCacheMiddleware(cacheConfig = {}, options = {}) {
  const cache = createCache(cacheConfig);
  const { excludes, fromCache, toCache } = options;

  return ({ dispatch, getState }) => (next) => (action) => {
    if (action.type !== FETCHR) {
      return next(action);
    }

    const { type, resource, params } = action.payload;
    if (type !== 'read'
      || (excludes && excludes.indexOf(resource) !== -1)) {
      return next(action);
    }

    const key = `${resource}@@${JSON.stringify(params)}`;
    const cachedResult = !fromCache || fromCache(action, getState()) ? cache.get(key) : null;
    if (cachedResult) {
      return Promise.resolve(cachedResult);
    }

    return next(action).then((result) => {
      if (!toCache || toCache(action, getState())) {
        cache.set(key, result);
      }

      return result;
    });
  };
}
