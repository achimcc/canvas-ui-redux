// Copyright 2021 @paritytech/canvas-ui authors & contributors

import React from 'react';
import renderer from 'react-test-renderer';

import InputAddress from './InputAddress';

test('InputAddress', () => {
  const component = renderer.create(
    <InputAddress />
  );
  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
