describe('Login Page', () => {
    beforeEach(() => {
        cy.handleUncaughtException()
        cy.visit('/')
        cy.viewport(1366,786)
    })
    describe('Login Functionality', () => {
        it('should log in successfully using correct email address and password', () => {
            cy.get('.fr-header-button.account a[title="Login"]').click()
            cy.fixture('test-data.json').then((data) => {
                cy.get('input[type="email"]').type(data.correctemail)
                cy.get('input[type="password"]').type(data.correctpassword)
            })
            cy.contains('a[data-test="login-button"]', 'Log in').click()
            cy.get('[role="listbox"][aria-labelledby="downshift-1-label"]').should('exist')
        })
    
        it('should NOT log in successfully using incorrect email address and correct password', () => {
            cy.get('.fr-header-button.account a[title="Login"]').click()
            cy.fixture('test-data.json').then((data) => {
                cy.get('input[type="email"]').type(data.incorrectemail)
                cy.get('input[type="password"]').type(data.correctpassword)
            })
            cy.contains('a[data-test="login-button"]', 'Log in').click()
            cy.contains('Sorry, this does not match our records. Check the spelling and try again.').should('exist')
        })
    
        it('should NOT log in successfully using correct email address and incorrect password', () => {
            cy.get('.fr-header-button.account a[title="Login"]').click()
            cy.fixture('test-data.json').then((data) => {
                cy.get('input[type="email"]').type(data.correctemail)
                cy.get('input[type="password"]').type(data.incorrectpassword)
            })
            cy.contains('a[data-test="login-button"]', 'Log in').click()
            cy.contains('Sorry, this does not match our records. Check the spelling and try again.').should('exist')
        })
    
        it.only('should NOT log in successfully using incorrect email address and password', () => {
            cy.get('.fr-header-button.account a[title="Login"]').click()
            cy.fixture('test-data.json').then((data) => {
                cy.get('input[type="email"]').type(data.incorrectemail)
                cy.get('input[type="password"]').type(data.incorrectpassword)
            })
            cy.contains('a[data-test="login-button"]', 'Log in').click()
            cy.contains('Sorry, this does not match our records. Check the spelling and try again.').should('exist')
        })

    })

    describe('Show and Hide Password Functionality', () => {
        it('should show and hide the password', () => {
            cy.get('.fr-header-button.account a[title="Login"]').click()
            cy.fixture('test-data.json').then((data) => {
                cy.get('input[type="email"]').type(data.incorrectemail)
                cy.get('input[type="password"]').type(data.correctpassword)
            })
            cy.get('label[for="fr-checkbox-1"]').click()
            cy.get('.fr-textfield-input.js-input-password').should(
                'have.attr',
                'type',
                'text')
            cy.get('label[for="fr-checkbox-1"]').click()
            cy.get('.fr-textfield-input.js-input-password').should(
                'have.attr',
                'type',
                'password')
        })
    })
<<<<<<< HEAD
=======

    describe('Terms of Use link', () => {
        it.only('should be redirected to the Terms of Use page', () => {
            cy.get('.fr-header-button.account a[title="Login"]').click()
            cy.contains('.text', 'Terms of use').click()
            cy.window().its('length').should('be.gt', 1);
            cy.url().should('have', 'https://faq-ph.uniqlo.com/articles/en_US/FAQ/Terms-of-use/')
        })
    })
>>>>>>> parent of ab15515 (Revert "Revert "Update login.spec.js"")
})