describe('Home Page', () => {
  beforeEach(() => {
    cy.section('Pré-condições dos testes')
    cy.step('visita a aplicação em teste')
    cy.visit('/')
    cy.step('verifica que o título está correto')
    cy.title().should('be.equal', 'Automation Practice Site')
    cy.step('clica no menu')
    cy.get('#menu-icon').should('be.visible').click()
    cy.step('clica no menu "Shop"')
    cy.contains('a', 'Shop').should('be.visible').click()
    cy.step('clica no menu "Home"')
    cy.contains('a', 'Home').should('be.visible').click()
    cy.section('fim das pré-condições')
  })
  it('home page - contém apenas 3 sliders', () => {
    cy.step('verifica que a home page contém apenas tres sliders')
    cy.get('.n2-ss-slide-fill')
      .should('have.length', 3)
  })
  context('Arrivals cases', () => {
    it('a página contém apenas 3 arrivals', ()=> {
      cy.step('verifica que a página contém apenas 3 "Arrivals"')
      cy.get('.attachment-shop_catalog')
        .should('have.length', 3)
    })
    it('home page - imagens em "Arrivals" devem ser navegáveis', () => {
      cy.step('verifica que a imagem "Selenium Ruby" está visivel')
      cy.contains('a', 'Selenium Ruby')
        .should('be.visible')
      cy.step('verifica que o "href" é igual a página onde o usuário pode adicionar o item à cesta')
      cy.contains('a', 'Selenium Ruby')
        .should('have.attr', 'href', `${Cypress.config('baseUrl')}product/selenium-ruby/`)
      cy.step('clica na imagem')
      cy.contains('a', 'Selenium Ruby')
        .should('be.visible')
        .click()
      cy.url()
        .should('be.eq', `${Cypress.config('baseUrl')}product/selenium-ruby/`)
    })
    it('home page - verifica a descrição do item selecionado', () => {
      cy.step('clica na imagem para ser redirecionado à página onde o usuário pode adicionar o item à cesta')
      cy.contains('a', 'Selenium Ruby')
        .should('be.visible')
        .click()
      cy.step('verifica se a descrição do item está visivel')
      cy.get('#tab-description')
        .should('be.visible')
    })
    it('home page - verifica que o item possui um comentário', () => {
      cy.step('clica na imagem para ser redirecionado à página onde o usuário pode adicionar o item à cesta')
      cy.contains('a', 'Selenium Ruby')
        .should('be.visible')
        .click()
      cy.step('marca a guia "Reviews" do livro')
      cy.get('.reviews_tab')
        .should('be.visible')
        .click()
      cy.step('verifica que deve haver um comentario sobre o livro em que o usuário clicou')
      cy.get('.reviews_tab')
        .should('contain', 'Reviews (0)')
      })
      context('Add to basket cases', () => {
        beforeEach(() => {
          cy.step('clica na imagem para ser redirecionado à página onde o usuário pode adicionar o item à cesta')
          cy.contains('a', 'Mastering JavaScript')
            .should('be.visible')
            .click()
          cy.step('adiciona o livro à cesta clicando em "ADD TO BASKET"')
          cy.contains('button', 'Add to basket')
            .should('be.visible')
            .click()
          cy.step('aguarda por 2 segundos')
          cy.wait(2000)
        })
        it('home page - o item no menu contém o preço', () => {
          cy.step('o usuario pode visualizar o item no menu, com o preço')
          cy.get('#menu-icon')
            .should('be.visible')
            .click()
          cy.get('.wpmenucart-contents')
            .should('be.visible')
            .and('contain', '₹350.00')
        })
        it('home page - adiciona mais livros do que existe em estoque', () => {
          cy.step('clica no campo de quantidade de itens e adiciona mais itens do que tem no estoque')
          cy.get('input[type="number"]')
            .should('be.visible')
            .click()
            .clear()
            .type('2600')
          cy.step('clica em "ADD TO BASKET"')
          cy.contains('button', 'Add to basket')
            .should('be.visible')
            .click()         
        })
        it('home page - clica em item no menu e verifica que foi redirecionado para a pagina de checkout ', () => {
          cy.step('clica no menu')
          cy.get('#menu-icon')
            .should('be.visible')
            .click()
          cy.step('clica no menu item para ser redirecionado para a pagina de checkout')
          cy.get('.wpmenucart-contents')
            .should('be.visible')
            .click()
          cy.step('verifica que foi redirecionado para a página de checkout')
          cy.url().should('be.equal', `${Cypress.config('baseUrl')}basket/`)
        })

        context('Cupon Cases', () => {
          beforeEach(() => {
            cy.step('clica no menu')
            cy.get('#menu-icon')
              .should('be.visible')
              .click()
            cy.step('clica no menu item para ser redirecionado para a pagina de checkout')
            cy.get('.wpmenucart-contents')
              .should('be.visible')
              .click()
            cy.step('verifica que foi redirecionado para a página de checkout')
            cy.url()
              .should('be.equal', `${Cypress.config('baseUrl')}basket/`)
          })
          it('home page - adiciona um cupom de desconto e verifica que não é aplicavel pois o valor minimo é 450rps', () => {
            cy.step('clica no campo "APPLY COUPON')
            cy.get('#coupon_code')
              .should('be.visible')
              .click()
            cy.step('entra com o cupom de desconto para obter 50rps off')
            cy.get('#coupon_code')
              .type('krishnasakinala')
            cy.step('clica no botão "APPLY COUPON')
            cy.get('input[value="Apply Coupon"]')
              .should('be.visible')
              .click()
            cy.step('verifica que a mensagem de erro "The minimum spend for this coupon is ₹450.00." está visivel')
            cy.get('.woocommerce-error')
              .should('be.visible')
              .and('contain', 'The minimum spend for this coupon is ₹450.00.')
          })
          it('home page - aumenta a quantidade de livros para 2 e adiciona o cupom', () => {
            cy.step('clica no seletor que aumenta para 2 a quantidade de livros')
            cy.get('input[type="number"]')
              .clear()
              .type(2)
            cy.step('clica em "UPDATE BASKET" para atualizar a quantidade')
            cy.get('input[value="Update Basket"]')
              .should('be.visible')
              .click()            
            cy.step('entra com o cupom de desconto para obter 50rps off')
            cy.get('#coupon_code')
              .type('krishnasakinala', { timeout: 10000 })
            cy.step('clica no botão "APPLY COUPON')
            cy.get('input[value="Apply Coupon"]')
              .should('be.visible')
              .click()
            cy.step('verifica que a mensagem "Coupon code applied successfully." está visivel')
            cy.get('.woocommerce-message')
              .should('be.visible')
              .and('contain', 'Coupon code applied successfully.')
          })
          context('Checkout Cases', () => {
            it('home page - remove o item da cesta de compras', () => {
              cy.step('clica no item "Remove this item"')
              cy.get('.remove')
                .should('be.visible')
                .click()
              cy.step('verifica que a mensagem "Mastering JavaScript removed." está visivel')
              cy.get('.woocommerce-message')
                .should('be.visible')
                .and('contain', 'Mastering JavaScript removed.')
              cy.step('verifica que a mensagem de cesta vazia está visivel')
              cy.get('.cart-empty')
                .should('be.visible')
                .and('contain', 'Your basket is currently empty.')
            })
            it('home page - verifica que o preço total está visivel na grade de checkout', () => {
              cy.step('verifica que o total do livro está visivel e contem o valor "350.00"')
              cy.get('.product-subtotal')
                .should('be.visible')
                .and('contain', '350.00')
            })
            it('home page - verifica que, acima de "PROCEED TO CHECKOUT", o "Subtotal" é menor que "Total"', () => {
              cy.step('obter o valor do campo "Subtotal"')
              cy.get('.cart-subtotal')
                .and('contain', '350.00')
              cy.step('obter o valor do campo "Total"')
              cy.get('.order-total')
                .and('contain', '357.00')
            })
            it('home page - conclui uma compra com sucesso', () => {
              cy.step('clica no botao "PROCEED TO CHECKOUT"')
              cy.proceedToCheckout()
              cy.step('preenche os campos obrigatórios na página de checkout')
              cy.camposObrigatoriosEmCheckout()
              cy.step('seleciona método de pagamento "Direct Bank Transfer"')
              cy.get('#payment_method_bacs')
                .should('be.visible')
                .click( { force: true } )

              cy.step('clica em "PLACE ORDER"')
              cy.get('#place_order')
                .should('be.visible')
                .click()
              cy.step('verifica a mensagem de sucesso "Thank you. Your order has been received."')
              cy.get('.woocommerce-thankyou-order-received')
                .should('be.visible')
            })
          })
        })
      })
    })
  })

