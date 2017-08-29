import { createStore, applyMiddleware } from 'redux';
import fetchrCacheMiddleware, { FETCHR } from '../../src';

export const data = [];

function fetchrMiddleeware({ dispatch }) {
  return (next) => (action) => {
    if (action.type !== FETCHR) {
      return next(action);
    }

    if (action.payload.type === 'create') {
      data.push(action.payload.params);
    }

    return Promise.resolve(dispatch({
      type: 'FETCHR_SUCCESS',
      payload: [...data],
    }));
  };
}

export default function (options) {
  return createStore(() => {
  }, {}, applyMiddleware(fetchrCacheMiddleware({}, options), fetchrMiddleeware));
}

