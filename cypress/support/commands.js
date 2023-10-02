// Define a custom Cypress command called "handleUncaughtException."
Cypress.Commands.add('handleUncaughtException', () => {
    // Register a callback function to handle uncaught exceptions.
    Cypress.on('uncaught:exception', (err, runnable) => {
      // Check if the error message contains the text "window.twq is not a function."
      if (err.message.includes('window.twq is not a function')) {
        // If the error message matches, prevent Cypress from failing the test.
        // Instead, return false to indicate that we've handled this specific error.
        return false;
      }
      // For all other errors, allow Cypress to handle them as usual.
      return true;
    });
  });