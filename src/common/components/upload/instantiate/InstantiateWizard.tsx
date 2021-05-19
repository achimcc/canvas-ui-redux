import { useSelector, selectors } from '../../../../modules/redux';
import Progress from '../../shared/progress/Progress';
import Instantiate from './Instantiate';
import Settings from './Settings';

interface Props {
  hash: string;
}

const InstantiateWizard = ({ hash }: Props) => {
  const { contractStatus, deployMessages } = useSelector(selectors.instance.getInstantiate);
  const progress = {
    Settings: 50,
    Instantiating: 60,
    Instantiated: 100,
    Error: 0,
  };
  const statusComponent = {
    Settings: () => Settings({ hash }),
    Instantiating: () => Instantiate({ messages: deployMessages, isDeploying: true }),
    Instantiated: () => Instantiate({ messages: deployMessages, isDeploying: false }),
    Error: () => Instantiate({ messages: deployMessages, isDeploying: false }),
  };

  const Status = statusComponent[contractStatus];

  return (
    <>
      <Progress progress={progress[contractStatus]} />
      <Status />
    </>
  );
};

export default InstantiateWizard;
