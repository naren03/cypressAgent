describe('POST Authors API', () => {
  it('should create a new author', () => {
    cy.request({
      method: 'POST',
      url: 'https://fakerestapi.azurewebsites.net/api/v1/Authors',
      headers: {
        'Content-Type': 'application/json; v=1.0'
      },
      body: {
        id: 0,
        idBook: 0,
        firstName: 'John',
        lastName: 'Doe'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id');
      expect(response.body.idBook).to.eq(0);
      expect(response.body.firstName).to.eq('John');
      expect(response.body.lastName).to.eq('Doe');
    });
  });

  it('should fail with invalid data type', () => {
    cy.request({
      method: 'POST',
      url: 'https://fakerestapi.azurewebsites.net/api/v1/Authors',
      headers: {
        'Content-Type': 'application/json; v=1.0'
      },
      body: {
        id: 'invalid',
        idBook: 'invalid',
        firstName: 123,
        lastName: true
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  it('should fail with missing required fields', () => {
    cy.request({
      method: 'POST',
      url: 'https://fakerestapi.azurewebsites.net/api/v1/Authors',
      headers: {
        'Content-Type': 'application/json; v=1.0'
      },
      body: {},
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });
});