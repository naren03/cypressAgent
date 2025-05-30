describe('GET Books API', () => {
  it('should return a list of books', () => {
    cy.request({
      method: 'GET',
      url: 'https://fakerestapi.azurewebsites.net/api/v1/Books',
      headers: {
        'Content-Type': 'application/json; v=1.0'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      response.body.forEach(book => {
        expect(book).to.have.property('id').that.is.a('number');
        expect(book).to.have.property('title').that.is.a('string');
        expect(book).to.have.property('description').that.is.a('string');
        expect(book).to.have.property('pageCount').that.is.a('number');
        expect(book).to.have.property('excerpt').that.is.a('string');
        expect(book).to.have.property('publishDate').that.is.a('string');
      });
    });
  });

  it('should return 404 for invalid endpoint', () => {
    cy.request({
      method: 'GET',
      url: 'https://fakerestapi.azurewebsites.net/api/v1/InvalidBooks',
      failOnStatusCode: false,
      headers: {
        'Content-Type': 'application/json; v=1.0'
      }
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });
});