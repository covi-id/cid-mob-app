import * as React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

export default function (props) {
   return (
      <Svg width={34} height={34} viewBox="0 0 34 34" fill="none" {...props}>
         <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M24.975 9.79a3.944 3.944 0 003.203-3.86A3.915 3.915 0 0024.26 2c-1.06 0-2.025.42-2.734 1.104a7.749 7.749 0 00-1.866-.916A5.936 5.936 0 0124.266 0a5.908 5.908 0 015.912 5.93 5.95 5.95 0 01-5.535 5.914 7.803 7.803 0 00.332-2.055zM21.692 16h5.655c.684 0 1.331.467 1.54 1.218l2.396 8.594c.322 1.157-.54 2.188-1.55 2.188H27.55c.19.677.235 1.354.155 2h2.02c2.404 0 4.144-2.363 3.484-4.73l-2.395-8.594C30.373 15.09 28.96 14 27.353 14h-3.696a7.927 7.927 0 01-1.965 2zM12.856 3.105A3.905 3.905 0 0010.128 2a3.943 3.943 0 00-3.94 3.93A3.916 3.916 0 009.37 9.79c.015.712.126 1.401.32 2.054A5.909 5.909 0 014.187 5.93 5.95 5.95 0 0110.134 0c1.856 0 3.51.853 4.594 2.188a7.8 7.8 0 00-1.872.917zM10.716 14H7.067c-1.608 0-3.026 1.091-3.477 2.676L1.145 25.27C.472 27.637 2.198 30 4.601 30h2.022a5.066 5.066 0 01.167-2H4.607c-1.01 0-1.867-1.03-1.538-2.188l2.445-8.594C5.727 16.467 6.378 16 7.06 16h5.63a7.815 7.815 0 01-1.975-2z"
            fill="#1A0B3D"
         />
         <Path
            d="M11.623 20.1c.348-1.297 1.405-2.1 2.51-2.1h6.152c1.105 0 2.157.803 2.497 2.1l.967-.257-.967.256 2.393 9.131c.523 1.993-.877 3.77-2.513 3.77H11.669c-1.636 0-3.026-1.777-2.492-3.77l2.446-9.13zM22.109 9.595a4.946 4.946 0 01-4.944 4.93 4.912 4.912 0 01-4.914-4.93 4.946 4.946 0 014.943-4.929 4.912 4.912 0 014.915 4.93z"
            stroke="#1A0B3D"
            strokeWidth={2}
         />
      </Svg>
   );
}