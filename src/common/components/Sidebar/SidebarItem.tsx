import Link from 'next/link';
import { useRouter } from 'next/router';

interface Props {
  href: string;
  title: string;
  children?: any;
}

const Item = ({ href, children, title }: Props) => {
  const router = useRouter();
  const isActive = href.startsWith(router.pathname);
  return (
    <li className="h-14 border-b border-gray-900 hidden flex-1 sm:block" title={title}>
      <div className={`h-full w-full hover:bg-gray-700 ${isActive && 'bg-white'} block p-3`}>
        <Link href={href}>{children}</Link>
      </div>
    </li>
  );
};

export default Item;
