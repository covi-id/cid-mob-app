import * as React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

export default function (props) {
   return (
      <Svg width={20} height={38} viewBox="0 0 20 38" fill="none" {...props}>
         <Rect
            x={0.97}
            y={0.972}
            width={18.06}
            height={36.06}
            rx={3.48}
            stroke="#1A0B3D"
            strokeWidth={1.74}
         />
         <Path
            d="M11.815 32.5a1.365 1.365 0 11-2.73 0 1.365 1.365 0 012.73 0zM1 5.965h18"
            stroke="#1A0B3D"
            strokeWidth={0.87}
         />
      </Svg>
   );
}
