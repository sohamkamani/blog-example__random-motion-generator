import npm from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

export default {
  input: 'scripts/index.js',
  output: {
    file: 'bundle.js',
    format: 'iife'
  },
  sourceMap: true,
  plugins: [
    npm({
      jsnext: true,
      main: true,
      browser: true
    }),
    commonjs({
      // search for files other than .js files (must already
      // be transpiled by a previous plugin!)
      // include: 'node_modules/**',
      extensions: ['.js', '.coffee'] // defaults to [ '.js' ]
    })
  ]
}
