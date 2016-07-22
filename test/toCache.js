import { test } from 'eater/runner';
import assert from 'assert';
import { default as createStore, actions } from './fixtures/createStore';
import { fetchUsersAction, expectAction } from './fixtures/actions';

test('toCache: false', () => {
  let toCache = false;
  const store = createStore({ toCache: () => toCache });
  store.dispatch(fetchUsersAction).then((result) => {
    return store.dispatch(fetchUsersAction);
  }, assert.fail).then((result) => {
    assert.deepEqual(result, expectAction(fetchUsersAction));
    assert.deepEqual(actions, [expectAction(fetchUsersAction), expectAction(fetchUsersAction)]);
  }, assert.fail);
});

test('toCache: false -> true', () => {
  let toCache = false;
  const store = createStore({ toCache: () => toCache });
  store.dispatch(fetchUsersAction).then((result) => {
    toCache = true;
    return store.dispatch(fetchUsersAction);
  }, assert.fail).then((result) => {
    return store.dispatch(fetchUsersAction);
  }, assert.fail).then((result) => {
    assert.deepEqual(result, expectAction(fetchUsersAction));
    assert.deepEqual(actions, [expectAction(fetchUsersAction), expectAction(fetchUsersAction)]);
  }, assert.fail);
});
