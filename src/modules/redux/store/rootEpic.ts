import { combineEpics } from 'redux-observable';
import connect from '../epics/connect';
import disconnect from '../epics/disconnect';
import deploy from '../epics/deploy';
import upload from '../epics/uploadContract';
import call from '../epics/call';
import callRpc from '../epics/callRpc';
import { RootState } from './rootReducer';

const rootEpic = combineEpics<any, any, RootState>(
  connect,
  disconnect,
  deploy,
  upload,
  call,
  callRpc
);

export default rootEpic;
