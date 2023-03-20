# Testes Automatizados com Cypress utilizando o Cypress-plugin-steps

Olá Tudo bem?

Como forma de organizar melhor os testes automatizados com o Cypress, o embaixador do Cypress na
Eslováquia, Filip Hric, criou uma biblioteca chamada Cypress-plugin-steps onde é possivel adicionar
passos numerados para o passo-a-passo nos testes. 
Decidi então criar um modelo baseado nos cenários de testes do site 
'https://practice.automationtesting.in/', um site criado com a finalidade de treinar testes automatizados. 
Ainda estou em processo de aprendizagem dessa ferramenta magnífica que é o Cypress, então os testes podem não estar perfeitos mas foram feitos de acordo com os meus conhecimentos atuais da ferramenta.

Espero que gostem!

## Estrutura dos testes

- Utilizei a versão até então mais recente do Cypress (12.7.0)
- Para adicionar a biblioteca no Cypress vc utiliza o commando no terminal:
  'npm i cypress-plugin-steps -D' (o -D é para instalar como dependente de desenvolvimento)
- Depois, na pasta 'E2E' em 'Support':
  'import 'cypress-plugin-steps'
- Também criei o arquivo 'cypress.env.json' para adicionar os dados sensíveis utilizados nos testes
- É importante criar o '.gitignore' para o git não subir esses dados ao dar o commit

Obs: deixei uma cópia do 'cypress.env.json' com o nome de 'cypress.env. copy.json' com a estrutura utilizada nos testes. Crie uma conta no site 'https://practice.automationtesting.in/' e adicione as informações que estão faltando para os seus testes serem realizados com sucesso. (em "changed_user_name" vc utiliza o user_name alterando minuscula para maiuscula e em "changed_password": vc utiliza o user_password alterando maiuscula para minuscula. No caso de "user_email_existing" vc deve criar outra conta com esse email para testar que, ao tentar criar outra conta com o email ja existente o sitema nao permitirá )

- Confira também a estrutura que utilizei de configuração dos testes em 'cypress.config.js'
OBS: não esqueça de definir a 'baseUrl' corretamente, será fundamental para a estrutura dos testes

- Nos comandos customizados em 'commands.js', criei um comando customizado 'gui_login' apenas para o teste de login, e para os outros testes criei outro comando customizado 'sessionLogin' que utiliza a funcionalidade do Cypress 'cy.session' para reaproveitar a sessão ja criada anteriormente e agilizar os testes, esse comando customizado eu coloquei dentro da pasta 'E2E' do 'support' junto com os imports, apenas para separar os comandos
- Para gerar um video dos seus testes rodando, você deve alterar para 'True' em 'cypress.config.js', e rodar os testes em Headless (npm cypress run) no terminal.

## Sobre os testes

Em 'Test Cases' no site 'https://practice.automationtesting.in/' existe uma lista de casos de testes a serem seguidos. Na maioria eu segui como descrito, mas em alguns casosprecisei fazer algumas alterações. Segue abaixo algumas considerações: 

- O Teste 12 e 14 do caso de teste 'HOME PAGE' estão duplicados e não foram realizados pois a funcionalidade em questão já havia sido testada no teste:
  - Spec : 'homePage.cy.js'
  - Context : 'Cupon Cases'
  - Test : 'home page - aumenta a quantidade de livros para 2 e adiciona o cupom' 

- Os testes 16, 17 e 18 do caso de teste 'HOME PAGE' foram convertidos em um teste único:
  - Spec : 'homePage.cy.js'
  - Context : 'Checkout Cases'
  - Test : 'home page - conclui uma compra com sucesso'

- O teste 11 do caso de teste 'SHOP' foi realizado no caso de teste 'HOME PAGE' pois já existia nesse teste com o mesmo formato:
  - Spec : 'homePage.cy.js'
  - Context : 'Checkout Cases'
  - Test : 'home page - conclui uma compra com sucesso'

  OBS: Foram encontrados alguns bugs nos tests, mas isso eu vou deixar para vcs descobrirem hehehe!

## Espero que possa ser util no seu processo de aprendizagem. Valeu!
___

Rafael Domingos Santos (Q.A Analist)
https://github.com/Raffadom
https://www.linkedin.com/in/rafael-domingos-aab12060/
