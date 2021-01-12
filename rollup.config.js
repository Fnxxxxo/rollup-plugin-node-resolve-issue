/**
 * Created by Jaron Long on 2019/10/21
 */
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import typescript from 'rollup-plugin-typescript2'
import json from '@rollup/plugin-json'
import { terser } from 'rollup-plugin-terser'
import analyze from 'rollup-plugin-analyzer'
import externals from 'rollup-plugin-peer-deps-external'
import copy from 'rollup-plugin-copy'

const libraryName = 'ScrmTracker'

function entry(input, output) {
  return {
    input,
    output,
    // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
    external: ['window', 'document'],
    watch: {
      include: 'src/**'
    },
    preserveSymlinks: true,
    plugins: [
      // Allow json resolution
      json(),
      externals(),
      // Compile TypeScript files
      typescript({
        verbosity: 2,
        tsconfigDefaults: {
          extendedDiagnostics: process.env.NODE_ENV === 'production'
        },
        useTsconfigDeclarationDir: true,
        clean: process.env.NODE_ENV === 'production'
      }),
      // Allow node_modules resolution, so you can use 'external' to control
      // which external modules to include in the bundle
      // https://github.com/rollup/rollup-plugin-node-resolve#usage
      resolve({
        mainFields: ['browser']
      }),
      // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
      commonjs(),
      copy({
        targets: [
          { src: 'src/plugin.js', dest: 'dist' }
        ]
      }),

      // Resolve source maps to the original source
      sourceMaps()
    ].concat(process.env.NODE_ENV === 'production'
      ? [
        // Minify
        terser(),
        analyze({
          summaryOnly: true
        })
      ]
      : [])
  }
}

export default [
  entry('src/index.ts', [
    {
      dir: 'dist',
      name: libraryName,
      format: 'cjs',
      chunkFileNames: 'bundle/chunk.[format].[hash].js',
      entryFileNames: '[name].[format].js',
      sourcemap: process.env.NODE_ENV === 'production'
    },
    {
      dir: 'dist',
      format: 'es',
      chunkFileNames: 'bundle/chunk.[format].[hash].js',
      entryFileNames: '[name].[format].js',
      sourcemap: process.env.NODE_ENV === 'production'
    }
  ]),
  entry('src/module.ts', [
    {
      dir: 'dist',
      format: 'es',
      chunkFileNames: 'bundle/chunk.[format].[hash].js',
      entryFileNames: '[name].js',
      sourcemap: process.env.NODE_ENV === 'production'
    }
  ])
]

