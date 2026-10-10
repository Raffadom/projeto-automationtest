describe('Login', () => {
  const user = Cypress.env('user_name')
  const password = Cypress.env('user_password')
  const value_login = 'input[value="Login"]'
  beforeEach(() => {
    cy.visit('/my-account/')
    cy.title().should('be.equal', 'My Account – Automation Practice Site')
  })
  it('realiza login com username e password válidos', () => {
    cy.gui_login()
  })
  context('login errors', () => {
    const invalid_user = 'douglas@vitor.com'
    const invalid_password = '@DougFanny123'

    it('realiza login com username inválido e password inválido', () => {
      cy.get('#username').type(invalid_user)
      cy.get('#password').type(invalid_password)
      cy.wait(1000)
      cy.get(value_login).click()
      cy.contains('Error: A user could not be found with this email address.')
        .should('be.visible')
    })
    it('realiza login com username válido e campo password vazio', () => {
      cy.get('#username').type(user, { log: false})
      cy.wait(1000)
      cy.get(value_login)
        .should('be.visible')
        .click()
      cy.contains('Error: Password is required.')
        .should('be.visible')
    })
    it('realiza login com o campo username vazio e password válido', () => {
      cy.get('#password').type(password, { log: false })
      cy.wait(1000)
      cy.get(value_login)
        .should('be.visible')
        .click()
      cy.contains('Error: Username is required.')
        .should('be.visible')
    })
    it('realiza login com o campo username vazio e password vazio', () => {
      cy.wait(1000)
      cy.get(value_login)
        .should('be.visible')
        .click()
      cy.contains('Error: Username is required.')
        .should('be.visible')
    })
  })
  context('especial cases', () => {
    const changed_user = Cypress.env('changed_user_name')
    const changed_password = Cypress.env('changed_password')
    const fake_password = '@FlaSiFu2023'

    it('a password da página de login deve estar mascarada com asteriscos', () => {
      cy.get('#password').type(fake_password)
      cy.get('#password')
        .should('have.attr', 'type', 'password')
    })
    it('os campos password e username devem diferenciar maiúsculo e minúsculo', () => {
      cy.get('#username').type(changed_user, { log: false })
      cy.get('#password').type(changed_password, { log: false })
      cy.wait(1000)
      cy.get(value_login)
        .should('be.visible')
        .click()
      cy.contains('Error: The password you entered for the username Raffa@san.com is incorrect. Lost your password?')
        .should('be.visible')
    })
    it('realiza login e logout com sucesso e verifica que ao clicar em "voltar" no navegador, não deve estar logado', () => {
      cy.gui_login()
      cy.wait(2000)
      cy.contains('a', 'Sign out')
        .should('be.visible')
        .click()
      cy.wait(2000)
      cy.go('back')
      cy.get('input[name="login"]')
        .should('be.visible')
    })
  })
})
