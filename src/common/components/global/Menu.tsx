import Link from 'next/link';
import { FaFileContract } from 'react-icons/fa';
import { FiPlayCircle, FiUpload } from 'react-icons/fi';
import { useSelector } from '../../../modules/redux';
import ConnectIcon from './ConnectIcon';

const Menu = () => {
  const { connectStatus: status } = useSelector(store => store.contracts);

  return (
    <>
      <nav>
        <ul className="text-center flex flex-row justify-center sm:flex-col w-full">
          <li className="h-14 border-b border-gray-900 hidden flex-1 sm:block" title="Home">
            <div className="h-full w-full hover:bg-gray-700 block p-3">
              <Link href="/">
                <ConnectIcon status={status} />
              </Link>
            </div>
          </li>
          <li className="sm:border-b border-gray-900 flex-1  sm:w-full" title="Upload Contracts">
            <div className="h-full w-full bg-gray-800 hover:bg-gray-700 block p-3">
              <Link href="/upload">
                <div>
                  <FiUpload className="inline-block" />
                </div>
              </Link>
            </div>
          </li>
          <li className="sm:border-b border-gray-900 flex-1 sm:w-full" title="Execute Contracts">
            <div className="h-full w-full bg-gray-800 hover:bg-gray-700 block p-3">
              <Link href="/execute">
                <FaFileContract className="inline-block" />
              </Link>
            </div>
          </li>
          <li
            className="sm:border-b border-gray-900 flex-1 sm:w-full"
            title="Execute Contract Functions"
          >
            <div className="h-full w-full bg-gray-800 hover:bg-gray-700 block p-3">
              <Link href="/call">
                <FiPlayCircle className="inline-block" />
              </Link>
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Menu;
