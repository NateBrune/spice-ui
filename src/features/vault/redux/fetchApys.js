import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  VAULT_FETCH_APYS_BEGIN,
  VAULT_FETCH_APYS_SUCCESS,
  VAULT_FETCH_APYS_FAILURE,
} from './constants';
import { getApiCacheBuster } from '../../web3/getApiCacheBuster';

export function fetchApys() {
  return dispatch => {
    dispatch({
      type: VAULT_FETCH_APYS_BEGIN,
    });

    return new Promise((resolve, reject) => {
      const cacheBuster = getApiCacheBuster();
      const url = `http://localhost:3000/apy/breakdown?_=${cacheBuster}`;
      const doRequest = axios.get(url, { crossDomain: true });

      doRequest.then(
        res => {
          const data = {};
          //res.data.forEach(e => data[e.vaultId] = e)
          Object.entries(res.data).forEach(e => (data[e[0]] = e[1]));
          dispatch({
            type: VAULT_FETCH_APYS_SUCCESS,
            data: data,
          });
          resolve(res);
        },
        err => {
          dispatch({
            type: VAULT_FETCH_APYS_FAILURE,
            data: { error: err },
          });
          reject(err);
        }
      );
    });
  };
}

export function useFetchApys() {
  const dispatch = useDispatch();

  const { apys, fetchApysPending, fetchApysDone } = useSelector(
    state => ({
      apys: state.vault.apys,
      fetchApysDone: state.vault.fetchApysDone,
      fetchApysPending: state.vault.fetchApysPending,
    }),
    shallowEqual
  );

  const boundAction = useCallback(() => {
    dispatch(fetchApys());
  }, [dispatch]);

  return {
    apys,
    fetchApys: boundAction,
    fetchApysDone,
    fetchApysPending,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case VAULT_FETCH_APYS_BEGIN:
      return {
        ...state,
        fetchApysPending: true,
      };

    case VAULT_FETCH_APYS_SUCCESS:
      return {
        ...state,
        apys: action.data,
        fetchApysDone: true,
        fetchApysPending: false,
      };

    case VAULT_FETCH_APYS_FAILURE:
      return {
        ...state,
        fetchApysPending: false,
      };

    default:
      return state;
  }
}
