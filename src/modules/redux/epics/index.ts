import { combineEpics } from 'redux-observable';
import { RootState } from '../reducers';
import connect from './connect';
import disconnect from './disconnect';
import instantiate from './instantiate';
import upload from './uploadContract';
import call from './call';
import callRpc from './callRpc';

const rootEpic = combineEpics<any, any, RootState>(
  connect,
  disconnect,
  instantiate,
  upload,
  call,
  callRpc
);

export default rootEpic;
