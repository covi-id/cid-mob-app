import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function (props) {
   return (
      <Svg width={159} height={237} viewBox="0 0 159 237" fill="none" {...props}>
         <Path d="M159.083 0H1.429v157.709h157.654V0z" fill="#6740B3" />
         <Path
            d="M158.989.242H.66C44.378.242 84.25 17.607 113 46L158.989.242z"
            fill="#27066B"
         />
         <Path
            d="M113 46C84.234 17.422 45.01.112 1.27.112v157.376L113 46z"
            fill="#2E0382"
         />
         <Path
            d="M159.236 157.742C159.17 117.124 143.92 76.931 113 46L1.27 157.488l157.966.254z"
            fill="#340099"
         />
         <Path d="M1.27 157.488l157.813 157.813V157.488H1.269z" fill="#340099" />
      </Svg>
   );
}
