import { test } from 'eater/runner';
import assert from 'assert';
import { FETCHR } from '../src';
import createStore, { actions } from './fixtures/createStore';

test('not fetchr action', () => {
  const store = createStore();
  const action = {
    type: 'SOME',
    payload: {
      value: 0,
    },
  };
  store.dispatch(action);
  assert.deepEqual(actions, [action]);
});

test('create action', () => {
  const store = createStore();
  const action = {
    type: FETCHR,
    payload: {
      type: 'create',
      resource: 'users',
    },
  };
  store.dispatch(action);
  assert.deepEqual(actions, [action]);
});

test('update action', () => {
  const store = createStore();
  const action = {
    type: FETCHR,
    payload: {
      type: 'update',
      resource: 'users',
    },
  };
  store.dispatch(action);
  assert.deepEqual(actions, [action]);
});

test('delete action', () => {
  const store = createStore();
  const action = {
    type: FETCHR,
    payload: {
      type: 'delete',
      resource: 'users',
    },
  };
  store.dispatch(action);
  assert.deepEqual(actions, [action]);
});
