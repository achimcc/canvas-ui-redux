import { Epic } from 'redux-observable';
import { map, mergeMap, takeUntil, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiRx, Keyring, WsProvider } from '@polkadot/api';
import { Abi, ContractRx } from '@polkadot/api-contract';
import BN from 'bn.js';
import { AnyJson } from '@polkadot/types/types';
import { obtainMessage } from '../utils/convertResults';
import { Instance, UIContract } from '../types';
import * as Actions from '../actions/actions';
import { RootState } from '../store/rootReducer';

const deploy: Epic<any, any, RootState> = (action$, store, { api }): Observable<any> =>
  action$.pipe(
    filter(Actions.call.match),
    map(({ payload }) => {
      const { address, method } = payload;
      const { id } = store.value.ui.instances.find(i => i.address === address) as Instance;
      const { json } = store.value.ui.contracts.find(c => c.id === id) as UIContract;
      const abi = new Abi(json as any as AnyJson, api.registry.getChainProperties());
      const contract = new ContractRx(api, abi, address);
      const gas = new BN('800000000');
      const call = contract.tx[method]({ gasLimit: gas });
      return call;
    }),
    mergeMap(call => {
      const keyring = new Keyring({ type: 'sr25519' });
      const alice = keyring.addFromUri('//Alice');
      const observable = call.signAndSend(alice);
      return observable;
    }),
    takeUntil(action$.ofType('CancelCall')),
    map(response => {
      const message = obtainMessage(response);
      return {
        type: 'CallResult',
        payload: { message },
      };
    })
  );

export default deploy;
