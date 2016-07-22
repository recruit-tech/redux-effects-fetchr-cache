import { createStore, applyMiddleware } from 'redux';
import { default as fetchrCacheMiddleware, FETCHR } from '../../src';

export const actions = [];

function log(store) {
  return (next) => (action) => {
    actions.push(action);
    return next(action);
  };
}

function fetchrMiddleeware({ dispatch }) {
  return (next) => (action) => {
    if (action.type !== FETCHR || action.payload.type !== 'read') {
      return next(action);
    }

    return Promise.resolve(dispatch({
      type: 'FETCHR_SUCCESS',
      payload: action.payload,
    }));
  };
}

export default function (options) {
  return createStore(() => {
  }, {}, applyMiddleware(fetchrCacheMiddleware({}, options), fetchrMiddleeware, log));
}
