import { faker } from '@faker-js/faker'
Cypress.Commands.add('gui_login', (
  user = Cypress.env('user_name'),
  password = Cypress.env('user_password')
) => {
  cy.visit('/my-account/')

  cy.get('#username').type(user, { log: false })
  cy.get('#password').type(password, { log: false })
  cy.get('input[value="Login"]').click()
  cy.contains('p', 'raffa')
    .should('be.visible')
})

Cypress.Commands.add('fillMandatoryFieldsAndRegister', function (fieldsVals = {}) {
  const raffa = {
    name: `raffa@${faker.datatype.uuid()}.com.br`,
    description: faker.random.words(1)
  }
  const {
    password = Cypress.env('user_password')
  } = fieldsVals
  cy.visit('/')
  cy.get('#menu-icon').click()
  cy.contains('My Account').click()

  cy.get('#reg_email').type(raffa.name)
  cy.get('#reg_password').type(password, { log: false })
  //cy.wait(5000)

  cy.get('input[value="Register"]').click({ force: true })
})

Cypress.Commands.add('camposObrigatoriosEmCheckout', function (fieldsValsCheckout = {}) {
  const {
    email_checkout = Cypress.env('user_email_checkout'),
    address_checkout = Cypress.env('user_address_checkout'),
    city_checkout = Cypress.env('user_city_checkout'),
    zip_code_checkout = Cypress.env('user_zipcode_checkout')
  } =
     fieldsValsCheckout
  cy.visit('/checkout/')
  cy.get('#billing_first_name').type('Manoel')
  cy.get('#billing_last_name').type('Santos')
  cy.get('#billing_email').type(email_checkout)
  cy.get('#billing_phone').type('7399999999')
  cy.get('#select2-chosen-1')
    .should('be.visible')
    .click()
  cy.get('#select2-result-label-35')
    .click()
  cy.get('#billing_address_1')
    .should('be.visible')
    .click()
    .type(address_checkout)
  cy.get('#billing_city')
    .should('be.visible')
    .click()
    .type(city_checkout)
  cy.get('#select2-chosen-2')
    .should('be.visible')
    .click()
  cy.get('#select2-result-label-276')
    .click()
  cy.get('#billing_postcode')
    .should('be.visible')
    .click()
    .type(zip_code_checkout)
})
Cypress.Commands.add('proceedToCheckout', () => {
  cy.visit('/basket/')
  cy.contains('a', 'Proceed to Checkout')
    .should('be.visible')
    .click()
  cy.url()
    .should('be.equal', `${Cypress.config('baseUrl')}checkout/`)
})
Cypress.Commands.add('camposObrigatoriosEmCheckoutIndia', function (fieldsValsCheckoutIndia = {}) {
  const {
    email_checkout = Cypress.env('user_email_checkout'),
    address_checkout = Cypress.env('user_address_checkout'),
    city_checkout = Cypress.env('user_city_chechout_india'),
    zip_code_checkout = Cypress.env('user_zipcode_checkout_india')
  } =
       fieldsValsCheckoutIndia
  cy.visit('/checkout/')
  cy.get('#billing_first_name').type('Manoel')
  cy.get('#billing_last_name').type('Santos')
  cy.get('#billing_email').type(email_checkout)
  cy.get('#billing_phone').type('7399999999')
  cy.get('#select2-chosen-1')
    .should('be.visible')
    .click()
  cy.get('#select2-result-label-105')
    .click()
  cy.get('#billing_address_1')
    .should('be.visible')
    .click()
    .type(address_checkout)
  cy.get('#billing_city')
    .should('be.visible')
    .click()
    .type(city_checkout)
  cy.get('#select2-chosen-2')
    .should('be.visible')
    .click()
  cy.get('#select2-result-label-285')
    .click()
  cy.get('#billing_postcode')
    .should('be.visible')
    .click()
    .type(zip_code_checkout)
})
Cypress.Commands.add('camposObrigatoriosEmCheckoutLogado', function (fieldsValsCheckoutLogado = {}) {
  const {
    user_chechout_logado = Cypress.env('user_name'),
    address_checkout = Cypress.env('user_address_checkout'),
    city_checkout = Cypress.env('user_city_checkout'),
    zip_code_checkout = Cypress.env('user_zipcode_checkout')
  } =
     fieldsValsCheckoutLogado
  cy.visit('/checkout/')
  cy.get('#billing_first_name').clear().type('Rafael')
  cy.get('#billing_last_name').clear().type('Santos')
  cy.get('#billing_email').clear().type(user_chechout_logado, { log: false })
  cy.get('#billing_phone').clear().type('7399999999')
  cy.get('#select2-chosen-1')
    .should('be.visible')
    .click()
  cy.get('#select2-result-label-35')
    .click()
  cy.get('#billing_address_1')
    .should('be.visible')
    .click()
    .clear()
    .type(address_checkout)
  cy.get('#billing_city')
    .should('be.visible')
    .click()
    .clear()
    .type(city_checkout)
  cy.get('#select2-chosen-2')
    .should('be.visible')
    .click()
  cy.get('#select2-result-label-276')
    .click()
  cy.get('#billing_postcode')
    .should('be.visible')
    .click()
    .clear()
    .type(zip_code_checkout)
  cy.get('#payment_method_bacs')
    .should('be.visible')
  cy.wait(3000)
  cy.get('#place_order')
    .should('be.visible')
    .click()
  cy.get('.woocommerce-thankyou-order-received')
    .should('be.visible')
})
Cypress.Commands.add('realizaCompraLogado', () => {
  cy.get('#menu-icon')
    .should('be.visible')
    .click()
  cy.contains('a', 'Shop')
    .should('be.visible')
    .click()
  cy.contains('a', 'Add to basket')
    .should('be.visible')
    .click()
  cy.wait(3000)
  cy.contains('a', 'View Basket')
    .should('be.visible')
    .click()
})
Cypress.Commands.add('removeTodosOsItens', () => {
  cy.get('#menu-icon')
    .should('be.visible')
    .click()
  cy.contains('a', 'Start shopping')
    .should('be.visible')
    .click()
  cy.contains('a', 'remove')
    .should('be.visible')
    .click()
  cy.get('#menu-icon')
    .should('be.visible')
    .click()
  cy.contains('a', 'My Account')
    .should('be.visible')
    .click()
})
