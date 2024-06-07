// cypress/integration/login.spec.js

describe('Teste de Login e Autenticação', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/login');
  });

  it('Deve mostrar o login form', () => {
    cy.get('#ContainerLogin').should('exist');
    cy.get('#email').should('exist');
    cy.get('#password').should('exist');
    cy.get('.buttonLogin').should('exist');
    cy.get('.buttonGoogle').should('exist');
  });

  it('Deve fazer login com sucesso com email e senha', () => {
    cy.get('#email').type('gabriel@gmail.com');
    cy.get('#password').type('12345678');
    cy.get('.buttonLogin').click();

    cy.url().should('include', '/pesquisas');
  });

  it('Deve exibir mensagem de erro para credenciais inválidas', () => {
    cy.get('#email').type('example@gmail.com');
    cy.get('#password').type('987654321');
    cy.get('.buttonLogin').click();

    cy.get('#errorMessage').should('contain.text', 'Credenciais inválidas.');
  });

  it('Deve exibir mensagem de erro para email em formato inválido', () => {
    cy.get('#email').type('example');
    cy.get('#password').type('987654321');
    cy.get('.buttonLogin').click();

    cy.get('#errorMessage').should('contain.text', 'Email invalido.');
  });
  
  it('Deve exibir mensagem de erro quando janela com login com conta Google é fechada', () => {
    cy.get('.buttonGoogle').click();

    cy.window().then(win => {
      cy.stub(win, 'open').callsFake(() => null)
    })
    
    cy.get('#errorMessage').should('contain.text', 'Erro ao fazer login com o Google.');
  });

  it('Deve redirecionar para a página de login ao acessar uma página protegida sem estar autenticado', () => {
    cy.visit('http://localhost:4200/pesquisas');

    cy.url().should('include', '/login');
  });
});