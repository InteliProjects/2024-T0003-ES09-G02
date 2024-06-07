/// <reference types="cypress" />

context('test distribution', () => {
    beforeEach(() => {
      // Visita a página de login antes de cada teste
      cy.visit('http://localhost:4200/login')
    })
  
    it('allows the user to create a distribution', () => {
      cy.get('#email').type('usuarioteste@gmail.com')
      cy.get('#password').type('12345678')
      cy.get('.buttonLogin').click()
  
      cy.location('pathname').should('eq', '/pesquisas')
      cy.get('.btt-dist').first().click();
      cy.wait(1000);
      
      cy.get('.dist-button-on').click();
      cy.get('#name').type('Distribuição 1');
      cy.get('.buttonClients').click();
      cy.wait(1000);

      cy.get('.nextPage').click();
      cy.wait(1000);

      cy.get('.create').click();

      cy.get('.dadosHeader').should('contain', 'Distribuição 1');

    })
  
    it('shows an error message on failed distribution', () => {
      cy.get('#email').type('usuarioteste@gmail.com')
      cy.get('#password').type('12345678')
      cy.get('.buttonLogin').click()
  
      cy.location('pathname').should('eq', '/pesquisas')
      cy.get('.btt-dist').first().click();
      cy.wait(1000);
      
      cy.get('.dist-button-on').click();
      cy.get('#name').type(' ');
      cy.get('.buttonClients').click();
      cy.wait(1000);

      cy.get('.nextPage').click();
      cy.wait(1000);

      cy.get('.create').click();
      cy.get('.dadosHeader').should('contain', 'Distribuição 2');
    })
  })