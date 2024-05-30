const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: 'us5c1r',
  e2e: {
    baseUrl: 'https://practice.automationtesting.in/',
    env: {
      hideCredentials: true,
      requestMode: true
    },
    experimentalRunAllSpecs: true
  },
  fixturesFolder: false,
  video: false
})
