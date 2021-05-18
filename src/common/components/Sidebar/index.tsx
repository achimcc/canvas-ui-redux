// Copyright 2021 @paritytech/canvas-ui authors & contributors

import type { BareProps as Props } from '@common/types';
import Link from 'next/link';

import React from 'react';

export default function Sidebar(): React.ReactElement<Props> {
  return (
    <div className="border-r-2 w-72 h-screen border-gray-700">
      <ul>
        <li>
          <Link href="/connect/test?url=spiegel">
            <a>Connect API</a>
          </Link>
        </li>
        <li>
          <Link href="/upload">
            <a>Upload Contract</a>
          </Link>
        </li>
        <li>
          <Link href="/execute">
            <a>Execute Contract</a>
          </Link>
        </li>
        <li>
          <Link href="/call">
            <a>Call Contract</a>
          </Link>
        </li>
      </ul>
    </div>
  );
}
