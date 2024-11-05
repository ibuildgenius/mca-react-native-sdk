// declare module '*.svg' {
//   import { SvgProps } from 'react-native-svg';
//   const content: React.FC<SvgProps>;
//   export default content;
// }

// declare module '*.svg' {
//   import React from 'react';
//   import { SvgProps } from 'react-native-svg';
//   const content: React.FC<SvgProps>;
//   export default content;
// }

// declare module '*.svg' {
//   import React from 'react';
//   import { SvgProps } from 'react-native-svg';
//   const content: React.FC<SvgProps>;
//   export default content;
// }
//declarations

// declare module '*.svg' {
//   const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
//   export default content;
// }

// declare module '*.svg' {
//   const content: string;
//   export default content;
// }

declare module '*.svg' {
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.webp' {
  const content: string;
  export default content;
}

///FROM HEREE

// declare module '*.svg' {
//   import React from 'react';

//   interface SvgProps extends React.SVGProps<SVGSVGElement> {
//     width?: number | string;
//     height?: number | string;
//     fill?: string;
//     stroke?: string;
//     style?: React.CSSProperties;
//     className?: string;
//   }

//   const content: React.FC<SvgProps>;
//   export default content;
// }

///TOOO HEREE
// declare module '*.svg' {
//   import React from 'react';
//   import {SvgProps} from 'react-native-svg';
//   import {StyleProp, ViewStyle} from 'react-native';
//   interface SvgStyle extends StyleProp<ViewStyle> {
//     color?: string;
//   }
//   interface SvgViewProps extends SvgProps {
//     style: SvgStyle;
//   }
//   const content: React.FC<SvgViewProps>;
//   export default content;
// }

// declare module '*.svg' {
//   import * as React from 'react';

//   const ReactComponent: React.FunctionComponent<
//     React.SVGProps<SVGSVGElement> & { title?: string }
//   >;

//   export default ReactComponent;
// }

// svgr.d.ts
// declare module '*.svg' {
//   import { ComponentPropsWithRef } from 'react';

//   export default (props: ComponentPropsWithRef<'svg'>) => JSX.Element;
// }
