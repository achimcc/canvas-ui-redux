import { useEffect, useState } from 'react';
import { Meta } from '@layout/Meta';
import Call from '../../common/components/call/Call';
import CallResults from '../../common/components/call/CallResults';
import SelectInstance from '../../common/components/call/SelectInstance';
import { useDispatch } from '../../modules/redux';
import { Main } from '../../templates/Main';

interface Params {
  address?: string;
}

const CallPage = ({ address }: Params) => {
  const [selectedAddress, setSelectedAddress] = useState<string | undefined>(address);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'ClearCallResults' });
  }, [dispatch]);
  return (
    <Main meta={<Meta description="..." title="Canvas UI" />}>
      <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans my-3.5">
        <SelectInstance address={selectedAddress} onChange={setSelectedAddress} />{' '}
      </div>
      <div className="h-100 w-full flex items-center justify-start bg-teal-lightest font-sans my-3.5">
        {selectedAddress && <Call address={selectedAddress} />}
      </div>
      <div className="bg-white rounded shadow p-6 m-4 w-full">
        Results:
        <CallResults />
      </div>
    </Main>
  );
};
export default CallPage;
