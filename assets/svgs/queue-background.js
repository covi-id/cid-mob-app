import * as React from 'react';
import { Dimensions } from 'react-native';
import Svg, {
   Path,
} from 'react-native-svg';

const { width } = Dimensions.get('window');

export default function (props) {
   return (
      <Svg width={width} height={width * 1.49} viewBox="0 0 375 559" fill="none" {...props}>
         <Path
            d="M375 185H188L375 0v185zM188 372v187h187V372H188zM188 185v187h187V185H188z"
            fill="#40D8FF"
         />
         <Path
            d="M375.56 559H187.981l132.684-132.274C286.793 392.959 239.84 372 187.981 372 84.264 372 .401 455.836.401 559H375.56z"
            fill="#00CBFF"
         />
         <Path
            d="M375.561 558.6V372.223l-55.022 54.776c33.949 33.654 55.022 80.307 55.022 131.601z"
            fill="#80E5FF"
         />
         <Path
            d="M375.561 559.001c0-51.647-21.047-98.408-54.955-132.142L187.78 559.001h187.781z"
            fill="#BFF2FF"
         />
      </Svg>
   );
}
