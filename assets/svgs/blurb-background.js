import * as React from 'react';
import { Dimensions } from 'react-native';
import Svg, {
   Circle, Path, Mask, G,
} from 'react-native-svg';

const { width } = Dimensions.get('window');

export default function (props) {
   return (
      <Svg width={width} height={width} viewBox="0 0 375 375" fill="none" {...props}>
         <Circle
            r={187.5}
            transform="matrix(1 0 0 -1 187.5 187.5)"
            fill="#FF7933"
         />
         <Path fill="#FF7933" d="M188 375h187V188H188z" />
         <Path fill="#DB3500" d="M0 375h187.5V187.5H0z" />
         <Path fill="#FF7933" d="M0 188h188V1H0z" />
         <Mask
            id="prefix__a"
            maskUnits="userSpaceOnUse"
            x={187}
            y={186}
            width={188}
            height={189}
         >
            <Path
               transform="rotate(-180 374.5 374.5)"
               fill="#FF9A66"
               d="M374.5 374.5h187v188h-187z"
            />
         </Mask>
         <G mask="url(#prefix__a)">
            <Circle
               cx={186.5}
               cy={186.5}
               r={188}
               transform="rotate(-180 186.5 186.5)"
               fill="#FF9A66"
            />
         </G>
         <Path d="M.5 188H188V.5L.5 188z" fill="#DB3500" />
      </Svg>
   );
}
