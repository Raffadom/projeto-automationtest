const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://practice.automationtesting.in/',
    env: {
      hideCredentials: true,
      requestMode: true
    },
    experimentalRunAllSpecs: true
  },
  fixturesFolder: false,
  video: true
})
