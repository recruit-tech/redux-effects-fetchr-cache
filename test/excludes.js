import { test } from 'eater/runner';
import assert from 'assert';
import createStore, { actions } from './fixtures/createStore';
import { fetchUsersAction, fetchProductsAction, expectAction } from './fixtures/actions';

test('excludes', () => {
  const store = createStore({ excludes: ['users'] });
  store.dispatch(fetchUsersAction).then((result) => (
    store.dispatch(fetchUsersAction)
  ), assert.fail).then((result) => {
    assert.deepEqual(result, expectAction(fetchUsersAction));
    assert.deepEqual(actions, [expectAction(fetchUsersAction), expectAction(fetchUsersAction)]);
  }, assert.fail);
});

test('not excludes', () => {
  const store = createStore({ excludes: ['users'] });
  store.dispatch(fetchProductsAction).then((result) => (
    store.dispatch(fetchProductsAction)
  ), assert.fail).then((result) => {
    assert.deepEqual(result, expectAction(fetchProductsAction));
    assert.deepEqual(actions, [expectAction(fetchProductsAction)]);
  }, assert.fail);
});
