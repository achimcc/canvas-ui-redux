import { Epic } from 'redux-observable';
import { map, mergeMap, takeUntil, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Keyring } from '@polkadot/api';
import { Abi, ContractRx } from '@polkadot/api-contract';
import BN from 'bn.js';
import { AnyJson } from '@polkadot/types/types';
import { obtainMessage } from '../utils/convertResults';
import { Instance, ContractFile } from '../types';
import { RootState } from '../store/rootReducer';
import actions from '../actions';

const call: Epic<any, any, RootState> = (action$, store, { api }): Observable<any> =>
  action$.pipe(
    filter(actions.contract.call.match),
    map(({ payload }) => {
      const { address, method } = payload;
      const { hash } = store.value.contracts.instances.find(i => i.address === address) as Instance;
      const { json } = store.value.contracts.contracts.find(c => c.hash === hash) as ContractFile;
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
    takeUntil(action$.pipe(filter(actions.contract.cancelCall.match))),
    map(response => {
      const message = obtainMessage(response);
      actions.contract.instanceResponse(message);
    })
  );

export default call;
