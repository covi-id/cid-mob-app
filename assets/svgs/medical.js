import * as React from 'react';
import Svg, { Path, Rect, Circle } from 'react-native-svg';

export default function (props) {
   return (
      <Svg width={34} height={24} viewBox="0 0 34 24" fill="none" {...props}>
         <Rect
            x={1}
            y={1}
            width={32}
            height={22}
            rx={2}
            stroke="#1A0B3D"
            strokeWidth={2}
         />
         <Path
            d="M17.062 7.908v8.31M21.217 12.063h-8.31"
            stroke="#1A0B3D"
            strokeWidth={2}
         />
         <Circle
            cx={17}
            cy={11.999}
            r={6.5}
            transform="rotate(45 17 12)"
            stroke="#1A0B3D"
         />
      </Svg>
   );
}
