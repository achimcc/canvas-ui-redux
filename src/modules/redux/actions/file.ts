import { useDispatch as _useDispatch } from 'react-redux';
import { createAction } from '@reduxjs/toolkit';

export const storeContract = createAction('@file/Uploaded', (file: File) => ({
  payload: { file },
}));
export const notifyUpload = createAction(
  '@file/Stored',
  (wasm: Uint8Array, name: string, methods: Array<string>, hash: string, json: string) => ({
    payload: { wasm, name, methods, hash, json },
  })
);
