import { Epic } from 'redux-observable';
import { map, mergeMap, takeUntil, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Keyring } from '@polkadot/api';
import { Abi, CodeRx } from '@polkadot/api-contract';
import BN from 'bn.js';
import { AnyJson } from '@polkadot/types/types';
import { RootState } from '../../reducers';
import { obtainStatus } from '../../utils/convertResults';
import { ContractFile, Dependencies } from '../../types';
import actions from '../../actions';

const instantiate: Epic<any, any, RootState, Dependencies> = (
  action$,
  store,
  { getApi }
): Observable<any> =>
  action$.pipe(
    filter(actions.instance.instantiate.match),
    map(action => {
      const { gas, endowment, hash } = action.payload;
      const contract = store.value.contracts.contracts.find(c => c.hash === hash) as ContractFile;
      const { wasm, json } = contract;
      const api = getApi();
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
    takeUntil(action$.pipe(filter(actions.instance.cancelInstantiation.match))),
    map(result => {
      const status = obtainStatus(result);
      return actions.instance.instantiated(result, status);
    })
  );

export default instantiate;
