import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function (props) {
   return (
      <Svg width={32} height={32} viewBox="0 0 38 24" fill="none" {...props}>
         <Path
            d="M11 10.5a1.5 1.5 0 000 3v-3zm0 3h27v-3H11v3zM2 .5a1.5 1.5 0 100 3v-3zm0 3h36v-3H2v3zM2 20.5a1.5 1.5 0 000 3v-3zm0 3h36v-3H2v3z"
            fill="#fff"
         />
      </Svg>
   );
}
