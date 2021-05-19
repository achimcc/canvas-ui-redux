import { useDispatch as _useDispatch } from 'react-redux';
import { createAction } from '@reduxjs/toolkit';

export const upload = createAction('@file/Uploaded', (file: File) => ({
  payload: { file },
}));
export const notifyUpload = createAction(
  '@file/Stored',
  (name: string, methods: Array<string>, hash: string, json: string) => ({
    payload: { name, methods, hash, json },
  })
);
export const forget = createAction('@contract/forgetContractRequested', (hash: string) => ({
  payload: { hash },
}));
