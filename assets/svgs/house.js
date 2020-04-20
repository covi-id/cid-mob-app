import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function (props) {
   return (
      <Svg
         width={props.theme.sizes.headingImage}
         height={props.theme.sizes.headingImage}
         viewBox="0 0 83 38"
         fill="none"
         {...props}
      >
         <Path
            stroke="#ACACB5"
            strokeWidth={3.36}
            d="M8.623 19.092h51.189v16.511H8.623zM74.689 2.2H60.197v33.4h14.492zM30.24 2.2h45.623M0 35.799h82.32"
         />
         <Path
            stroke="#ACACB5"
            strokeWidth={1.68}
            d="M18.395 23.117h42.158v13.521H18.395zM63.919 6.229h6.75v21.966h-6.75z"
         />
         <Path stroke="#ACACB5" strokeWidth={3.36} d="M34.41 3.498v13.91" />

      </Svg>
   );
}
