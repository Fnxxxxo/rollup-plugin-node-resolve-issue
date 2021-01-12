/**
 * Created by Jaron Long on 2021/1/5
 */
import { Module } from '@nuxt/types'
import path from 'path'

const TrackerModule: Module = function (trackerOptions) {
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    options: {
      trackerOptions
    }
  })
}

export default TrackerModule

// REQUIRED if publishing the module as npm package
module.exports.meta = require('../package.json')
