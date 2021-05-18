// Copyright 2021 @paritytech/canvas-ui authors & contributors

import '../styles/main.css';

import type { AppProps } from 'next/app';

import { appStateDefault } from '@common/constants';
import appStateReducer from '@common/reducers';
import React, { useReducer } from 'react';
import { wrapper } from '../modules/redux/store';

const App = ({ Component, pageProps }: AppProps): React.ReactElement => {
  const appState = useReducer(appStateReducer, appStateDefault);
  const AppStateContext = React.createContext(appState);

  return (
    <AppStateContext.Provider value={appState}>
      <Component {...pageProps} />
    </AppStateContext.Provider>
  );
};

export default wrapper.withRedux(App);
