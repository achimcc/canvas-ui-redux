import { Epic } from 'redux-observable';
import { map, mergeMap, filter } from 'rxjs/operators';
import { Observable, from } from 'rxjs';
import { RootState } from '../store/rootReducer';
import actions from '../actions';

const deploy: Epic<any, any, RootState> = (action$, store, { api }): Observable<any> =>
  action$.pipe(
    filter(actions.api.disconnect.match),
    mergeMap(() => {
      console.log('disconnect: ');
      const promise = (api && api.disconnect()) || new Promise(r => r);
      return from(promise);
    }),
    map(() => {
      return {
        type: 'Disconnected',
      };
    })
  );

export default deploy;
