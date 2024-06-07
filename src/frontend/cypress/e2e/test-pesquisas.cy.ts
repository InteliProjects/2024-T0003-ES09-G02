describe('PesquisasComponent', () => {

    //fazer login
    beforeEach(() => {
      cy.visit('login');
      
    });
  
      it('deve carregar as pesquisas corretamente', () => {

        cy.get('#email').type('gabriel@gmail.com');
        cy.get('#password').type('12345678');
        cy.get('.buttonLogin').click();

        cy.location('pathname').should('eq', '/pesquisas')
    
        cy.get('.pesquisasPage').should('exist');
    });
    });