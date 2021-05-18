import { useSelector } from '../../store/store';
import Contract from './ContractFile';

const ContractFiles = () => {
  const contracts = useSelector(store => store.ui.contracts);
  return (
    <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans my-3.5">
      <div className="bg-white rounded shadow p-6 m-4 w-full">
        <div>
          {contracts.map(contract => (
            <Contract key={contract.id} contract={contract} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContractFiles;
