import { useDispatch as _useDispatch } from 'react-redux';
import { createAction } from '@reduxjs/toolkit';

export const connectApi = createAction('@api/connectRequested', (url: string) => ({
  payload: { url },
}));
export const apiConnected = createAction('@api/message');
export const disconnectApi = createAction('@api/disconnectRequested');
export const apiDisconnected = createAction('@api/disconnectResponseSumbitted');
