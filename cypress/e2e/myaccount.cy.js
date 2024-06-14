describe('My Account', () => {
  const user = Cypress.env('user_name')
  beforeEach(() => {
    cy.section('Pré-condições dos testes')
    cy.step('realiza login')
    cy.sessionLogin()
    cy.step('visita a pagina da minha conta')
    cy.visit('/my-account/')
    cy.section('fim das pré-condições')
  })
  it('logado, o usuário deve visualizar o "Dashboard" do site', () => {
    cy.step('verifica que o "href" é igual a página que contém o "Dashboard"')
    cy.contains('a', 'Dashboard')
      .should('have.attr', 'href', `${Cypress.config('baseUrl')}my-account/`)
  })
  it('logado, o usuário realiza uma compra e deve visualizar seus pedidos clicando no link de pedidos', () => {
    cy.step('adiciona um item à cesta de compras')
    cy.realizaCompraLogado()
    cy.step('clica em proceder para o checkout')
    cy.proceedToCheckout()
    cy.step('preenche os campos obrigatórios e efetua a compra')
    cy.camposObrigatoriosEmCheckoutLogado()
    cy.contains('a', 'Automation Practice Site')
      .should('be.visible')
      .click()
    cy.step('clica o icone do menu')
    cy.get('#menu-icon')
      .should('be.visible')
      .click()
    cy.step('clica em "My account"')
    cy.contains('a', 'My Account')
      .should('be.visible')
      .click()
    cy.step('aguarda 3 segundos')
    cy.wait(3000)
    cy.step('verifica que o "href" é igual a página que contém "Orders"')
    cy.contains('a', 'Orders')
      .should('be.visible')
      .click()
      .should('have.attr', 'href', `${Cypress.config('baseUrl')}my-account/orders/`)
  })
  it('logado, o usuário deve ver os detalhes da compra clicando no botão visualizar em no link "Orders"', () => {
    cy.step('clica no link "Orders"')
    cy.contains('a', 'Orders')
      .should('be.visible')
      .click()
    cy.step('clica no primeiro botão "VIEW" da lista e pedidos')
    cy.get('.button')
      .first()
      .click({ force: true })
    cy.step('verifica que o total (produto e taxas) está visível')
    cy.get('.woocommerce-Price-amount')
      .should('be.visible')
    cy.step('verifica que em "Customer Details" o email está correto e está visível')
    cy.get('.customer_details')
      .should('be.visible')
      .and('contain', user)
  })
  it('logado, o usuário deve visualizar o número do pedido, data e o status ao clicar no botão Exibir', () => {
    cy.step('clica no link "Orders"')
    cy.contains('a', 'Orders')
      .should('be.visible')
      .click()
    cy.step('clica no primeiro botão "VIEW" da lista e pedidos')
    cy.get('.button')
      .first()
      .click({ force: true })
    cy.step('o número do pedido está visivel')
    cy.get('.order-number')
      .should('be.visible')
    cy.step('a data do pedido está visivel')
    cy.get('.order-date')
      .should('be.visible')
    cy.step('o status do pedido está visivel')
    cy.get('.order-status')
      .should('be.visible')
  })
  it('logado, o usuário deve visualizar o endereço de cobrança e o endereço de envio', () => {
    cy.step('clica no link "Addresses"')
    cy.contains('a', 'Addresses')
      .should('be.visible')
      .click()
    cy.step('o endereço de cobrança está visivel')
    cy.get('.u-column1')
      .should('be.visible')
      .and('contain', 'Rafael Santos')
    cy.get('.u-column2')
      .should('be.visible')
      .and('contain', 'Rafael Santos')
  })
  it('logado, o usuário pode editar o endereço de entrega', () => {
    cy.step('clica no link "Addresses"')
    cy.contains('a', 'Addresses')
      .should('be.visible')
      .click()
    cy.step('clica em editar no endereço de entrega')
    cy.get('.u-column2 > .woocommerce-Address-title > .edit')
      .should('be.visible')
      .click()
    cy.step('preenche os campos opcionais em branco')
    cy.get('#shipping_company')
      .should('be.visible')
      .clear()
      .type('P.L.A.N.O')
    cy.get('#shipping_address_2')
      .should('be.visible')
      .clear()
      .type('Apartment')
    cy.step('clica no botão " SAVE ADDRESS"')
    cy.contains('.button', 'Save Address')
      .should('be.visible')
      .click()
    cy.step('verifica que a mensagem "Address changed successfully." está visivel')
    cy.contains('.woocommerce-message', 'Address changed successfully.')
      .should('be.visible')
  })
  it('logado, o usuário pode visualizar os detalhes da conta onde também pode alterar sua senha', () => {
    cy.step('clica no link "Account Details')
    cy.contains('a', 'Account Details')
      .should('be.visible')
      .click()
    cy.step('verifica que o campo "Email address" está preenchido com o email do usuario')
    cy.get('input[value="raffa@san.com"]')
      .should('be.visible')
    cy.step('clica no botão "SAVE CHANGES"')
    cy.contains('.button', 'Save changes')
      .should('be.visible')
      .click()
    cy.step('verifica que a mensagem "Account details changed successfully." esta visivel')
    cy.get('.woocommerce-message')
      .should('be.visible')
  })
  it('logado, ao clicar em Logout, o usuário sai com sucesso do site', () => {
    cy.step('clica no link "Logout"')
    cy.contains('a', 'Logout')
      .should('be.visible')
      .click()
    cy.step('verifica que o usuário foi redirecionado para página de login')
    cy.url()
      .should('be.equal', `${Cypress.config('baseUrl')}my-account/`)
  })
})
