import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function (props) {
   return (
      <Svg width={40} height={40} viewBox="0 0 40 40" fill="none" {...props}>
         <Path
            d="M20 8l3.456 7.886 8.544.832-6.65 5.477 2.066 8.63L20 26.611l-7.416 4.214 1.725-8.63L8 16.718l8.517-.832L20 8z"
            stroke="#1A0B3D"
            strokeWidth={1.6}
            strokeLinecap="round"
            strokeLinejoin="round"
         />
      </Svg>
   );
}
