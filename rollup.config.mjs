// import resolve from '@rollup/plugin-node-resolve';
// import commonjs from '@rollup/plugin-commonjs';
// import typescript from '@rollup/plugin-typescript';
// import dts from 'rollup-plugin-dts';
// import PeerDepsExternalPlugin from 'rollup-plugin-peer-deps-external';  //<--- THIS

// import packageJson from "./package.json" assert {type: 'json'};

// export default [
//     {
//         input: "src/index.ts",
//         external: ["react", "react-native"],
//         output: [
//             {
//                 file: packageJson.main,
//                 format: "cjs",
//                 sourcemap: true,
//             },
//             {
//                 file: packageJson.module,
//                 format: "esm",
//                 sourcemap: true,
//             },
//         ],
//         plugins: [
//             PeerDepsExternalPlugin(),              //<--- THIS
//             resolve(),
//             commonjs(),
//             typescript({ tsconfig: "./tsconfig.json" }),
//         ],
//     },
//     // {
//     //     // input: "dist/esm/types/index.d.ts",
//     //     // output: [{ file: "dist/index.d.ts", format: "esm" }],
//     //     // plugins: [dts()],
//     // },
// ];

// import resolve from '@rollup/plugin-node-resolve';
// import commonjs from '@rollup/plugin-commonjs';
// import typescript from '@rollup/plugin-typescript';
// import dts from 'rollup-plugin-dts';
// import peerDepsExternal from 'rollup-plugin-peer-deps-external';
// import svgr from '@svgr/rollup';
// import url from '@rollup/plugin-url';

// import packageJson from './package.json' assert { type: 'json' };

// export default [
//   {
//     input: 'src/index.tsx', // Main entry point
//     output: [
//       {
//         file: packageJson.main, // CommonJS output
//         format: 'cjs',
//         sourcemap: true,
//       },
//       {
//         file: packageJson.module, // ESM output
//         format: 'esm',
//         sourcemap: true,
//       },
//     ],
//     plugins: [
//       peerDepsExternal(),
//       resolve(),
//       commonjs(),
//       typescript({
//         tsconfig: './tsconfig.json',
//         include: ['src/**/*.ts', 'src/**/*.tsx', 'node_modules/**'], // Include node_modules
//       }),
//       svgr(), // Adds support for importing SVGs as React components
//       url({ include: ['**/*.svg'], limit: 0 }),
//     ],
//   },
//   // Generate TypeScript declarations
//   {
//     input: 'dist/esm/types/index.d.ts',
//     output: [{ file: 'dist/index.d.ts', format: 'esm' }],
//     plugins: [dts()],
//   },
// ];

//////
// import typescript from '@rollup/plugin-typescript';
// import resolve from '@rollup/plugin-node-resolve';
// import commonjs from '@rollup/plugin-commonjs';
// import json from '@rollup/plugin-json';
// import babel from '@rollup/plugin-babel';
// import svg from 'rollup-plugin-svg';
// import { defineConfig } from 'rollup';

// export default defineConfig({
//   input: 'src/index.tsx',
//   output: [
//     {
//       file: 'dist/index.cjs.js',
//       format: 'cjs',
//       sourcemap: true,
//     },
//     {
//       file: 'dist/index.esm.js',
//       format: 'esm',
//       sourcemap: true,
//     },
//   ],
//   external: [
//     'react',
//     'react-native',
//     '@react-navigation/native',
//     '@react-navigation/stack',
//     // Add other external dependencies here
//   ],
//   plugins: [
//     resolve({
//       extensions: ['.js', '.jsx', '.ts', '.tsx', '.svg'],
//     }),
//     commonjs(),
//     json(),
//     svg({
//       // svg files will be converted to React components
//       jsx: true,
//     }),
//     typescript({
//       tsconfig: './tsconfig.json',
//       declaration: true,
//       declarationDir: 'dist',
//     }),
//     babel({
//       babelHelpers: 'bundled',
//       extensions: ['.js', '.jsx', '.ts', '.tsx'],
//       presets: ['@babel/preset-react'],
//     }),
//   ],
// });

//HJERE WORKED

// import typescript from '@rollup/plugin-typescript';
// import resolve from '@rollup/plugin-node-resolve';
// import commonjs from '@rollup/plugin-commonjs';
// import json from '@rollup/plugin-json';
// import babel from '@rollup/plugin-babel';
// import svg from 'rollup-plugin-svg';
// import { defineConfig } from 'rollup';

// export default defineConfig({
//   input: 'src/index.tsx',
//   output: [
//     {
//       file: 'dist/index.cjs.js',
//       format: 'cjs',
//       sourcemap: true,
//     },
//     {
//       file: 'dist/index.esm.js',
//       format: 'esm',
//       sourcemap: true,
//     },
//   ],
//   external: [
//     'react',
//     'react-native',
//     '@react-navigation/native',
//     '@react-navigation/stack',
//     'react-native-image-picker',
//     /node_modules/,
//     // Add any other dependencies that should be treated as external
//   ],
//   plugins: [
//     resolve({
//       extensions: ['.js', '.jsx', '.ts', '.tsx', '.svg'],
//       resolveOnly: [
//         // Only resolve files in your src directory
//         /^(?!.*node_modules).*$/,
//       ],
//     }),
//     commonjs(),
//     json(),
//     svg({
//       jsx: true,
//     }),
//     typescript({
//       tsconfig: './tsconfig.json',
//       declaration: true,
//       declarationDir: 'dist',
//       exclude: ['node_modules/**'],
//     }),
//     babel({
//       babelHelpers: 'bundled',
//       extensions: ['.js', '.jsx', '.ts', '.tsx'],
//       presets: [
//         ['module:react-native-builder-bob/babel-preset', { modules: false }],
//         ['@babel/preset-env', { modules: false }],
//         '@babel/preset-react',
//         '@babel/preset-typescript',
//       ],
//       exclude: 'node_modules/**',
//     }),
//   ],
// });

import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import babel from '@rollup/plugin-babel';
import svg from 'rollup-plugin-svg';
import copy from 'rollup-plugin-copy';
import { defineConfig } from 'rollup';

export default defineConfig({
  input: 'src/index.tsx',
  output: [
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
    },
  ],
  external: [
    'react',
    'react-native',
    '@react-navigation/native',
    '@react-navigation/stack',
    'react-native-image-picker',
    /node_modules/,
  ],
  plugins: [
    resolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.svg'],
      resolveOnly: [/^(?!.*node_modules).*$/],
    }),
    commonjs(),
    json(),
    svg({
      jsx: true,
    }),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: 'dist',
      exclude: ['node_modules/**'],
    }),
    babel({
      babelHelpers: 'bundled',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      presets: [
        ['module:react-native-builder-bob/babel-preset', { modules: false }],
        ['@babel/preset-env', { modules: false }],
        '@babel/preset-react',
        '@babel/preset-typescript',
      ],
      exclude: 'node_modules/**',
    }),
    copy({
      targets: [
        {
          src: 'src/assets/**/*',
          dest: 'dist/assets',
        },
      ],
      flatten: false,
    }),
  ],
});
