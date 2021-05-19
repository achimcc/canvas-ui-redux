import React from 'react';
import { Meta } from '@layout/Meta';
import { Main } from '../../templates/Main';
import { useModal } from '../../common/components/shared/modal/useModal';
import Upload from '../../common/components/upload/UploadFile';
import Contracts from '../../common/components/upload/ContractList';

const UploadPage = () => {
  const { show: showUpload, RenderModal, hide: hideUpload } = useModal();
  const onUpload = () => {
    showUpload();
  };
  return (
    <Main meta={<Meta description="..." title="Canvas UI" />}>
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
    </Main>
  );
};

export default UploadPage;
