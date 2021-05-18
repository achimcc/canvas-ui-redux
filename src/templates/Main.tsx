// Copyright 2021 @paritytech/canvas-ui authors & contributors

import { Sidebar } from '@common/components';
import React, { ReactNode } from 'react';

interface Props {
  meta: ReactNode;
  children?: ReactNode;
}

const Main = ({ children, meta }: Props): React.ReactElement<Props> => (
  <div className="dark:bg-gray-900 bg-white antialiased w-full h-screen text-gray-700">
    {meta}

    <div className="flex flex-row w-screen-md">
      <Sidebar />
      <div className="w-full content">{children}</div>
    </div>
  </div>
);

export { Main };
