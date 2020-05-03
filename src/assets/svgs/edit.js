import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function (props) {
  return (
    <Svg width={24} height={32} viewBox="0 0 24 32" fill="none" {...props}>
      <Path
        d="M14.68 6.07L5.882 21.312a4 4 0 00-.536 2.047l.057 4.831 4.213-2.366a4 4 0 001.505-1.487l8.8-15.242"
        stroke={props.color}
        strokeWidth={2}
      />
      <Path stroke="#fff" d="M6.004 21.905l4.54 2.621" />
      <Path
        d="M19.92 9.095l1.109-1.921a3.025 3.025 0 00-5.24-3.025L14.682 6.07l5.239 3.025z"
        stroke={props.color}
        strokeWidth={2}
      />
    </Svg>
  );
}
