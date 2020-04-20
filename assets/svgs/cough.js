import * as React from 'react';
import Svg, { Path, Rect, Circle } from 'react-native-svg';

export default function (props) {
   return (
      <Svg width={30} height={33} viewBox="0 0 30 33" fill="none" {...props}>
         <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M17.291 27.799c-.744.132-1.51.201-2.291.201-7.18 0-13-5.82-13-13S7.82 2 15 2s13 5.82 13 13c0 5.277-3.144 9.82-7.662 11.857l.388.265c.492.337.79.823.896 1.34C26.585 26.018 30 20.908 30 15c0-8.284-6.716-15-15-15C6.716 0 0 6.716 0 15c0 8.284 6.716 15 15 15 .86 0 1.705-.073 2.526-.212a2.167 2.167 0 01-.182-.786L17.29 27.8z"
            fill="#1A0B3D"
         />
         <Circle cx={10.308} cy={13.308} r={1.808} stroke="#1A0B3D" />
         <Circle cx={19.692} cy={13.308} r={1.808} stroke="#1A0B3D" />
         <Path d="M18 9l4 .5M12 9l-4 .5" stroke="#1A0B3D" strokeLinecap="round" />
         <Path
            d="M17.625 26.29a.414.414 0 01.648-.361l2.227 1.523a1.763 1.763 0 11-2.757 1.532l-.118-2.695z"
            stroke="#1A0B3D"
            strokeWidth={0.8}
         />
         <Rect x={11.5} y={19.5} width={7} height={4} rx={2} stroke="#1A0B3D" />
      </Svg>
   );
}
