// Define a custom Cypress command called "handleUncaughtException."
Cypress.Commands.add('handleUncaughtException', () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })
})