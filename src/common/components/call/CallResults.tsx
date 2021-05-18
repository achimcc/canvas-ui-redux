import { useSelector, selectors } from '../../../modules/redux';
import Message from '../shared/Message';

const CallResults = () => {
  const callResults = useSelector(selectors.api.callResults);
  return (
    <>
      {callResults.map(message => (
        <Message message={message} />
      ))}
    </>
  );
};

export default CallResults;
