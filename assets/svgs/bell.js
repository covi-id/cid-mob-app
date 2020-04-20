import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function (props) {
   return (
      <Svg width={18} height={22} viewBox="0 0 18 22" fill="none" {...props}>
         <Path
            d="M3.794 5.645A5.315 5.315 0 019 1.4v0a5.315 5.315 0 015.206 4.245l.427 2.08.434 2.002.433 2.003.689 2.791a2 2 0 01-1.942 2.48H3.753a2 2 0 01-1.942-2.48l.689-2.79.867-4.006.427-2.08z"
            stroke="#fff"
            strokeWidth={1.2}
            strokeLinecap="round"
            strokeLinejoin="round"
         />
         <Path d="M12 17.6a3 3 0 11-6 0" stroke="#fff" strokeWidth={1.2} />
      </Svg>
   );
}
