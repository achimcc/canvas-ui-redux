import { UIContract } from '../../types';
import { useDispatch } from '../../store/store';
import { useModal } from '../shared/Modal/useModal';
import Instantiate from './Instantiate';

interface Props {
  contract: UIContract;
}

const ContractFile = ({ contract: { name, id } }: Props) => {
  const dispatch = useDispatch();
  const onDelete = () => dispatch({ type: 'ForgetContract', payload: { id } });
  const { show, RenderModal } = useModal();
  const onInstantiate = () => {
    dispatch({ type: 'StartInstantiate' });
    show();
  };
  return (
    <div key={id} className="w-full flex mb-4 items-center">
      <p className="w-full text-grey-darkest">{name}</p>
      <p className="w-full text-grey-darkest">{id}</p>
      <button
        onClick={onDelete}
        className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red"
      >
        Delete
      </button>
      <button
        onClick={onInstantiate}
        className="w-full m-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
      >
        Instantiate
      </button>
      <RenderModal id={`instantiate-modal-${id}`}>
        <Instantiate id={id} />
      </RenderModal>
      <div id={`instantiate-modal-${id}`} />
    </div>
  );
};

export default ContractFile;
