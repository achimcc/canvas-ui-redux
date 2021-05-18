import { useSelector } from '../../../../modules/redux';
import Message from '../../shared/Message';

const CallResults = () => {
  const { callResults } = useSelector(store => store.contracts);
  return (
    <>
      {callResults.map(message => (
        <Message message={message} />
      ))}
    </>
  );
};

export default CallResults;
