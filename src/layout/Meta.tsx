// Copyright 2021 @paritytech/canvas-ui authors & contributors
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import React from 'react';

import { siteConfig } from '../utils';

interface Props {
  title: string;
  description: string;
  canonical?: string;
}

function Meta (props: Props): React.ReactElement<Props> {
  return (
    <>
      <Head>
        <meta charSet='UTF-8'
          key='charset' />
        <meta content='width=device-width,initial-scale=1'
          key='viewport'
          name='viewport' />
        <link
          href={`${process.env.baseUrl || ''}/apple-touch-icon.png`}
          key='apple'
          rel='apple-touch-icon'
        />
        <link
          href={`${process.env.baseUrl || ''}/favicon-32x32.png`}
          key='icon32'
          rel='icon'
          sizes='32x32'
          type='image/png'
        />
        <link
          href={`${process.env.baseUrl || ''}/favicon-16x16.png`}
          key='icon16'
          rel='icon'
          sizes='16x16'
          type='image/png'
        />
        <link href={`${process.env.baseUrl || ''}/favicon.ico`}
          key='favicon'
          rel='icon' />
      </Head>
      <NextSeo
        canonical={props.canonical}
        description={props.description}
        openGraph={{
          description: props.description,
          locale: siteConfig.locale,
          site_name: siteConfig.site_name,
          title: props.title,
          url: props.canonical
        }}
        title={props.title}
      />
    </>
  );
}

export { Meta };
