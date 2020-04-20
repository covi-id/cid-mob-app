import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function (props) {
   return (
      <Svg width={40} height={38} viewBox="0 0 40 38" fill="none" {...props}>
         <Path
            d="M1.333 26.832h6.5m-6.5 4h10m-10 4h16"
            stroke="#1A0B3D"
            strokeLinecap="round"
         />
         <Path
            d="M24.333 16.832l8 4.5m-15 7.5c1-.5 3.4-2.1 5-4.5M37.333 1.332l-7.5 15"
            stroke="#1A0B3D"
            strokeWidth={2}
         />
         <Path
            d="M24.348 16.74l1.844-3.064 7.407 4.115-1.24 3.377a21.001 21.001 0 00-1.093 10.088l.024.177a2 2 0 01-2.31 2.244l-2.29-.382a19 19 0 01-9.5-4.54l-1.532-1.361a1.846 1.846 0 01.41-3.035 19.973 19.973 0 008.28-7.618z"
            stroke="#1A0B3D"
            strokeWidth={2}
         />
      </Svg>
   );
}
