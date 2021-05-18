import { useSelector, selectors } from '../../modules/redux';
import ContractInstance from '../../common/components/execute/ContractInstance';

const ExecutePage = () => {
  const instances = useSelector(selectors.instance.getAll);
  return (
    <>
      <div className="bg-white rounded shadow p-6 m-4 w-full">
        {instances.map(instance => (
          <ContractInstance instance={instance} />
        ))}
      </div>
    </>
  );
};

export default ExecutePage;
