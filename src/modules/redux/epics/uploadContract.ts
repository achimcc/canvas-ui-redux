import { Epic } from 'redux-observable';
import { map, mergeMap, filter } from 'rxjs/operators';
import { ApiRx } from '@polkadot/api';
import { Abi } from '@polkadot/api-contract';
import { Observable, from } from 'rxjs';
import { u8aToString } from '@polkadot/util';
import { RootState } from '../store/rootReducer';
import * as Actions from '../actions/actions';
import { NOOP, convertResult } from '../utils/convertValues';

const uploadContract: Epic<any, any, RootState> = (action$, store): Observable<any> =>
  action$.pipe(
    filter(Actions.storeContract.match),
    mergeMap(action => {
      //     const promise = (action.payload as File).text();
      const { file } = action.payload;
      const promise = new Promise<{ data: Uint8Array; name: string }>(resolve => {
        const reader = new FileReader();
        reader.onabort = NOOP;
        reader.onerror = NOOP;
        reader.onload = ({ target }: ProgressEvent<FileReader>): void => {
          if (target && target.result) {
            const name = file.name;
            const data = convertResult(target.result as ArrayBuffer);
            resolve({ data, name });
          }
        };
        reader.readAsArrayBuffer(file);
      });
      return from(promise);
    }),
    map(({ data, name }) => {
      const json = u8aToString(data);
      const api = (store as any).value.contract.api as ApiRx;
      const abi = new Abi(json, api.registry.getChainProperties());
      const wasm = abi.project.source.wasm;
      const methods = abi.messages.map(({ identifier }) => identifier);
      const hash = abi.project.hash.toString();
      return Actions.notifyUpload(wasm, name, methods, hash, json);
    })
  );

export default uploadContract;
