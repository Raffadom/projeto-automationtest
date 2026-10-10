const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: 'us5c1r',
  e2e: {
    baseUrl: 'https://practice.automationtesting.in/',
    env: {
      hideCredentials: true,
      requestMode: true
    },
    experimentalRunAllSpecs: true,
    experimentalMemoryManagement: true,
    numTestsKeptInMemory: 1,
    setupNodeEvents(on, config) {
      // ...existing code...
    },
    browser: 'chrome',
    chromeWebSecurity: false,
    args: ['--disable-gpu', '--no-sandbox']
  },
  fixturesFolder: false,
  video: false
})
