describe('GET Authors API', () => {
  it('should return a list of authors', () => {
    cy.request({
      method: 'GET',
      url: 'https://fakerestapi.azurewebsites.net/api/v1/Authors',
      headers: {
        'Content-Type': 'application/json; v=1.0'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      response.body.forEach((author) => {
        expect(author).to.have.property('id').that.is.a('number');
        expect(author).to.have.property('idBook').that.is.a('number');
        expect(author).to.have.property('firstName').that.is.a('string');
        expect(author).to.have.property('lastName').that.is.a('string');
      });
    });
  });

  it('should return 404 for an invalid endpoint', () => {
    cy.request({
      method: 'GET',
      url: 'https://fakerestapi.azurewebsites.net/api/v1/InvalidEndpoint',
      failOnStatusCode: false,
      headers: {
        'Content-Type': 'application/json; v=1.0'
      }
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });
});