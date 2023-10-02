const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.uniqlo.com/ph/en/',
    specPattern: "cypress/integration/*.spec.js"
  },
});
