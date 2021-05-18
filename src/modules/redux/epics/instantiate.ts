import { Epic } from 'redux-observable';
import { map, mergeMap, takeUntil, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Keyring } from '@polkadot/api';
import { Abi, CodeRx } from '@polkadot/api-contract';

import BN from 'bn.js';
import { AnyJson } from '@polkadot/types/types';
import { RootState } from '../store/rootReducer';
import { obtainStatus } from '../utils/convertResults';
import { ContractFile } from '../types';
import actions from '../actions';

const instantiate: Epic<any, any, RootState> = (action$, store, { api }): Observable<any> =>
  action$.pipe(
    filter(actions.contract.instantiate.match),
    map(action => {
      const { gas, endowment, hash } = action.payload;
      const contract = store.value.contracts.contracts.find(c => c.hash === hash) as ContractFile;
      const { wasm, json } = contract;
      const abi = new Abi(json as any as AnyJson, api.registry.getChainProperties());
      const Gas = new BN(gas);
      const Endowment = new BN(endowment);
      const fromCode = new CodeRx(api, abi, wasm).tx.new(Endowment, Gas, 0);
      return fromCode;
    }),
    mergeMap(instance => {
      const keyring = new Keyring({ type: 'sr25519' });
      const alice = keyring.addFromUri('//Alice');
      return instance.signAndSend(alice);
    }),
    // takeWhile((response) => !response.dispatchError),
    takeUntil(action$.pipe(filter(actions.contract.cancelInstantiation.match))),
    map(result => {
      const status = obtainStatus(result);
      return actions.contract.instantiated(result, status);
    })
  );

export default instantiate;
