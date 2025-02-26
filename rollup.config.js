import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import fs from 'fs';

// Read package.json
const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

// Check if we're building only bundled versions
const isBundledOnly = process.env.BUILD === 'bundled';

// Base configurations
const standardBuilds = [
  // UMD build for browsers - dependencies NOT bundled
  {
    input: 'src/index.js',
    output: {
      name: 'EntityDB',
      file: pkg.browser,
      format: 'umd',
      exports: 'named',
      globals: {
        'idb': 'idb',
        '@xenova/transformers': 'transformers'
      }
    },
    plugins: [
      resolve({
        browser: true
      }),
      commonjs(),
      terser()
    ],
    external: ['@xenova/transformers', 'idb']
  },
  
  // CommonJS and ES module builds - dependencies NOT bundled
  {
    input: 'src/index.js',
    output: [
      { 
        file: pkg.main, 
        format: 'cjs',
        exports: 'named'
      },
      { 
        file: pkg.module, 
        format: 'es' 
      }
    ],
    plugins: [
      resolve(),
      commonjs()
    ],
    external: ['@xenova/transformers', 'idb']
  }
];

const bundledBuilds = [
  // Fully bundled version with all dependencies included
  {
    input: 'src/index.js',
    output: {
      name: 'EntityDB',
      file: pkg.bundled,
      format: 'umd',
      exports: 'named'
    },
    plugins: [
      resolve({
        browser: true,
        preferBuiltins: false
      }),
      commonjs(),
      terser()
    ]
  },
  
  // ES module fully bundled
  {
    input: 'src/index.js',
    output: {
      file: pkg.bundledEsm,
      format: 'es'
    },
    plugins: [
      resolve({
        browser: true,
        preferBuiltins: false
      }),
      commonjs(),
      terser()
    ]
  }
];

// Export based on environment
export default isBundledOnly ? bundledBuilds : [...standardBuilds, ...bundledBuilds];