import { combineEpics } from 'redux-observable';
import { RootState } from '../reducers';
import { Dependencies } from '../types';
import connect from './api/connect';
import disconnect from './api/disconnect';
import instantiate from './instance/instantiate';
import upload from './file/uploadContract';
import call from './instance/call';
import callRpc from './instance/callRpc';

const rootEpic = combineEpics<any, any, RootState, Dependencies>(
  connect,
  disconnect,
  instantiate,
  upload,
  call,
  callRpc
);

export default rootEpic;
