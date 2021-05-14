import { Epic } from 'redux-observable';
import { map, mergeMap, takeUntil, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import BN from 'bn.js';
import { ApiRx, Keyring } from '@polkadot/api';
import { Abi, ContractRx } from '@polkadot/api-contract';
import { ContractCallOutcome } from '@polkadot/api-contract/types';
import { AnyJson } from '@polkadot/types/types';
import { RootState } from '../store/rootReducer';
import * as Actions from '../reducers/actions';

const deploy: Epic<any, any, RootState> = (action$, store): Observable<any> =>
  action$.pipe(
    filter(Actions.callRpc.match),
    map(action => {
      const { address } = action.payload;
      const { id } = store.value.ui.instances.find(i => i.address === address) || {};
      const { json } = store.value.ui.contracts.find(c => c.id === id) || {};
      return { ...action.payload, id, json };
    }),
    filter(({ id, json }) => !!id && !!json),
    mergeMap(({ address, method, json }) => {
      const api = store.value.contract.api as ApiRx;
      const abi = new Abi(json as any as AnyJson, api.registry.getChainProperties());
      const contract = new ContractRx(api, abi, address );
      const gas = new BN('800000000');
      const keyring = new Keyring({ type: 'sr25519' });
      const alice = keyring.addFromUri('//Alice');
      const adds = alice.address;
      const call = contract.query[method](adds, { gasLimit: gas });
      return call;
    }),
    takeUntil(action$.ofType('CancelCall')),
    map(response => response as unknown as ContractCallOutcome),
    map(response => {
      const message = {
        text: `RPC Call output: ${response.output}`,
        isError: false,
      };
      return {
        type: 'CallResult',
        payload: { message },
      };
    })
  );

export default deploy;
