import * as React from 'react';
import { Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');

export default function (props) {
  return (
    <Svg width={width} height={width} viewBox="0 0 375 374" fill="none" {...props}>
      <Path d="M374.5 0H187v187h187.5V0z" fill="#2E0382" />
      <Path
        d="M375 186.003H187.5L320 54.355C286.143 20.768 239.337 0 187.5 0 83.826 0 0 83.388 0 186.003h375z"
        fill="#340099"
      />
      <Path d="M375 187V0l-55 54.355C353.976 87.87 375 135.918 375 187z" fill="#27066B" />
      <Path d="M375 187.001c0-51.566-21.016-98.965-55-132.645L187 187h188z" fill="#2E0382" />
      <Path d="M187.5 0H0v187h187.5V0z" fill="#340099" />
      <Path d="M374.5 374H187V187h187.5v187z" fill="#210854" />
      <Path
        d="M375 187.997H187.5L320 319.645C286.143 353.232 239.337 374 187.5 374 83.826 374 0 290.612 0 187.997h375z"
        fill="#27066B"
      />
      <Path d="M375 187v187l-55-54.355c33.976-33.515 55-81.563 55-132.645z" fill="#210854" />
      <Path d="M375 186.999c0 51.566-21.016 98.965-55 132.646L187 186.999h188z" fill="#2E0382" />
      <Path d="M187.5 374H0V187h187.5v187z" fill="#2E0382" />
    </Svg>
  );
}
