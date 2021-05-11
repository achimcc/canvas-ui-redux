// Copyright 2021 @paritytech/canvas-ui authors & contributors

import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

class MyDocument extends Document {
  render (): React.ReactElement {
    return (
      <Html className='dark'
        lang='en'>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
