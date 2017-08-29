import { test } from 'eater/runner';
import assert from 'assert';
import createDataStore from './fixtures/createDataStore';
import { createDiaryAction, fetchDiaryAction } from './fixtures/actions';

test('resetCache: always false => cache all', () => {
  const resetCache = false;
  const store = createDataStore({ resetCache: () => resetCache });
  store.dispatch(fetchDiaryAction).then((result) => Promise.all([
    store.dispatch(createDiaryAction),
    store.dispatch(createDiaryAction),
  ]), assert.fail).then((results) => store.dispatch(fetchDiaryAction)
  ).then((result) => {
    assert.deepStrictEqual(result.payload, []);
  }, assert.fail);
});

test('resetCache: always true => always reset cache', () => {
  const resetCache = true;
  const store = createDataStore({ resetCache: () => resetCache });
  store.dispatch(fetchDiaryAction).then((result) => Promise.all([
    store.dispatch(createDiaryAction),
    store.dispatch(createDiaryAction),
  ]), assert.fail).then((results) => store.dispatch(fetchDiaryAction)
  ).then((result) => {
    assert.deepStrictEqual(result.payload, 
      [{ title: 'foo', content: 'bar' }, { title: 'foo', content: 'bar' }]);
  }, assert.fail);
});

test('resetCache: read always uses cache, but create purges the cache result', () => {
  const resetCache = (action) => action.payload.type !== 'read';
  const store = createDataStore({ resetCache });
  store.dispatch(fetchDiaryAction).then(
    (result) => store.dispatch(createDiaryAction), assert.fail
  ).then(
    (result) => store.dispatch(fetchDiaryAction), assert.fail
  ).then(
    (result) => assert.deepStrictEqual(result.payload, 
      [{ title: 'foo', content: 'bar' }]), assert.fail
  );
});

