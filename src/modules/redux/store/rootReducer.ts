import { combineReducers } from 'redux';

import contracts, { contractState } from '../reducers/contracts';

const rootReducer = combineReducers({
  contracts,
});

export interface RootState {
  contracts: contractState;
}

export default rootReducer;
