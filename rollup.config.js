// Please modify this file to suit your reproduction

// require plugins here. e.g.
// const beep = require('@rollup/plugin-beep');

module.exports = {
  input: 'input.js',
  output: {
    file: 'output/bundle.js',
    format: 'cjs'
  },
  plugins: [
    // add plugins here e.g.
    // beep()
  ]
};