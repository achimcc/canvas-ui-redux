import { ISubmittableResult } from '@polkadot/types/types';
import { useDispatch as _useDispatch } from 'react-redux';
import { createAction } from '@reduxjs/toolkit';
import { ContractStatus, UIMessage } from '../types';

export const instantiate = createAction(
  '@contract/instaceRequested',
  (hash: string, gas: string, endowment: string) => ({
    payload: { hash, gas, endowment },
  })
);
export const instanceResponse = createAction('@contract/response', (message: UIMessage) => ({
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

export const cancelCall = createAction('@contract/cancelCall');

export const clearResult = createAction('@contract/clearResultsRequested');

export const forgetInstance = createAction(
  '@contract/forgetInstanceRequested',
  (address: string) => ({ payload: { address } })
);

export const instantiateResponse = createAction(
  '@contract/instantiateReponse',
  (result: ISubmittableResult, status: ContractStatus) => ({
    payload: { result, status },
  })
);
