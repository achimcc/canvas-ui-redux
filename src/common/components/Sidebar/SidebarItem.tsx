import Link from 'next/link';
import { useRouter } from 'next/router';

interface Props {
  href: string;
  children?: any;
}

const Item = ({ href, children }: Props) => {
  const router = useRouter();
  const isActive = href.startsWith(router.pathname);
  return (
    <li className="h-14 border-b border-gray-900 hidden flex-1 sm:block" title="Home">
      <div className={`h-full w-full hover:bg-gray-700 ${isActive && 'bg-white'} block p-3`}>
        <Link href={href}>{children}</Link>
      </div>
    </li>
  );
};

export default Item;
