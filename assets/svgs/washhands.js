import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function (props) {
   return (
      <Svg width={35} height={28} viewBox="0 0 35 28" fill="none" {...props}>
         <Path
            d="M.86 13.118h5.161v13.763H.861V13.118z"
            stroke="#1A0B3D"
            strokeWidth={1.72}
         />
         <Path
            d="M20.076 18.78v-1.888a2.58 2.58 0 00-2.184-2.55l-7.535-1.171c-.58-.09-1.172.02-1.68.311l-1.36.78A2.58 2.58 0 006.021 16.5v6.941a2.58 2.58 0 002.58 2.58h10.33a2.58 2.58 0 001.26-.329l12.418-6.954a1.814 1.814 0 00.68-2.496v0a1.814 1.814 0 00-2.09-.823l-11.123 3.36zm0 0h-7.312"
            stroke="#1A0B3D"
            strokeWidth={1.72}
         />
         <Path
            d="M22.528 1.662a.996.996 0 011.782.03l2 4.17c1.054 2.195-.547 4.738-2.982 4.738-2.482 0-4.08-2.633-2.934-4.835l2.134-4.103z"
            stroke="#1A0B3D"
            strokeWidth={0.8}
         />
      </Svg>
   );
}
