import { useSelector } from '../../store/store';
import UploadFile from '../UploadFile';
import Connect from '../connect/Connect';
import Progress from '../shared/Progress/Progress';
import Deploy from '../instantiate/Deploy';
import Settings from './Settings';

interface Props {
  id: string;
}

const Instantiate = ({ id }: Props) => {
  const { contractStatus, deployMessages } = useSelector(store => store.ui.instantiate);
  const progress = {
    Endpoint: 0,
    Upload: 25,
    Settings: 50,
    Deploying: 60,
    Deployed: 100,
    Error: 0,
  };
  const statusComponent = {
    Endpoint: Connect,
    Upload: () => UploadFile({ onSave: () => {} }),
    Settings: () => Settings({ id }),
    Deploying: () => Deploy({ messages: deployMessages, isDeploying: true }),
    Deployed: () => Deploy({ messages: deployMessages, isDeploying: false }),
    Error: () => Deploy({ messages: deployMessages, isDeploying: false }),
  };

  const Status = statusComponent[contractStatus];

  return (
    <>
      <Progress progress={progress[contractStatus]} />
      <Status />
    </>
  );
};

export default Instantiate;
