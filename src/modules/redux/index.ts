import { bindActionCreators } from 'redux';
import actions from './actions';
import selectors from './selectors';
import reducers from './reducers';
import { useDispatch } from './store';

bindActionCreators;

const useActions = () => {
  const dispatch = useDispatch();
  const api = bindActionCreators(actions.api, dispatch);
  const instance = bindActionCreators(actions.instance, dispatch);
  const file = bindActionCreators(actions.file, dispatch);
  return { api, instance, file };
};

export { reducers, selectors, useActions };
export { wrapper, useSelector } from './store';

export * from './types';
