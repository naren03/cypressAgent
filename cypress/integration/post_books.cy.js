describe('POST Books API', () => {
  it('should create a new book successfully', () => {
    cy.request({
      method: 'POST',
      url: "https://fakerestapi.azurewebsites.net/api/v1/Books",
      headers: {
        'Content-Type': 'application/json; v=1.0'
      },
      body: {
        id: 0,
        title: "string",
        description: "string",
        pageCount: 0,
        excerpt: "string",
        publishDate: "2025-03-12T18:51:53.98Z"
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id');
      expect(response.body.title).to.eq("string");
      expect(response.body.description).to.eq("string");
      expect(response.body.pageCount).to.eq(0);
      expect(response.body.excerpt).to.eq("string");
      expect(response.body.publishDate).to.eq("2025-03-12T18:51:53.98Z");
    });
  });

  it('should fail to create a book with invalid data', () => {
    cy.request({
      method: 'POST',
      url: "https://fakerestapi.azurewebsites.net/api/v1/Books",
      headers: {
        'Content-Type': 'application/json; v=1.0'
      },
      body: {
        id: "invalid_id",
        title: 123,
        description: true,
        pageCount: "invalid_pageCount",
        excerpt: 456,
        publishDate: "invalid_date"
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });
});