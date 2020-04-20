import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function (props) {
   return (
      <Svg
         width={props.theme.sizes.headingImage}
         height={props.theme.sizes.headingImage}
         viewBox="0 0 84 84"
         fill="none"
         {...props}
      >
         <Path
            d="M30.268 46.907a6.617 6.617 0 016.387-4.905h9a6.57 6.57 0 016.36 4.905l4.026 15.375c1.096 4.182-2.07
            8.28-6.397 8.28H32.502c-4.327 0-7.47-4.098-6.35-8.28l4.116-15.374zM50.373 22.682c-.014 5.105-4.164
            9.242-9.269 9.242a9.21 9.21 0 01-9.215-9.242c.014-5.104 4.164-9.242 9.269-9.242a9.21 9.21 0 019.215 9.242z"
            stroke={props.theme.colors.textSecondary}
            strokeWidth={3.36}
         />
      </Svg>
   );
}
