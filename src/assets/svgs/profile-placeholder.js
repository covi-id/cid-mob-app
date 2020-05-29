import * as React from 'react';
import Svg, { Circle, Mask, G, Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg width={242} height={240} viewBox="0 0 242 240" fill="none" {...props}>
      <Circle cx={120} cy={120} r={119.114} fill="#C9C0FA" />
      <Mask id="prefix__a" maskUnits="userSpaceOnUse" x={3} y={1} width={239} height={239}>
        <Circle cx={122.114} cy={120.114} r={119.114} fill="#C9C0FA" />
      </Mask>
      <G mask="url(#prefix__a)" fill="#B2A5F7">
        <Circle cx={119.9} cy={105.9} r={48.9} />
        <Path d="M201.582 245.849c-1.572-15.797-9.045-55.063-44.582-71.254-6.015-2.741-12.691-3.496-19.301-3.496h-34.398c-6.61 0-13.286.755-19.301 3.496-35.537 16.191-43.01 55.456-44.582 71.254-.37 3.733 2.623 6.75 6.374 6.75h149.416c3.751 0 6.745-3.017 6.374-6.75z" />
      </G>
    </Svg>
  );
}

export default SvgComponent;
