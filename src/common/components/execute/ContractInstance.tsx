import Link from 'next/link';
import { useActions, Instance } from '../../../modules/redux';

interface Props {
  instance: Instance;
}

const ContractInstance = ({ instance: selected }: Props) => {
  const { instance } = useActions();
  const onForget = () => instance.forget(selected.address);
  return (
    <>
      {' '}
      <div key={selected.hash} className="w-full flex mb-4 items-center">
        <p className="w-full text-grey-darkest">{selected.hash}</p>
        <p className="w-full text-grey-darkest">{selected.address}</p>
        <button
          onClick={onForget}
          className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red"
        >
          Forget
        </button>
        <Link href={`/call/${selected.address}`}>
          <button className="w-full m-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
            Execute
          </button>
        </Link>
      </div>
    </>
  );
};

export default ContractInstance;
