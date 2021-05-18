import { ConnectStatus } from '../../../modules/redux';

interface Props {
  status: ConnectStatus;
}

const ConnectIcon = ({ status }: Props) => {
  const connectColor = {
    Unconnected: 'bg-yellow-500',
    Connected: 'bg-green-500',
    Error: 'bg-red-500',
  };
  return (
    <>
      <div className={`rounded-full h-5 w-5 ${connectColor[status]} inline-block`} />
    </>
  );
};

export default ConnectIcon;
