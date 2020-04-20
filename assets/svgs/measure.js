import * as React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

export default function (props) {
   return (
      <Svg width={31} height={30} viewBox="0 0 31 30" fill="none" {...props}>
         <Path d="M8.514 8.38L23 22" stroke="#1A0B3D" strokeDasharray="2 2" />
         <Path
            d="M30 26a3 3 0 11-6 0 3 3 0 016 0z"
            stroke="#1A0B3D"
            strokeWidth={2}
         />
         <Circle cx={4} cy={4} r={3} stroke="#1A0B3D" strokeWidth={2} />
      </Svg>
   );
}
