// Copyright 2021 @paritytech/canvas-ui authors & contributors

import type { NextPage } from 'next/types';
import { useRouter } from 'next/router';
import { Meta } from '@layout/Meta';
import React from 'react';
import { wrapper } from 'src/modules/redux';
import { Main } from '../../templates/Main';
import ConnectApi from '../../common/components/connect/Connect';

interface Props {
  connect: string;
}

const Connect: NextPage<Props> = () => {
  const router = useRouter();
  console.log(router.query);
  return (
    <Main meta={<Meta description="..." title="Canvas UI" />}>
      <ConnectApi />
    </Main>
  );
};

export default Connect;

export const getServerSideProps = wrapper.getServerSideProps(async ({ store }) => {
  Promise.resolve();
});
