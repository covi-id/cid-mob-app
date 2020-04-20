import * as React from 'react';
import Svg, { Circle } from 'react-native-svg';

function SvgComponent(props) {
   return (
      <Svg width={54} height={54} viewBox="0 0 54 54" fill="none" {...props}>
         <Circle opacity={0.3} cx={27} cy={27} r={27} fill="#654CF0" />
         <Circle cx={27} cy={27} r={8.96} fill="#654CF0" />
      </Svg>
   );
}

export default SvgComponent;
