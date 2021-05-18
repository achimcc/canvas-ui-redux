import { useSelector, selectors } from '../../../modules/redux';
import Contract from './Contract';

const ContractList = () => {
  const contracts = useSelector(selectors.file.allContracts);
  return (
    <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans my-3.5">
      <div className="bg-white rounded shadow p-6 m-4 w-full">
        <div>
          {contracts.map(contract => (
            <Contract key={contract.hash} contract={contract} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContractList;
