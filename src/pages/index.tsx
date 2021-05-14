// Copyright 2021 @paritytech/canvas-ui authors & contributors

import type { GetStaticPropsResult } from 'next';

import React from 'react';

import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';
import Connect from '../common/components/connect/Connect';

type Props = Record<string, unknown>;

export default function Index(): React.ReactElement<Props> {
  return (
    <Main meta={<Meta description="..." title="Canvas UI" />}>
      <Connect />
    </Main>
  );
}

export function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
  return Promise.resolve({ props: {} });
}
