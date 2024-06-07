describe('DistribuicoesService', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200/login');
        cy.get('#email').type('gabriel@gmail.com');
        cy.get('#password').type('12345678');
        cy.get('.buttonLogin').click();
    });
  
    it('should fetch distributions by ID', () => {
      cy.request('http://localhost:8080/researches/ec96d2af-795b-45c7-9756-8a2d48a60db9').then(response => {
        expect(response.status).to.eq(200);
        expect(response.body.distribution_list).to.have.length.above(0);
      });
    });
  
    it('should call the API to fetch distributions', () => {
        cy.request('http://localhost:8080/distribuitions/').then(response => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.length.above(0);
        });
    });
  
    it('should display distributions returned by the API', () => {
        cy.visit('http://localhost:4200/distribuicoes/ec96d2af-795b-45c7-9756-8a2d48a60db9');
    
        cy.request('http://localhost:8080/researches/ec96d2af-795b-45c7-9756-8a2d48a60db9').then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.distribution_list).to.have.length.above(0);
    
            cy.get('#table-body-distribuicoes tr').should('have.length', response.body.distribution_list.length);
    
            response.body.distribution_list.forEach((distribution:any, index:number) => {
                cy.get(`#table-body-distribuicoes tr:nth-child(${index + 1}) td:nth-child(2)`).should('contain.text', distribution.name);
            });
        });
    });
});
  