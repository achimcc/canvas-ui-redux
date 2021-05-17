// Copyright 2021 @paritytech/canvas-ui authors & contributors

import type { BareProps as Props } from '@common/types';
import type { GetServerSidePropsResult } from 'next/types';

import React from 'react';

export default function Connect(): React.ReactElement<Props> {
  return <>Hello!</>;
}

export function getServerSideProps(): Promise<GetServerSidePropsResult<Props>> {
  return Promise.resolve({ props: {} });
}
