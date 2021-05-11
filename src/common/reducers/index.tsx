// Copyright 2021 @paritytech/canvas-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { AppState } from '@common/types';

export default function appStateReducer (state: AppState, updates: Partial<AppState>): AppState {
  return {
    ...state,
    ...updates
  };
}
