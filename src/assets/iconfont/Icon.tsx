/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';
import IconListen from './IconListen';
import IconSoundWave from './IconSoundWave';
import IconLike from './IconLike';
import IconMore from './IconMore';
import IconUpdateDafalut from './IconUpdateDafalut';
import IconAccount from './IconAccount';
import IconCollection from './IconCollection';
import IconFillFind from './IconFillFind';
import IconHomeFill from './IconHomeFill';

export type IconNames = 'icon-listen' | 'icon-Sound-wave' | 'icon-like' | 'icon-more' | 'icon-update_dafalut' | 'icon-account' | 'icon-collection' | 'icon-fill-find' | 'icon-home-fill';

interface Props extends GProps, ViewProps {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

export const Icon: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'icon-listen':
      return <IconListen {...rest} />;
    case 'icon-Sound-wave':
      return <IconSoundWave {...rest} />;
    case 'icon-like':
      return <IconLike {...rest} />;
    case 'icon-more':
      return <IconMore {...rest} />;
    case 'icon-update_dafalut':
      return <IconUpdateDafalut {...rest} />;
    case 'icon-account':
      return <IconAccount {...rest} />;
    case 'icon-collection':
      return <IconCollection {...rest} />;
    case 'icon-fill-find':
      return <IconFillFind {...rest} />;
    case 'icon-home-fill':
      return <IconHomeFill {...rest} />;
  }

  return null;
};

export default Icon;
