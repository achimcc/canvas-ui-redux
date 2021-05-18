import { Meta } from '@layout/Meta';
import { useSelector, selectors } from '../../modules/redux';
import ContractInstance from '../../common/components/execute/ContractInstance';
import { Main } from '../../templates/Main';

const ExecutePage = () => {
  const instances = useSelector(selectors.instance.getAll);
  return (
    <Main meta={<Meta description="..." title="Canvas UI" />}>
      <div className="bg-white rounded shadow p-6 m-4 w-full">
        {instances.map(instance => (
          <ContractInstance instance={instance} />
        ))}
      </div>
    </Main>
  );
};

export default ExecutePage;
