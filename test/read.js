import { test } from 'eater/runner';
import assert from 'assert';
import { default as createStore, actions } from './fixtures/createStore';
import { fetchUsersAction, fetchUser1Action, fetchProductsAction, expectAction } from './fixtures/actions';

test('no cache', () => {
  const store = createStore();
  store.dispatch(fetchUsersAction).then((result) => {
    assert.deepEqual(result, expectAction(fetchUsersAction));
    assert.deepEqual(actions, [expectAction(fetchUsersAction)]);
  }, assert.fail);
});

test('hit cache', () => {
  const store = createStore();
  store.dispatch(fetchUsersAction).then((result) => {
    return store.dispatch(fetchUsersAction);
  }, assert.fail).then((result) => {
    assert.deepEqual(result, expectAction(fetchUsersAction));
    assert.deepEqual(actions, [expectAction(fetchUsersAction)]);
  }, assert.fail);
});

test('hit cache with params', () => {
  const store = createStore();
  store.dispatch(fetchUser1Action).then((result) => {
    return store.dispatch(fetchUser1Action);
  }, assert.fail).then((result) => {
    assert.deepEqual(result, expectAction(fetchUser1Action));
    assert.deepEqual(actions, [expectAction(fetchUser1Action)]);
  }, assert.fail);
});

test('not hit - different resource', () => {
  const store = createStore();
  store.dispatch(fetchUsersAction).then((result) => {
    return store.dispatch(fetchProductsAction);
  }, assert.fail).then((result) => {
    assert.deepEqual(result, expectAction(fetchProductsAction));
    assert.deepEqual(actions, [expectAction(fetchUsersAction), expectAction(fetchProductsAction)]);
  }, assert.fail);
});

test('not hit - different params', () => {
  const store = createStore();
  store.dispatch(fetchUsersAction).then((result) => {
    return store.dispatch(fetchUser1Action);
  }, assert.fail).then((result) => {
    assert.deepEqual(result, expectAction(fetchUser1Action));
    assert.deepEqual(actions, [expectAction(fetchUsersAction), expectAction(fetchUser1Action)]);
  }, assert.fail);
});
