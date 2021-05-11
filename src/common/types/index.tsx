// Copyright 2021 @paritytech/canvas-ui authors & contributors

import React from 'react';

export type AppTheme = 'light' | 'dark';

export interface AppState {
  theme: AppTheme;
}

export interface BareProps {
  children?: React.ReactNode;
  className?: string;
}

export type UseAppState = [AppState, { setTheme: React.Dispatch<AppTheme> }]
