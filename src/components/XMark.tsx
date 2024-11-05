import React from 'react';
import Svg, { Path } from 'react-native-svg';

const XMark = () => (
  <Svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <Path
      d="M1.41895 1.23047L11.9011 11.7126"
      stroke="black"
      strokeWidth="1.62043"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M1.41895 11.7126L11.9011 1.23047"
      stroke="black"
      strokeWidth="1.62043"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default XMark;
