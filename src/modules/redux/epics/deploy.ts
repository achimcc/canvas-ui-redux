import { Epic } from 'redux-observable';
import { map, mergeMap, takeUntil, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Keyring } from '@polkadot/api';
import { Abi, CodeRx } from '@polkadot/api-contract';

import BN from 'bn.js';
import { AnyJson } from '@polkadot/types/types';
import { RootState } from '../store/rootReducer';
import { obtainStatus } from '../utils/convertResults';
import { UIContract } from '../types';
import actions from '../actions';

const deploy: Epic<any, any, RootState> = (action$, store, { api }): Observable<any> =>
  action$.pipe(
    filter(actions.contract.instantiate.match),
    map(action => {
      const { gas, endowment, id } = action.payload;
      const contract = store.value.contracts.contracts.find(c => c.id === id) as UIContract;
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
    takeUntil(action$.ofType('CancelDeploy')),
    map(result => {
      const status = obtainStatus(result);
      return {
        type: 'DeployMessage',
        payload: { result, status },
      };
    })
  );

export default deploy;
