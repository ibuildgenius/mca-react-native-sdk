// import { defineConfig } from 'tsup';
// import svgrPlugin from 'esbuild-plugin-svgr';
// // import svgr from 'esbuild-plugin-svgr';
// // import jsx from '@svgr/plugin-jsx';

// export default defineConfig({
//   entry: ['src/index.tsx'],
//   format: ['cjs', 'esm'], // Build for commonJS and ESmodules
//   loader: {
//     // '.svg': 'tsx', // or 'jsx' if you inline the SVGs as JSX in components
//     '.svg': 'file',
//     '.png': 'dataurl',
//   },
//   // esbuildPlugins: [svgr({ svgo: false, plugins: [jsx] })],
//   // esbuildPlugins: [svgrPlugin()],
//   esbuildPlugins: [svgrPlugin({ template })],
//   dts: true, // Generate declaration file (.d.ts)
//   splitting: false,
//   sourcemap: true,
//   clean: true,
//   external: [
//     'react',
//     'react-native',
//     'react-native-svg',
//     'react-native-svg-transformer',
//   ],
// });

// function template(variables: any, { tpl }: any) {
//   return tpl`
//     ${variables.imports};
//     ${variables.interfaces};
//     const ${variables.componentName} = (${variables.props}) => (
//       ${variables.jsx}
//     );
//     ${variables.exports};
//     export const ReactComponent = ${variables.componentName};
//   `;
// }
import { defineConfig } from 'tsup';
import { readFileSync } from 'fs';
import { Plugin } from 'esbuild';
import path from 'path';

const svgToReactComponent = (
  svgContent: string,
  componentName: string
): string => {
  // Basic SVG to React Native component conversion
  return `
import * as React from 'react';
import Svg, { Path, G, Circle, Rect } from 'react-native-svg';
import type { SvgProps } from "react-native-svg";

const ${componentName} = (props: SvgProps) => {
  return ${svgContent.replace(/<svg/, '<Svg').replace(/<\/svg>/, '</Svg>')}
};

export default ${componentName};
`;
};

const svgPlugin: Plugin = {
  name: 'svg-plugin',
  setup(build) {
    build.onLoad({ filter: /\.svg$/ }, async (args) => {
      const svg = readFileSync(args.path, 'utf8');
      const componentName = path
        .basename(args.path, '.svg')
        .split(/[^a-zA-Z0-9]/)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join('');

      // Remove any existing imports or declarations
      const cleanedSvg = svg
        .replace(/^import.*$/gm, '')
        .replace(/^declare.*$/gm, '')
        .replace(/^type.*$/gm, '');

      const componentCode = svgToReactComponent(cleanedSvg, componentName);

      return {
        contents: componentCode,
        loader: 'tsx',
      };
    });
  },
};

export default defineConfig({
  entry: ['src/index.tsx'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  esbuildPlugins: [svgPlugin],
  external: ['react', 'react-native', 'react-native-svg'],
  platform: 'neutral',
  treeshake: true,
});
// import { defineConfig } from 'tsup'
// import svgr from 'esbuild-plugin-svgr'
// import jsx from '@svgr/plugin-jsx';

// export default defineConfig({
//     esbuildPlugins: [svgr({ svgo: false, plugins: [jsx] })],
// });
