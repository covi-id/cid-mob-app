import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function (props) {
   return (
      <Svg width={16} height={22} viewBox="0 0 16 22" fill="none" {...props}>
         <Path
            d="M14.579 6.812v.002c.232 2.121-.527 4.178-2.057 5.677-.957.921-1.648 2.031-1.856 3.155l-.01.052V19.779h-.609l-.174.233-.647.863-.006.008-.005.008a.818.818 0 01-.676.328H7.461c-.268 0-.502-.116-.693-.352l-.641-.855-.174-.233h-.61V15.688l-.013-.063c-.244-1.098-.885-2.204-1.854-3.136h-.001a6.816 6.816 0 01-2.054-5.675v-.001c.33-3.102 2.833-5.62 5.933-5.998a4.806 4.806 0 00.337-.02C7.804.786 7.901.78 8 .78c.1 0 .196.007.309.016l.019.002c.094.007.206.016.322.018 3.093.343 5.599 2.857 5.929 5.997z"
            fill="#0D98E6"
            stroke="#fff"
            strokeWidth={1.16}
         />
         <Path
            d="M9.2 16.4V9.88m0 0h1.2c.66 0 1.2-.558 1.2-1.24 0-.682-.54-1.24-1.2-1.24-.66 0-1.2.558-1.2 1.24v.992m0 .248H6.8M6.8 16.4V9.88H5.6c-.66 0-1.2-.558-1.2-1.24 0-.682.54-1.24 1.2-1.24.66 0 1.2.558 1.2 1.24v.992"
            stroke="#fff"
            strokeWidth={0.58}
         />
         <Path d="M10.4 18.82H5.6v1.16h4.8v-1.16z" fill="#fff" />
         <Path d="M5 16.4h6" stroke="#fff" strokeWidth={0.58} />
      </Svg>
   );
}