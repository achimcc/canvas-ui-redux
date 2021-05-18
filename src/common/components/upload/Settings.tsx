import { useState } from 'react';
import { useDispatch, useSelector, actions, selectors } from '../../../modules/redux';
import InputValue from '../shared/InputValue';

interface Props {
  hash: string;
}

const Settings = ({ hash }: Props) => {
  const dispatch = useDispatch();
  const { name = 'Error' } = useSelector(selectors.file.byHash(hash));
  const [gas, setGas] = useState<string>('200000000000');
  const [endowment, setEndowment] = useState<string>('1000000000000000');
  const onInstantiate = () => dispatch(actions.instance.instantiate(gas, endowment, hash));
  return (
    <>
      <h2>{name}</h2>
      <InputValue value={gas} onChange={setGas} label={'Gas'} />
      <InputValue value={endowment} onChange={setEndowment} label={'Endowment'} />
      <div className="p-2 bg-white border-gray-200 text-right">
        <button
          className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
          onClick={onInstantiate}
        >
          Instantiate
        </button>
      </div>
    </>
  );
};

export default Settings;
