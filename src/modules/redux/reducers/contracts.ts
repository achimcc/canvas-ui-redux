import { CodeSubmittableResult } from '@polkadot/api-contract/base';
import { createReducer, nanoid } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { ContractStatus, UIMessage, UIContract, ConnectStatus, Instance } from '../types';
import { obtainMessage } from '../utils/convertResults';
import actions from '../actions';

export interface Instantiate {
  deployMessages: Array<UIMessage>;
  contractStatus: ContractStatus;
  contractName: string;
  id: string;
}
export interface contractState {
  instantiate: Instantiate;
  contracts: Array<UIContract>;
  instances: Array<Instance>;
  callResults: Array<UIMessage>;
  connectStatus: ConnectStatus;
  connectUrl: string;
}

const initialState: contractState = {
  instantiate: {
    contractStatus: 'Settings',
    deployMessages: [],
    contractName: '',
    id: '',
  },
  contracts: [],
  instances: [],
  callResults: [],
  connectStatus: 'Unconnected',
  connectUrl: '',
};

const contractReducer = createReducer(initialState, builder => {
  builder
    .addCase(HYDRATE, state => {
      state = state;
    })
    .addCase(actions.api.connected, state => {
      console.log('connected!');
      state.instantiate.contractStatus = 'Upload';
      state.connectStatus = 'Connected';
    })
    .addCase(actions.api.connect, (state, action) => {
      console.log('connected!');
      state.instantiate.contractStatus = 'Upload';
      state.connectStatus = 'Connected';
      state.connectUrl = action.payload.url;
    })
    .addCase(actions.api.disconnected, state => {
      state.connectStatus = 'Unconnected';
    })
    .addCase(actions.file.notifyUpload, (state, action) => {
      const { name, methods, wasm, json } = action.payload;
      const contract: UIContract = {
        name,
        json,
        methods,
        wasm,
        id: nanoid(9),
      };
      state.contracts.push(contract);
    })
    .addCase(actions.contract.instantiateResponse, (state, action) => {
      const { result, status } = action.payload;
      const message = obtainMessage(result);
      state.instantiate.deployMessages.push(message);
      state.instantiate.contractStatus = status;
      if (status === 'Deployed') {
        const address =
          (result as CodeSubmittableResult<'rxjs'>).contract?.address.toString() || 'error';

        const instance: Instance = {
          id: state.instantiate.id,
          address,
        };
        state.instances.push(instance);
      }
    })
    .addCase(actions.contract.instantiate, (state, action) => {
      state.instantiate.id = action.payload.id;
      state.instantiate = initialState.instantiate;
    })
    .addCase(actions.file.forget, (state, action) => {
      const { id } = action.payload;
      state.contracts = state.contracts.filter(c => c.id !== id);
    })
    .addCase(actions.contract.forgetInstance, (state, action) => {
      const { address } = action.payload;
      state.instances = state.instances.filter(i => i.address !== address);
    })
    .addCase(actions.contract.instanceResponse, (state, action) => {
      state.callResults.push(action.payload.message);
    })
    .addCase(actions.contract.clearResult, state => {
      state.callResults.length = 0;
    });
});

export default contractReducer;
