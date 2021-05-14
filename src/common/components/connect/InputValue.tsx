interface Props {
  onChange: (value: string) => void;
  label: string;
  value: string;
}

const InputValue = ({ onChange, label, value }: Props) => {
  const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <>
      <div className="flex">
        <span className="text-sm border-2 rounded-l px-4 py-2 bg-gray-300 whitespace-no-wrap">
          {label}
        </span>
        <input
          name={`field_${label}`}
          className="border-2 rounded-r px-4 py-2 w-full"
          type="text"
          placeholder={label}
          value={value}
          onChange={_onChange}
        />
      </div>
    </>
  );
};

export default InputValue;
