const request = require('supertest');
const app = require('../../app');
const fs = require('fs');
const path = require('path');

const articlesFilePath = path.join(__dirname, '../../data/articles.json');

describe('TODO: Article API Integration Tests', () => {
  beforeEach(() => {
    const initialData = [{ id: '1', title: 'Test Article 1' }];
    fs.writeFileSync(articlesFilePath, JSON.stringify(initialData, null, 2));
  });

  describe('TODO: GET /api/articles', () => {
    it('TODO: should return all articles', async () => {
      // TODO: Make a GET request to /api/articles and store the response
      it('should return all articles', async () => {
        const response = await request(app).get('/api/articles');
        expect(response.status).toBe(200);
        // TODO: Add assertions to check the response status and body
        expect(response.body).toEqual([{ id: '1', title: 'Test Article 1' }]);
      });
    });
  });

  describe('TODO: GET /api/articles/:id', () => {
    it('TODO: should return the article with the given id', async () => {
      // TODO: Make a GET request to /api/articles/1 and store the response
      it('should return the article with the given id', async () => {
        const response = await request(app).get('/api/articles/1');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ id: '1', title: 'Test Article 1' });
      });
      // TODO: Add assertions to check for the response status and the body
    });

    // TODO: Add assertions to check for 404 status and appropriate error message
    it('should return 404 if article not found', async () => {
      const response = await request(app).get('/api/articles/999');
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Article not found');
    });

  });

  describe('TODO: POST /api/articles', () => {
    it('should create a new article', async () => {
      const newArticle = { title: 'New Article' };
      const response = await request(app)
        .post('/api/articles')
        .send(newArticle);
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.title).toBe('New Article');
      // TODO: Make a POST request to /api/articles with newArticle data
      // TODO: Verify that the article is saved in the file
      const articles = JSON.parse(fs.readFileSync(articlesFilePath));
      expect(articles).toContainEqual(
        expect.objectContaining({ title: 'New Article' })
      );
    });
  });

  describe('TODO: PUT /api/articles/:id', () => {
    it('should update an existing article', async () => {
      const updatedArticle = { title: 'Updated Article 1' };
      const response = await request(app)
        .put('/api/articles/1')
        // TODO: Make a PUT request to /api/articles/1 with updatedArticle data
        .send(updatedArticle);
      expect(response.status).toBe(200);
      expect(response.body.title).toBe('Updated Article 1');

      // TODO: Add assertions to check for the updated article and status code

      // TODO: Verify that the article is updated in the file

      const articles = JSON.parse(fs.readFileSync(articlesFilePath));
      expect(articles).toContainEqual(
        expect.objectContaining({ id: '1', title: 'Updated Article 1' })
      );
    })

    iit('should return 404 if article not found', async () => {
       // TODO: Make a PUT request to /api/articles/999 with updatedArticle data
      // TODO: Add assertions to check for a 404 status and error message
      const updatedArticle = { title: 'Non-existent Article' };
      const response = await request(app)
        .put('/api/articles/999')
        .send(updatedArticle);
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Article not found');
    });
  });

  describe('TODO: DELETE /api/articles/:id', () => {
    it('should delete an article', async () => {
      // TODO: Make a DELETE request to /api/articles/1 and store the response
      // TODO: Add assertions to check for the deleted article and correct status
      // TODO: Verify that the article is deleted from the file
      const response = await request(app).delete('/api/articles/1');
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Article deleted successfully');

      const articles = JSON.parse(fs.readFileSync(articlesFilePath));
      expect(articles).toHaveLength(0);
    })

    it('should return 404 if article not found', async () => {
      // TODO: Make a DELETE request to /api/articles/999 and store the response
      // TODO: Add assertions to check for 404 status and error message
      const response = await request(app).delete('/api/articles/999');
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Article not found');
    });
      
  });
});
