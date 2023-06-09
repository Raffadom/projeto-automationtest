describe('Register a User', () => {
  it('registra uma nova conta com sucesso', () => {
    cy.step('preenche os campos obrigatórios de registro e submete')
    cy.fillMandatoryFieldsAndRegister()
    cy.step('verifica que o usuário registrado está logado')
    cy.contains('a', 'Dashboard').should('be.visible')
  })
  context('register errors', () => {
    const user = Cypress.env('user_name')
    const password = Cypress.env('user_password')
    const existing_email = Cypress.env('user_email_existing')

    beforeEach(() => {
      cy.section('Pré-condições dos testes')
      cy.step('visita a aplicação em teste')
      cy.visit('/my-account/')
      cy.step('verifica que o título está correto')
      cy.title().should('be.equal', 'My Account – Automation Practice Site')
      cy.section('fim das pré-condições')
    })
    it('registra com um email já existente', () => {
      cy.step('preenche o campo "Email address" com e-mail já registrado')
      cy.get('#reg_email').type(existing_email)
      cy.step('preenche o campo "Password" com senha válida')
      cy.get('#reg_password').type(password, { log: false })
      cy.step('aguarda por 5 segundos')
      cy.wait(5000)
      cy.step('clica no botão "Register"')
      cy.get('input[value="Register"]').click({ force: true })
      cy.step('verifica que a mensagem de erro esta correta e visível')
      cy.contains('Error: An account is already registered with your email address. Please login.')
        .should('be.visible')
    })
    it('registra com o campo "Email-id" vazio', () => {
      cy.step('preenche com o campo "Email address" vazio e o campo "Password" com senha válida')
      cy.get('#reg_password').type(password, { log: false })
      cy.step('aguarda por 5 segundos')
      cy.wait(5000)
      cy.step('clica no botão "Register"')
      cy.get('input[value="Register"]').click({ force: true })
      cy.step('verifica que a mensagem de erro esta correta e visível')
      cy.contains('Error: Please provide a valid email address.')
        .should('be.visible')
    })
    it('registra com o campo "Password" vazio', () => {
      cy.step('preenche o campo "Email address" com e-mail válido e deixa o campo "Password" vazio')
      cy.get('#reg_email').type(user, { log: false })
      cy.step('aguarda por 5 segundos')
      cy.wait(5000)
      cy.step('clica no botão "Register"')
      cy.get('input[value="Register"]').click({ force: true })
      cy.step('verifica que a mensagem de erro esta correta e visível')
      cy.contains('Error: An account is already registered with your email address. Please login.')
        .should('be.visible')
    })
    it('registra com os campos "Email-id" e "Password" vazios', () => {
      cy.step('clica no botão "Register"com os campos vazios')
      cy.get('input[value="Register"]').click({ force: true })
      cy.step('verifica que a mensagem de erro esta correta e visível')
      cy.contains('Error: Please provide a valid email address.')
        .should('be.visible')
    })
  })
})
