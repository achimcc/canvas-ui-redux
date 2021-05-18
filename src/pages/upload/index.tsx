import React from 'react';
import { useModal } from '../../common/components/shared/Modal/useModal';
import Upload from '../../common/components/UploadFile';
import Contracts from '../components/upload/ContractFiles';

const UploadPage = React.memo(() => {
  const { show: showUpload, RenderModal, hide: hideUpload } = useModal();
  const onUpload = () => {
    showUpload();
  };
  return (
    <div>
      <div className="w-full">
        <div className="w-full text-right">
          <button
            className="p-2 ml-2 bg-green-500 hover:bg-green-700 text-white font-bold border border-blue-700 rounded right-0"
            onClick={onUpload}
          >
            Upload Contract
          </button>
        </div>
        <RenderModal id="upload-modal">
          <Upload onSave={hideUpload} />
        </RenderModal>
      </div>
      <div id="upload-modal" />

      <div className="w-full mt-5">
        <Contracts />
      </div>
    </div>
  );
});

export default UploadPage;
