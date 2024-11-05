// // build.js
const esbuild = require('esbuild');

// esbuild
//   .build({
//     entryPoints: ['src/index.tsx'],
//     bundle: true,
//     outdir: 'dist',
//     platform: 'node', // or 'browser' if building for the browser
//     format: 'esm', // Choose 'esm' or 'cjs' based on your needs
//     loader: {
//       '.svg': 'file', // This handles SVG files
//       '.json': 'json', // This handles JSON files
//     },
//     minify: true,
//     sourcemap: true,
//   })
//   .catch(() => process.exit(1));

esbuild
  .build({
    entryPoints: ['src/index.tsx'],
    bundle: true,
    outdir: 'dist',
    platform: 'node', // or 'browser'
    format: 'esm',
    minify: true,
    sourcemap: true,
    loader: {
      '.js': 'jsx',
      '.ts': 'ts',
      '.tsx': 'tsx',
      '.svg': 'file',
      '.jpg': 'file',
      '.png': 'file',
      '.webp': 'file',
    },
    external: ['react-native'], // Exclude react-native
  })
  .then(() => {
    console.log('Build succeeded');
  })
  .catch((error) => {
    console.error('Build failed:', error);
    process.exit(1); // Exit with error code 1
  });
