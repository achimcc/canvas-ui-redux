import { Epic } from 'redux-observable';
import { map, filter, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiRx, WsProvider } from '@polkadot/api';
import { RootState } from '../store/rootReducer';
import actions from '../actions';

const connect: Epic<any, any, RootState> = (action$, store, { setApi }): Observable<any> =>
  action$.pipe(
    filter(actions.api.connectApi.match),
    switchMap(action => {
      console.log('connect requested!');
      const { url } = action.payload;
      const provider = new WsProvider(url);
      const instance = new ApiRx({ provider, types: {} });
      return instance.isReady;
    }),
    map(api => {
      setApi(api);
      console.log('api: ', api);
      return actions.api.apiConnected();
    })
  );

export default connect;
