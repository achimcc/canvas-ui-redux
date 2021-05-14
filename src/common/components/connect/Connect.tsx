import { useState } from 'react';
import { useDispatch, useSelector } from '../../../modules/redux/store/store';
import * as Actions from '../../../modules/redux/reducers/actions';
import InputValue from './InputValue';

const Instantiate = () => {
  const dispatch = useDispatch();
  const [url, setUrl] = useState<string>('ws://127.0.0.1:9944');
  const { connectStatus } = useSelector(store => store.ui);
  const onConnect = () => {
    dispatch(Actions.connectApi(url));
  };
  const onDisconnect = () => dispatch(Actions.disconnectApi());

  return (
    <>
      {connectStatus === 'Unconnected' ? (
        <>
          <div className="w-full">
            <InputValue value={url} onChange={setUrl} label="Url" />
          </div>
          <div className="p-2 bg-white border-gray-200 text-right">
            <button
              className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
              onClick={onConnect}
            >
              Connect
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="w-full">Connected to: {url}</div>
          <div className="p-2 bg-white border-gray-200 text-right">
            <button
              className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
              onClick={onDisconnect}
            >
              Disconnect
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Instantiate;
