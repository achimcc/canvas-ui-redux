import { Epic } from 'redux-observable';
import { map, mergeMap, filter } from 'rxjs/operators';
import { Abi } from '@polkadot/api-contract';
import { Observable, from } from 'rxjs';
import { u8aToString } from '@polkadot/util';
import { RootState } from '../../reducers';
import { NOOP, convertResult } from '../../utils/convertValues';
import actions from '../../actions';
import { Dependencies } from '../../types';

const uploadContract: Epic<any, any, RootState, Dependencies> = (
  action$,
  store,
  { getApi }
): Observable<any> =>
  action$.pipe(
    filter(actions.file.upload.match),
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
      const api = getApi();
      const abi = new Abi(json, api.registry.getChainProperties());
      const methods = abi.messages.map(({ identifier }) => identifier);
      const hash = abi.project.hash.toString();
      return actions.file.notifyUpload(name, methods, hash, json);
    })
  );

export default uploadContract;
