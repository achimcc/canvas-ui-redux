import { createSelectorHook, useDispatch as _useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';
import { createWrapper } from 'next-redux-wrapper';
import logger from 'redux-logger';
import { ApiRx } from '@polkadot/api';
import rootReducer, { RootState } from './rootReducer';

import rootEpic from './rootEpic';

let api: ApiRx;

const setApi = (apiToSet: ApiRx) => (api = apiToSet);
const getApi = () => !!api && api;

const makeStore = () => {
  const epicMiddleware = createEpicMiddleware<any, any, RootState>({
    dependencies: { setApi, getApi },
  });
  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware()
        .prepend(
          // correctly typed middlewares can just be used
          epicMiddleware
          // you can also type middlewares manually
        )
        // prepend and concat calls can be chained
        .concat(logger),
  });
  epicMiddleware.run(rootEpic);
  return store;
};

const wrapper = createWrapper(makeStore, { debug: true });

const _useSelector = createSelectorHook<RootState>();

function useSelector<T>(fn: (store: RootState) => T): T {
  return fn(_useSelector(x => x));
}

function useDispatch(): (args: any) => any {
  const dispatch = _useDispatch();
  return (action: any) => dispatch(action);
}

export { wrapper, useSelector, useDispatch };
