import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'entrypoints.js',
  output: {
    file: 'bundle.js',
    format: 'umd',
    name: 'bundle'
  },
  plugins: [
    resolve()
  ]
}