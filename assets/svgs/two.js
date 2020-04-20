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
            viewBox="0 0 43 43"
            fill="none"
            {...props}
         >
            <Path
               fillRule="evenodd"
               clipRule="evenodd"
               d="M35.971 7.015L21.246 21.74v20.97h-.06C9.638 42.71.276 33.35.276 21.8.276 10.252
            9.638.89 21.186.89c5.774 0 11.001 2.341 14.785 6.125z"
               fill="#E4D5FF"
            />
         </Svg>
         <Heading style={{
            position: 'absolute',
            right: 0,
            left: 0,
            marginTop: 8,
            fontSize: 20,
         }}
         >
            02
         </Heading>
      </View>
   );
}
