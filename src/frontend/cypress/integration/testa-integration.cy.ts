describe("Research endpoint", () => {

    it("GET all researches", () => {
    
        cy.request({
          method: "GET",
          url: 'http://localhost:8080/researches/',
        }).then(response => {
            expect(response.status).to.eq(200);
        });
    });

    it('GET all distribuições', () => {
        cy.request('GET', 'http://localhost:8080/distribuitions/')
          .its('status')
          .should('equal', 200);
      });
    
    it('POST distribuições', () => {
    cy.request('POST', 'http://localhost:8080/distribuitions/', {
        name: 'string 4',
        channel: 'string',
        anonymous_answer: true,
        csv_file: 'string',
        template: 'string',
        research_id: '66b6dfff-b66b-469b-b8d8-777d758d412e',
    }).then((response) => {
        expect(response.status).to.eq(201);
    });
    });

    it('GET distribuição by id', () => {
    cy.request('GET', 'http://localhost:8080/distribuitions/730a3d6b-7108-4ac1-a603-221edee68763')
        .its('status')
        .should('equal', 200);
    });

    it('DELETE distribuição', () => {
    cy.request('DELETE', 'http://localhost:8080/distribuitions/730a3d6b-7108-4ac1-a603-221edee68763')
        .its('status')
        .should('equal', 204);
    });
});