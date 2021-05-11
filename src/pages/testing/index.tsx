// Copyright 2021 @paritytech/canvas-ui authors & contributors

import type { BareProps as Props } from '@common/types';
import type { GetServerSidePropsResult } from 'next/types';

import React from 'react';

export default function Testing (): React.ReactElement<Props> {
  return (
    <div />
  );
}

export function getServerSideProps (): Promise<GetServerSidePropsResult<Props>> {
  return Promise.resolve({ props: {} });
}
