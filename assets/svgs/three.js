import * as React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Heading } from '../../components';

export default function (props) {
   return (
      <View>
         <Svg width={43} height={42} viewBox="0 0 43 42" fill="none" {...props}>
            <Path
               fillRule="evenodd"
               clipRule="evenodd"
               d="M21.186 41.82c11.548 0 20.91-9.362 20.91-20.91v-.031.032h-20.91V0h.204L21.186
            0C9.638 0 .276 9.362.276 20.91s9.362 20.91 20.91 20.91z"
               fill="#FFF9BF"
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
            03
         </Heading>
      </View>
   );
}
