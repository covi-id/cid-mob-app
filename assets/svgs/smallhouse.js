import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function (props) {
   return (
      <Svg width={49} height={22} viewBox="0 0 49 22" fill="none" {...props}>
         <Path
            stroke="#1A0B3D"
            strokeWidth={2}
            d="M5.133 11.055h30.47v9.828H5.133zM44.458 1H35.83v19.882h8.627zM18 1h27.157M0 21h49"
         />
         <Path
            stroke="#1A0B3D"
            d="M10.949 13.451h25.094v8.048H10.949zM38.047 3.398h4.018v13.075h-4.018z"
         />
         <Path stroke="#1A0B3D" strokeWidth={2} d="M20.482 1.773v8.28" />
      </Svg>
   );
}
