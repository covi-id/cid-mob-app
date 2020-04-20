import * as React from 'react';
import Svg, { Path, Rect, Circle } from 'react-native-svg';

export default function (props) {
   return (
      <Svg width={34} height={29} viewBox="0 0 34 29" fill="none" {...props}>
         <Rect
            x={1}
            y={6}
            width={32}
            height={22}
            rx={2}
            stroke="#1A0B3D"
            strokeWidth={2}
         />
         <Path
            d="M10 7V4a3 3 0 013-3h8a3 3 0 013 3v2.25"
            stroke="#1A0B3D"
            strokeWidth={2}
         />
         <Path
            d="M14.124 14.125L20 20.001M20 14.125l-5.876 5.876"
            stroke="#1A0B3D"
         />
         <Circle cx={17} cy={17} r={6.5} stroke="#1A0B3D" />
      </Svg>
   );
}
