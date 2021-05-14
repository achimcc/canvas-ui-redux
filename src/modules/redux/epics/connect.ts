import { Epic } from 'redux-observable';
import { map, filter, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiRx, WsProvider } from '@polkadot/api';
import * as Actions from '../reducers/actions';
import { RootState } from '../store/rootReducer';

const connect: Epic<any, any, RootState> = (action$): Observable<any> =>
  action$.pipe(
    filter(Actions.connectApi.match),
    switchMap(action => {
      console.log('connect requested!');
      const { url } = action.payload;
      const provider = new WsProvider(url);
      const instance = new ApiRx({ provider, types: {} });
      return instance.isReady;
    }),
    map(api => {
      api.on('connected', s => {
        console.log('connect: ', s);
      });
      return Actions.apiConnected();
    })
  );

export default connect;
