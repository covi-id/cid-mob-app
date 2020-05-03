import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function (props) {
  return (
    <Svg width={17} height={12} viewBox="0 0 17 12" fill="none" {...props}>
      <Path d="M10 11l5.5-5L10 1M15 6H0" stroke={props.color} strokeWidth={2} />
    </Svg>
  );
}
