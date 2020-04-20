import * as React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

export default function (props) {
   return (
      <Svg width={40} height={40} viewBox="0 0 40 40" fill="none" {...props}>
         <Circle cx={20} cy={20} r={11.2} stroke="#1A0B3D" strokeWidth={1.6} />
         <Circle cx={20} cy={15.2} r={1.2} stroke="#1A0B3D" strokeWidth={0.8} />
         <Path stroke="#1A0B3D" strokeWidth={0.8} d="M18.8 18.8h2.4V26h-2.4z" />
      </Svg>
   );
}
