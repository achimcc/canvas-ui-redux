import { ContractFile, useActions } from '../../../modules/redux';
import { useModal } from '../shared/modal/useModal';
import Instantiate from './instantiate/InstantiateWizard';

interface Props {
  contract: ContractFile;
}

const Contract = ({ contract: { name, hash } }: Props) => {
  const { file } = useActions();
  const { show, RenderModal } = useModal();
  const onDelete = () => file.forget(hash);
  const onInstantiate = () => {
    show();
  };
  return (
    <div key={hash} className="w-full flex mb-4 items-center">
      <p className="w-full text-grey-darkest">{name}</p>
      <p className="w-full text-grey-darkest">{hash}</p>
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
      <RenderModal id={`instantiate-modal-${hash}`}>
        <Instantiate hash={hash} />
      </RenderModal>
      <div id={`instantiate-modal-${hash}`} />
    </div>
  );
};

export default Contract;
