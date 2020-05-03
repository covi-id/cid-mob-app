import * as React from 'react';
import Svg, { Circle } from 'react-native-svg';

export default function (props) {
  return (
    <Svg width={97} height={120} viewBox="0 0 97 120" fill="none" {...props}>
      <Circle cx={37} cy={60} r={60} fill="#FBD928" fillOpacity={0.4} />
      <Circle cx={37} cy={60} r={16.291} fill="#FBD928" />
    </Svg>
  );
}
