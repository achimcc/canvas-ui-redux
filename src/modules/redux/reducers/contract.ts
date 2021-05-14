import { ApiRx } from '@polkadot/api';
import { Abi } from '@polkadot/api-contract';
import { createReducer } from '@reduxjs/toolkit';
import * as Actions from './actions';

export interface ContractState {
  abi: Abi | undefined;
  wasm: undefined | Uint8Array;
  api: ApiRx | undefined;
}

const initialState: ContractState = {
  wasm: undefined,
  abi: undefined,
  api: undefined,
};

const contractReducer = createReducer(initialState, builder => {
  builder.addCase(Actions.apiDisconnected, state => (state.api = undefined));
});

export default contractReducer;
