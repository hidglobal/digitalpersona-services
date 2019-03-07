const dataFiles = [
  'data/**/*'
].map(pattern => ({
  pattern,
  watched: false,
  included: false,
  served: true,
  nocache: false
}))

let exclude = (
  process.env.UUT
    ? [
      , 'auth'
      , 'policy'
      , 'secrets'
      , 'claims'
      , 'admin'
      , 'enroll'
      ]
    : []
  )
    .filter(ex => ex !== process.env.UUT)
    .map(ex => `test/tests/${ex}/*.ts`)


exclude = exclude.concat(
  process.env.EXCLUDE_UNCOMPRESSED
    ? ['**/*.uncompressed.test.ts']
    : []
)

// exclude nodejs tests
exclude = exclude.concat(['**/*.node.test.ts'])


module.exports = function(config) {
  const args = []

  config.set({
    frameworks: ['jasmine', 'karma-typescript'],
    files: [
      'src/**/*.ts',
      'test/**/*.ts'
    ].concat(dataFiles),
    exclude,
    preprocessors: {
      '**/*.ts': ['karma-typescript']
    },
    karmaTypescriptConfig: {
      tsconfig: 'tsconfig.test.json'
    },
    browsers: ['Chrome'],
    browserNoActivityTimeout: 120000,
    browserDisconnectTolerance: 3,
    browserDisconnectTimeout : 120000,
    captureTimeout: 60000,
    client: {
      jasmine: {
        timeoutInterval: 60000,
        args
      }
    }
  })
}
