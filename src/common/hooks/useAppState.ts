// Copyright 2021 @paritytech/canvas-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { AppState, AppTheme } from '../types';

import { appStateDefault } from '@common/constants';
import React, { useCallback, useReducer } from 'react';

type UseAppState = [AppState, { setTheme: React.Dispatch<AppTheme> }]

export default function useAppState (): UseAppState {
  const [state, dispatch] = useReducer((state: AppState, updates: Partial<AppState>) => ({
    ...state,
    ...updates
  }), appStateDefault);

  const setTheme = useCallback(
    (theme: AppTheme) => {
      dispatch({ theme });
    },
    []
  );

  return [state, { setTheme }];
}
