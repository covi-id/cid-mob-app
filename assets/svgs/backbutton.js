import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function (props) {
   return (
      <Svg width={17} height={12} viewBox="0 0 17 12" fill="none" {...props}>
         <Path d="M7 1L1.5 6 7 11M2 6h15" stroke="#fff" strokeWidth={2} />
      </Svg>
   );
}
