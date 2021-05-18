import { createSelectorHook, useDispatch as _useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';
import { createWrapper } from 'next-redux-wrapper';
import logger from 'redux-logger';
import { ApiRx } from '@polkadot/api';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer, { RootState } from '../reducers';
import { Dependencies } from '../types';

import rootEpic from '../epics';

let api: ApiRx;

const setApi = (apiToSet: ApiRx) => (api = apiToSet);
const getApi = () => !!api && api;

const makeStore = () => {
  const epicMiddleware = createEpicMiddleware<any, any, RootState, Dependencies>({
    dependencies: { setApi, getApi },
  });
  const persistConfig = {
    key: 'root',
    storage,
  };
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().prepend(epicMiddleware).concat(logger),
  });
  epicMiddleware.run(rootEpic);
  return store;
};

const wrapper = createWrapper(makeStore, { debug: true });

const _useSelector = createSelectorHook<RootState>();

function useSelector<T>(fn: (store: RootState) => T): T {
  return fn(_useSelector(x => x));
}

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];

const useDispatch = () => _useDispatch<AppDispatch>();

export { wrapper, useSelector, useDispatch };

export type Store = RootState;
