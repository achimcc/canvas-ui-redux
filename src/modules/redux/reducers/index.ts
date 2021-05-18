import { combineReducers } from 'redux';

import contracts, { contractState } from './contracts';

const rootReducer = combineReducers({
  contracts,
});

export interface RootState {
  contracts: contractState;
}

export default rootReducer;
