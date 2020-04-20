import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function (props) {
   return (
      <Svg width={40} height={40} viewBox="0 0 40 40" fill="none" {...props}>
         <Path
            d="M20.8 8.828c5.834.406 10.4 5.23 10.4 11.172a11.164 11.164 0 01-10.4 11.172V8.828zM18.873 20.004l-7.293 7.395c-3.71-4.26-3.702-10.538-.003-14.69l7.296 7.295z"
            stroke="#1A0B3D"
            strokeWidth={1.6}
         />
      </Svg>
   );
}
