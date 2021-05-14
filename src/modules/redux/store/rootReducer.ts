import { combineReducers } from 'redux';
import contractReducer, { ContractState } from '../reducers/contract';

import uiReducer, { UiState } from '../reducers/ui';


const rootReducer = combineReducers({
  contract: contractReducer,
  ui: uiReducer,
});

export interface RootState {
  contract: ContractState;
  ui: UiState;
}

export default rootReducer;
