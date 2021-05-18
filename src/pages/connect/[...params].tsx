// Copyright 2021 @paritytech/canvas-ui authors & contributors

import type { BareProps as Props } from '@common/types';
import type { GetServerSidePropsResult } from 'next/types';
import { useRouter } from 'next/router';
import { Meta } from '@layout/Meta';
import React from 'react';
import { Main } from '../../templates/Main';
import ConnectApi from '../../common/components/connect/Connect';

export default function Connect(): React.ReactElement<Props> {
  const router = useRouter();
  console.log(router.query);
  return (
    <Main meta={<Meta description="..." title="Canvas UI" />}>
      <ConnectApi />
    </Main>
  );
}

export function getServerSideProps(): Promise<GetServerSidePropsResult<Props>> {
  return Promise.resolve({ props: {} });
}
