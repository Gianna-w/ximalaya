/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';
import IconAccount from './IconAccount';
import IconCollection from './IconCollection';
import IconCollectionFill from './IconCollectionFill';
import IconFillFind from './IconFillFind';
import IconAccountfilling from './IconAccountfilling';
import IconHomeFill from './IconHomeFill';

export type IconNames = 'icon-account' | 'icon-collection' | 'icon-collection_fill' | 'icon-fill-find' | 'icon-accountfilling' | 'icon-home-fill';

interface Props extends GProps, ViewProps {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

export const Icon: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'icon-account':
      return <IconAccount {...rest} />;
    case 'icon-collection':
      return <IconCollection {...rest} />;
    case 'icon-collection_fill':
      return <IconCollectionFill {...rest} />;
    case 'icon-fill-find':
      return <IconFillFind {...rest} />;
    case 'icon-accountfilling':
      return <IconAccountfilling {...rest} />;
    case 'icon-home-fill':
      return <IconHomeFill {...rest} />;
  }

  return null;
};

export default Icon;
