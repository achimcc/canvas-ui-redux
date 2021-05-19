import { ISubmittableResult } from '@polkadot/types/types';
import { useDispatch as _useDispatch } from 'react-redux';
import { createAction } from '@reduxjs/toolkit';
import { ContractStatus, UIMessage } from '../types';

export const startInstantiation = createAction('@contract/startInstantiation');

export const instantiate = createAction(
  '@contract/instantiate',
  (hash: string, gas: string, endowment: string) => ({
    payload: { hash, gas, endowment },
  })
);

export const instanceResponse = createAction(
  '@contract/instanceResponse',
  (message: UIMessage) => ({
    payload: { message },
  })
);

export const cancelInstantiation = createAction('@contract/cancelInstantiation');

export const call = createAction('@contract/call', (address: string, method: string) => ({
  payload: { address, method },
}));

export const callRpc = createAction('@contract/callRpc', (address: string, method: string) => ({
  payload: { address, method },
}));

export const cancelCall = createAction('@contract/cancelCall');

export const callResponse = createAction('@contract/callResponse', (message: UIMessage) => ({
  payload: { message },
}));

export const clearResult = createAction('@contract/clearResult');

export const forget = createAction('@contract/forget', (address: string) => ({
  payload: { address },
}));

export const instantiated = createAction(
  '@contract/instantiated',
  (result: ISubmittableResult, status: ContractStatus) => ({
    payload: { result, status },
  })
);
