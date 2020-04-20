import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function (props) {
   return (
      <Svg width={40} height={26} viewBox="0 0 40 26" fill="none" {...props}>
         <Path
            d="M7 6.036l11.912-4.615a3 3 0 012.175.003L33 6.074M7 6.036V19.14M7 6.036S5.638 3.983 4 3m29 3.074v13.104m0-13.104S34.362 3.983 36 3m-3 16.178c-4.805 3.821-14.897 8.794-26-.038m26 .038c2.173-1.729 4.362-3.604 6-9.173M7 19.14c-2.173-1.73-4.362-3.566-6-9.135"
            stroke="#1A0B3D"
            strokeWidth={2}
         />
         <Path
            d="M10 10.5h20M10 13v0a19.548 19.548 0 0018.76.13L29 13"
            stroke="#1A0B3D"
            strokeLinecap="round"
         />
         <Path
            d="M10 16v0a18.8 18.8 0 0018.766.133L29 16"
            stroke="#1A0B3D"
            strokeLinecap="round"
         />
      </Svg>
   );
}
