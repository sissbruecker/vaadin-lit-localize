import resolve from 'rollup-plugin-node-resolve';

export default [
  // Bundle containing shims required to get jsdom to parse the web components sources
  {
    input: 'shims.js',
    output: {
      file: 'shims.bundle.js',
      format: 'umd',
      name: 'shims'
    },
    plugins: [
      resolve()
    ]
  },
  // Bundle containing the web components sources for loading into jsdom env
  {
    input: 'components.js',
    output: {
      file: 'components.bundle.js',
      format: 'umd',
      name: 'components'
    },
    plugins: [
      resolve()
    ]
  }
]