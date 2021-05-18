import { useDispatch, UIMessage } from '../../../modules/redux';
import Message from '../shared/Message';
import Cancel from './Cancel';

interface Props {
  messages: Array<UIMessage>;
  isDeploying?: boolean;
}

const Deploy = ({ messages, isDeploying }: Props) => {
  const dispatch = useDispatch();
  const history = [];
  const onCancelDeploy = () => dispatch({ type: 'CancelDeploy' });
  const onSuccess = () => {
    history.push('/execute');
  };
  return (
    <>
      {messages.map(message => (
        <Message key={message.text} message={message} />
      ))}
      <div className="p-2 bg-white border-gray-200 text-right">
        {isDeploying ? (
          <Cancel onClick={onCancelDeploy}>Cancel</Cancel>
        ) : (
          <button
            className="p-2 ml-2 bg-green-500 hover:bg-green-700 text-white font-bold border border-blue-700 rounded right-0"
            onClick={onSuccess}
          >
            Go to Execute Page
          </button>
        )}
      </div>
    </>
  );
};

export default Deploy;