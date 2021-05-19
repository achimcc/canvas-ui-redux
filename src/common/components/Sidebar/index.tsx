import type { BareProps as Props } from '@common/types';
import { FaFileContract } from 'react-icons/fa';
import { FiPlayCircle, FiUpload } from 'react-icons/fi';
import { useSelector, selectors } from '../../../modules/redux';
import ConnectIcon from '../global/ConnectIcon';
import Item from './SidebarItem';

export default function Sidebar(): React.ReactElement<Props> {
  const status = useSelector(selectors.api.status);

  return (
    <>
      <nav>
        <div className="border-r-2 w-72 h-screen border-gray-700">
          <ul className="text-center flex flex-row justify-center sm:flex-col w-full">
            <Item href="/connect">
              <ConnectIcon status={status} />
            </Item>
            <Item href="/upload">
              <div>
                <FiUpload className="inline-block" />
              </div>
            </Item>
            <Item href="/execute">
              <FaFileContract className="inline-block" />
            </Item>
            <Item href="/call">
              <FiPlayCircle className="inline-block" />
            </Item>
          </ul>
        </div>
      </nav>
    </>
  );
}
