import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
function SvgComponent(props) {
  return (
    <Svg width={width} height={591} viewBox="0 0 375 591" fill="none" {...props}>
      <Path
        d="M413.556 371.503c146.13 41.201 185.977-118.957 206.836-187.45 20.858-68.493 26.052-131.731-59.894-229.194C412.382-213.103 413.727-201.929 387.61-375.842c-26.117-173.915-201.114-146.031-258.387-124.329-80.908 30.658-89.47 175.127-233.303 152.7-143.832-22.427-186.784 77.643-174.009 184.425 12.775 106.783 88.784 144.36 126.021 206.826 70.187 117.741 38.12 251.467 168.487 312.026 113.009 52.496 225.839-91.837 397.137 15.698z"
        fill="#F8F8FB"
      />
    </Svg>
  );
}

export default SvgComponent;
