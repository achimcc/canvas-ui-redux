import { useState } from 'react';

import { useDispatch, actions } from '../../../modules/redux';

interface Props {
  onSave: () => void;
}

const UploadFile = ({ onSave }: Props) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState<File | undefined>(undefined);
  const handleChange = ({ currentTarget: { files } }: React.ChangeEvent<HTMLInputElement>) => {
    const file = files && files[0];
    file && setFile(file);
  };
  const _onSave = () => {
    if (!file) return;
    dispatch(actions.file.upload(file));
    onSave();
  };

  return (
    <>
      <input type="file" onChange={handleChange} />
      <div className="p-2 bg-white border-gray-200 text-right">
        <button
          className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
          onClick={_onSave}
          disabled={!file}
        >
          Save
        </button>
      </div>
    </>
  );
};

export default UploadFile;
