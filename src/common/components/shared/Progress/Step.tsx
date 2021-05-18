import Bar from './Bar';

interface Props {
  path: string;
  label: string;
  progress?: false | number;
}

const Icon = ({ path, label, progress = false }: Props) => {
  const isActive = progress === false || progress === 100;
  return (
    <>
      <div className="w-1/4">
        <div className="relative mb-2">
          {(progress || progress === 0) && <Bar progress={progress} />}
          <div
            className={`w-10 h-10 mx-auto ${
              isActive ? 'bg-green-500' : 'bg-white border-2 border-gray-200'
            } rounded-full text-lg text-white flex items-center`}
          >
            <span className={`text-center ${isActive ? 'text-white' : 'text-gray-600'} w-full`}>
              <svg
                className="w-full fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={24}
                height={24}
              >
                <path className="heroicon-ui" d={path} />
              </svg>
            </span>
          </div>
        </div>
        <div className="text-xs text-center md:text-base">{label}</div>
      </div>
    </>
  );
};

export default Icon;
