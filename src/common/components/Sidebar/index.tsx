import type { BareProps as Props } from '@common/types';
import Item from './SidebarItem';

export default function Sidebar(): React.ReactElement<Props> {
  return (
    <>
      <nav>
        <div className="border-r-2 w-72 h-screen border-gray-700">
          <ul className="text-center flex flex-row justify-center sm:flex-col w-full">
            <Item href="/connect" key="connect" title="Connect">
              Connect
            </Item>
            <Item href="/upload" key="upload" title="Upload">
              Upload
            </Item>
            <Item key="execute" title="execute" href="/execute">
              Execute
            </Item>
            <Item key="call" title="call" href="/call">
              Call
            </Item>
          </ul>
        </div>
      </nav>
    </>
  );
}
