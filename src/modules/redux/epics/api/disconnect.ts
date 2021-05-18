import { Epic } from 'redux-observable';
import { map, mergeMap, filter } from 'rxjs/operators';
import { Observable, from } from 'rxjs';
import { RootState } from '../../reducers';
import actions from '../../actions';
import { Dependencies } from '../../types';

const deploy: Epic<any, any, RootState, Dependencies> = (
  action$,
  store,
  { getApi }
): Observable<any> =>
  action$.pipe(
    filter(actions.api.disconnect.match),
    mergeMap(() => {
      const api = getApi();
      const promise = (api && api.disconnect()) || new Promise(r => r);
      return from(promise);
    }),
    map(() => {
      return actions.api.disconnected();
    })
  );

export default deploy;
