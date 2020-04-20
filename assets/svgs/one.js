import * as React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Heading } from '../../components';

export default function (props) {
   return (
      <View>
         <Svg
            width={43}
            height={42}
            viewBox="0 0 43 42"
            fill="none"
            {...props}
         >
            <Path
               fillRule="evenodd"
               clipRule="evenodd"
               d="M21.186 41.82h.079-.08V20.91m0 20.91h-.078.079zm0 0h-.078.079zM6.4 35.695A20.844 20.844
            0 01.276 20.91C.276 9.362 9.638 0 21.186 0v20.91L6.4 35.695z"
               fill="#E9FAFF"
            />
         </Svg>
         <Heading style={{
            position: 'absolute',
            right: 0,
            left: 0,
            marginTop: 5,
            fontSize: 20,
         }}
         >
            01
         </Heading>
      </View>
   );
}
