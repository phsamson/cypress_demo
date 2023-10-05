const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.uniqlo.com/ph/en/',
    specPattern: 'cypress/integration/*.spec.js',
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports/mochawesome',
      overwrite: false
    }
  },
});
