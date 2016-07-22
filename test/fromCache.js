import { test } from 'eater/runner';
import assert from 'assert';
import { default as createStore, actions } from './fixtures/createStore';
import { fetchUsersAction, expectAction } from './fixtures/actions';

test('fromCahce: false', () => {
  let fromCache = false;
  const store = createStore({ fromCache: () => fromCache });
  store.dispatch(fetchUsersAction).then((result) => {
    return store.dispatch(fetchUsersAction);
  }, assert.fail).then((result) => {
    assert.deepEqual(result, expectAction(fetchUsersAction));
    assert.deepEqual(actions, [expectAction(fetchUsersAction), expectAction(fetchUsersAction)]);
  }, assert.fail);
});

test('fromCache: false -> true', () => {
  let fromCache = false;
  const store = createStore({ fromCache: () => fromCache });
  store.dispatch(fetchUsersAction).then((result) => {
    return store.dispatch(fetchUsersAction);
  }, assert.fail).then((result) => {
    fromCache = true;
    return store.dispatch(fetchUsersAction);
  }, assert.fail).then((result) => {
    assert.deepEqual(result, expectAction(fetchUsersAction));
    assert.deepEqual(actions, [expectAction(fetchUsersAction), expectAction(fetchUsersAction)]);
  }, assert.fail);
});
