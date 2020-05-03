import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg width={81} height={69} viewBox="0 0 81 69" fill="none" {...props}>
      <Circle opacity={0.9} cx={46.724} cy={34.276} r={34.276} fill="#F1F0F8" />
      <Circle cx={17.138} cy={35.138} r={17.138} fill="#03F5A9" />
      <Path
        d="M52.476 17H70v17.524M41.524 17H24v17.524M41.524 63H24V45.476M52.476 63H70V45.476"
        stroke="#654CF0"
        strokeWidth={3}
        strokeLinejoin="round"
      />
      <Path d="M24 38.5a1.5 1.5 0 000 3v-3zm46 3a1.5 1.5 0 000-3v3zm-46 0h46v-3H24v3z" fill="#654CF0" />
    </Svg>
  );
}

export default SvgComponent;
