import { Epic } from 'redux-observable';
import { map, mergeMap, filter } from 'rxjs/operators';
import { Observable, from } from 'rxjs';
import { RootState } from '../store/rootReducer';
import * as Actions from '../actions/actions';

const deploy: Epic<any, any, RootState> = (action$, store, { getApi }): Observable<any> =>
  action$.pipe(
    filter(Actions.disconnectApi.match),
    mergeMap(() => {
      console.log('disconnect: ');
      const api = getApi();
      const promise = api && api.disconnect();
      return from(promise);
    }),
    map(() => {
      return {
        type: 'Disconnected',
      };
    })
  );

export default deploy;
