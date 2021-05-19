import { useDispatch as _useDispatch } from 'react-redux';
import { createAction } from '@reduxjs/toolkit';

export const connect = createAction('@api/connect', (url: string) => ({
  payload: { url },
}));
export const connected = createAction('@api/connected');
export const disconnect = createAction('@api/disconnect');
export const disconnected = createAction('@api/disconnected');
