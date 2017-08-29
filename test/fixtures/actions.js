import { FETCHR } from '../../src';

export const fetchUsersAction = {
  type: FETCHR,
  payload: {
    type: 'read',
    resource: 'users',
  },
};

export const fetchUser1Action = {
  type: FETCHR,
  payload: {
    type: 'read',
    resource: 'users',
    params: {
      id: 1,
    },
  },
};

export const createDiaryAction = {
  type: FETCHR,
  payload: {
    type: 'create',
    resource: 'diary',
    params: {
      title: 'foo',
      content: 'bar',
    },
  },
};

export const fetchDiaryAction = {
  type: FETCHR,
  payload: {
    type: 'read',
    resource: 'diary',
  },
};

export const fetchProductsAction = {
  type: FETCHR,
  payload: {
    type: 'read',
    resource: 'products',
  },
};

export function expectAction({ payload }) {
  return {
    type: 'FETCHR_SUCCESS',
    payload,
  };
}
