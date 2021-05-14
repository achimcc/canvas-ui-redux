import { Epic } from 'redux-observable';
import { map, mergeMap, filter } from 'rxjs/operators';
import { Observable, from } from 'rxjs';
import { ApiRx } from '@polkadot/api';
import { RootState } from '../store/rootReducer';
import * as Actions from '../reducers/actions';

const deploy: Epic<any, any, RootState> = (action$, store): Observable<any> =>
  action$.pipe(
    filter(Actions.disconnectApi.match),
    map(() => {
      const api = store.value.contract.api as ApiRx;
      return api;
    }),
    mergeMap(api => {
      const promise = api.disconnect();
      return from(promise);
    }),
    map(() => {
      return {
        type: 'Disconnected',
      };
    })
  );

export default deploy;
