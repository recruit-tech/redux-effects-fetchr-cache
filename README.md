# redux-effects-fetchr

Caching middleware for
[redux-effects-fetchr](https://www.npmjs.com/package/redux-effects-fetchr).

## Installation

```
npm install --save redux-effects-fetchr-cache
```

## Usage

Installing the middleware:

```javascript
import { createStore, applyMiddleware } from 'redux';
import Fetchr from 'fetchr';
import stepsMiddleware from 'redux-effects-steps';
import fetchrMiddleware from 'redux-effects-fetchr';
import fetchrCacheMiddleware from 'redux-effects-fetchr-cache';
import rootReducer from './reducers';

const fetchr = new Fetchr({
  xhrPaht: '/api'
});

const cacheConfig = {
  max: 500,
  maxAge: 1000 * 60 * 60
};

const store = createStore(
  rootReducer,
  applyMiddleware(
    stepsMiddleware,
    fetchrCacheMiddleware(cacheConfig),
    fetchrMiddleware(fetchr)
  )
);
```
redux-effects-fetchr-cache must be installed *before* redux-effects-fetchr.

## API

### Middleware

#### `fetchrCacheMiddleware(cacheConfig, [options])`

Creates redux middleware.

##### Arguments

* `cacheConfig` *(Object)*: See
  [lru-cahce API docs](https://www.npmjs.com/package/lru-cache)
  for more info.
* `options` *(Object)*:
    * `excludes` *(Array)*: An array of the resource names to not use the cache.
      Defaults `[]`.
    * `fromCache` *(Function)*: Checks whether an action is target to obtain from cache.
      Defaults `() => true`.
        * Arguments:
            * `action` *(Object)*: An action.
            * `state` *(Object)*: The current state of the Store.
        * Returns:
            * *(Boolean)*: If `true`, uses cache to obtain the resource.
    * `toCache` *(Function)*: Checks whether an action is target to store to cache.
      Defaults `() => true`.
        * Arguments:
            * `action` *(Object)*: An action.
            * `state` *(Object)*: The current state of the Store.
        * Returns:
            * *(Boolean)*: If `true`, saves the obtaining resource to cache.
    * `resetCache` *(Function)*: reset cache if resetCache function returns true.
      Defaults `() => false`.
        * Arguments:
            * `action` *(Object)*: An action.
            * `state` *(Object)*: The current state of the Store.
        * Returns:
            * *(Boolean)*: If `true`, reset all cache.

##### Returns

* *(Function)*: Redux middleware.
