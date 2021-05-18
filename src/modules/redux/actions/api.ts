import { useDispatch as _useDispatch } from 'react-redux';
import { createAction } from '@reduxjs/toolkit';

export const connect = createAction('@api/connectRequested', (url: string) => ({
  payload: { url },
}));
export const connected = createAction('@api/message');
export const disconnect = createAction('@api/disconnectRequested');
export const disconnected = createAction('@api/disconnectResponseSumbitted');
