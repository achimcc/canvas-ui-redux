import { Epic } from 'redux-observable';
import { map, mergeMap, filter } from 'rxjs/operators';
import { Observable, from } from 'rxjs';
import { RootState } from '../../reducers';
import actions from '../../actions';

const deploy: Epic<any, any, RootState> = (action$, store, { api }): Observable<any> =>
  action$.pipe(
    filter(actions.api.disconnect.match),
    mergeMap(() => {
      const promise = (api && api.disconnect()) || new Promise(r => r);
      return from(promise);
    }),
    map(() => {
      return actions.api.disconnected();
    })
  );

export default deploy;