import * as React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

export default function (props) {
   return (
      <Svg width={80} height={80} viewBox="0 0 80 80" fill="none" {...props}>
         <Circle cx={40} cy={40} r={40} fill="#F5F5F6" />
         <Path
            d="M29 51l3-3.3v-9.769c0-.818.08-1.642.403-2.392 1.007-2.335 3.505-5.617 7.597-5.989 4.84-.44 9.35-.55 11-.55M29 51l3-3h9.769c.818 0 1.64-.081 2.395-.396 2.401-1.002 5.913-3.502 6.286-7.604.44-4.84.55-9.35.55-11"
            stroke="#1A0B3D"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
         />
         <Path
            d="M35.6 44.4l8.9-8.9M47 33l-2.5 2.5m0-3.5v3.5M40.5 39.5H46M37.5 36v6.5m6.5.5h-3"
            stroke="#1A0B3D"
            strokeLinecap="round"
         />
      </Svg>
   );
}
