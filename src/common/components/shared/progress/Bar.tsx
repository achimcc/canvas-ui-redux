interface Props {
  progress: number;
}

const Bar = ({ progress }: Props) => {
  return (
    <div
      className="absolute flex align-center items-center align-middle content-center"
      style={{
        width: `calc(100% - 2.5rem - 1rem)`,
        top: `50%`,
        transform: `translate(-50%, -50%)`,
      }}
    >
      <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
        <div className="w-0 bg-green-300 py-1 rounded" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
};

export default Bar;
