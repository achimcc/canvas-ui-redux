import { useSelector, selectors } from '../../../modules/redux';
import Connect from '../connect/Connect';
import Progress from '../shared/Progress/Progress';
import Deploy from '../instantiate/Deploy';
import UploadFile from './UploadFile';
import Settings from './Settings';

interface Props {
  hash: string;
}

const Instantiate = ({ hash }: Props) => {
  const { contractStatus, deployMessages } = useSelector(selectors.instance.getInstantiate);
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
    Settings: () => Settings({ hash }),
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
