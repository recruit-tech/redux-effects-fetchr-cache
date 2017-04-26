import { test } from 'eater/runner';
import assert from 'assert';
import createStore, { actions } from './fixtures/createStore';
import { fetchUsersAction, expectAction } from './fixtures/actions';

test('toCache: false', () => {
  const toCache = false;
  const store = createStore({ toCache: () => toCache });
  store.dispatch(fetchUsersAction).then((result) => (
    store.dispatch(fetchUsersAction)
  ), assert.fail).then((result) => {
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
  }, assert.fail).then((result) => (
    store.dispatch(fetchUsersAction)
  ), assert.fail).then((result) => {
    assert.deepEqual(result, expectAction(fetchUsersAction));
    assert.deepEqual(actions, [expectAction(fetchUsersAction), expectAction(fetchUsersAction)]);
  }, assert.fail);
});
