/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { Svg, GProps, Path } from 'react-native-svg';
import { getIconColor } from './helper';

interface Props extends GProps, ViewProps {
  size?: number;
  color?: string | string[];
}

export const IconCollection: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M240.154 934.54c11.134 7.636 24.193 11.516 37.266 11.516a66.176 66.176 0 0 0 31.297-7.84l203.258-109.464 203.3 109.463a66.374 66.374 0 0 0 31.296 7.841c13.06 0 26.12-3.88 37.294-11.516 20.19-13.948 30.518-37.854 26.474-61.706l-39.616-236.632 170.91-170.663c16.925-16.831 22.718-41.53 15.012-63.96-7.732-22.39-27.622-38.742-51.568-42.32l-233.149-34.686-101.361-210.389c-10.628-22.103-33.47-36.242-58.592-36.242-25.04 0-47.894 14.14-58.563 36.242l-101.336 210.39-233.16 34.684c-23.962 3.579-43.852 19.931-51.57 42.321-7.705 22.43-1.871 47.129 15.04 63.96l170.841 170.663-39.629 236.632c-3.99 23.852 6.323 47.758 26.556 61.706z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconCollection.defaultProps = {
  size: 18,
};

export default IconCollection;
