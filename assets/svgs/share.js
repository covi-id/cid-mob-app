import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

export default function (props) {
   return (
      <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
         <Circle cx={12.8} cy={2.601} r={1.8} stroke="#fff" strokeWidth={1.2} />
         <Circle cx={3.2} cy={8.002} r={1.8} stroke="#fff" strokeWidth={1.2} />
         <Path
            d="M11.3 3.434L4.7 7.1v1.8l6.48 3.6"
            stroke="#fff"
            strokeWidth={0.6}
         />
         <Circle cx={12.8} cy={13.402} r={1.8} stroke="#fff" strokeWidth={1.2} />
      </Svg>
   );
}
