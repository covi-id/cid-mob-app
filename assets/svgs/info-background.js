import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function (props) {
   return (
      <Svg width={315} height={157} viewBox="0 0 315 157" fill="none" {...props}>
         <Path
            d="M157.5 157.5V0C70.522 0 0 70.522 0 157.5S70.522 315 157.5 315 315 244.478 315 157.5c0-43.489-17.631-82.668-46.231-111.269L157.5 157.5z"
            fill="#00CBFF"
         />
         <Path
            d="M314.989.242H156.66C200.378.242 240.249 17.607 269 46L314.989.242z"
            fill="#0D98E6"
         />
         <Path
            d="M269 46C240.234 17.422 201.01.112 157.27.112v157.376L269 46z"
            fill="#00CBFF"
         />
         <Path
            d="M315.236 157.742C315.17 117.124 299.92 76.931 269 46L157.27 157.488l157.966.254z"
            fill="#80E5FF"
         />
      </Svg>
   );
}
