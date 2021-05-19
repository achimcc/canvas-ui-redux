import { Epic } from 'redux-observable';
import { map, filter, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiRx, WsProvider } from '@polkadot/api';
import { Action } from '@reduxjs/toolkit';
import { RootState } from '../../reducers';
import actions from '../../actions';
import { Dependencies } from '../../types';

const connect: Epic<Action<any>, Action<any>, RootState, Dependencies> = (
  action$,
  store,
  { setApi }
): Observable<any> =>
  action$.pipe(
    filter(actions.api.connect.match),
    switchMap(action => {
      const { url } = action.payload;
      const provider = new WsProvider(url);
      const instance = new ApiRx({ provider, types: {} });
      return instance.isReady;
    }),
    map(api => {
      setApi(api);
      return actions.api.connected();
    })
  );

export default connect;
