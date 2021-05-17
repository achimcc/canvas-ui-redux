import { ISubmittableResult } from '@polkadot/types/types';
import { useDispatch as _useDispatch } from 'react-redux';
import { createAction } from '@reduxjs/toolkit';
import { ContractStatus, UIMessage } from '../types';

export const storeContract = createAction('@file/Uploaded', (file: File) => ({
  payload: { file },
}));
export const notifyUpload = createAction(
  '@file/Stored',
  (wasm: Uint8Array, name: string, methods: Array<string>, hash: string, json: string) => ({
    payload: { wasm, name, methods, hash, json },
  })
);
export const connectApi = createAction('@api/connectRequested', (url: string) => ({
  payload: { url },
}));
export const apiConnected = createAction('@api/message');
export const disconnectApi = createAction('@api/disconnectRequested');
export const apiDisconnected = createAction('@api/disconnectResponseSumbitted');
export const instantiateContract = createAction(
  '@contract/instaceRequested',
  (id: string, gas: string, endowment: string) => ({
    payload: { id, gas, endowment },
  })
);
export const saveInstanceResponse = createAction('@contract/response', (message: UIMessage) => ({
  payload: { message },
}));
export const cancelInstantiation = createAction('@contract/requestCancel');
export const call = createAction('@contract/requestCall', (address: string, method: string) => ({
  payload: { address, method },
}));
export const callRpc = createAction(
  '@contract/requestRpcCall',
  (address: string, method: string) => ({ payload: { address, method } })
);
export const clearResult = createAction('@contract/clearResultsRequested');
export const forgetContract = createAction('@contract/forgetContractRequested', (id: string) => ({
  payload: { id },
}));
export const forgetInstance = createAction(
  '@contract/forgetIOnstanceRequested',
  (address: string) => ({ payload: { address } })
);
export const instantiateResponse = createAction(
  '@contract/instantiateReponse',
  (result: ISubmittableResult, status: ContractStatus) => ({
    payload: { result, status },
  })
);
