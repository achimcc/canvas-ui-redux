import { useState } from 'react';
import { Switch } from '@headlessui/react';
import { useDispatch, useSelector } from '../../../../modules/redux';

interface Props {
  address: string;
}

const Call = ({ address }: Props) => {
  const dispatch = useDispatch();
  const { hash = undefined } =
    useSelector(store => store.contracts.instances.find(i => i.address === address)) || {};
  const { methods = [] } =
    useSelector(store => store.contracts.contracts.find(c => c.hash === hash)) || {};
  const [method, setMethod] = useState<string>();
  const [rpc, setRpc] = useState<boolean>(true);
  const onCall = () =>
    method && address && dispatch({ type: rpc ? 'CallRpc' : 'Call', payload: { address, method } });
  return (
    <>
      {address && (
        <>
          Method:
          <select
            className="flex-no-shrink p-2 ml-2 border-2 rounded"
            onChange={e => setMethod(e.target.value)}
            name="method"
            id="methods"
          >
            {methods.map(method => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>{' '}
          RPC Call:
          <Switch
            checked={rpc}
            onChange={setRpc}
            className={`${
              rpc ? 'bg-blue-600' : 'bg-gray-200'
            } relative inline-flex items-center h-6 rounded-full w-11`}
          >
            <span className="sr-only">RPC Call</span>
            <span
              className={`${
                rpc ? 'translate-x-6' : 'translate-x-1'
              } inline-block w-4 h-4 transform bg-white rounded-full`}
            />
          </Switch>
          {'  '}
          <button
            className="p-2 ml-2 bg-green-500 hover:bg-green-700 text-white font-bold border border-blue-700 rounded right-0"
            onClick={onCall}
          >
            Call!
          </button>
        </>
      )}
    </>
  );
};
export default Call;
