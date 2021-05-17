import { Epic } from 'redux-observable';
import { map, mergeMap, filter } from 'rxjs/operators';
import { Observable, from } from 'rxjs';
import { RootState } from '../store/rootReducer';
import actions from '../actions';

const deploy: Epic<any, any, RootState> = (action$, store, { getApi }): Observable<any> =>
  action$.pipe(
    filter(actions.api.disconnectApi.match),
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
