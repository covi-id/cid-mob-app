import * as React from 'react';
import Svg, { Path, Circle, Rect } from 'react-native-svg';

export default function (props) {
   return (
      <Svg width={40} height={40} viewBox="0 0 40 40" fill="none" {...props}>
         <Rect
            x={11.2}
            y={10.4}
            width={17.6}
            height={23.2}
            rx={0.8}
            stroke="#1A0B3D"
            strokeWidth={1.6}
         />
         <Path
            d="M11.918 10.4l13.48-3.505a.8.8 0 011.002.774v1.93a.8.8 0 01-.8.8H11.918z"
            stroke="#1A0B3D"
            strokeWidth={1.6}
         />
         <Circle cx={20} cy={16.8} r={2.7} stroke="#1A0B3D" />
         <Path
            d="M24.8 24.5a.5.5 0 000-1v1zm-1.678 2.8a.5.5 0 000-1v1zm1.678 2.8a.5.5 0 000-1v1zm-10.4-5.6h10.4v-1H14.4v1zm0 2.8h8.722v-1H14.4v1zm0 2.8h10.4v-1H14.4v1z"
            fill="#1A0B3D"
         />
      </Svg>
   );
}
