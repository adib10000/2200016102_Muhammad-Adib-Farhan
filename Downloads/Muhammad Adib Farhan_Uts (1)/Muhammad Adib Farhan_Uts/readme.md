[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/5gNCA1FX)
### Soal UTS

Lengkapi fungsionalitas API dan lakukan pengujian (Unit Test, Integration Test, API Test). Perhatikan tabel dibawah sebagai petunjuk untuk mengerjakan pengujian.

### `ArticleService` Test Suite

| **Test Suite**   | **Test Case**                 | **Description**                                             | **Expected Output**                                           |
const ArticleService = require('./ArticleService');

describe('ArticleService', () => {
  let articleService;
  let mockRepository;

  beforeEach(() => {
    mockRepository = {
      getAllArticles: jest.fn(),
      getArticleById: jest.fn(),
      createArticle: jest.fn(),
      updateArticle: jest.fn(),
      deleteArticle: jest.fn(),
    };
    articleService = new ArticleService(mockRepository);
  });

  it('should return all articles', async () => {
    const articles = [{ id: '1', title: 'Article 1' }];
    mockRepository.getAllArticles.mockResolvedValue(articles);
    const result = await articleService.getAllArticles();
    expect(result).toEqual(articles);
  });

  it('should return a single article by ID if it exists', async () => {
    const article = { id: '1', title: 'Article 1' };
    mockRepository.getArticleById.mockResolvedValue(article);
    const result = await articleService.getArticleById('1');
    expect(result).toEqual(article);
  });

  it('should return null if article ID does not exist', async () => {
    mockRepository.getArticleById.mockResolvedValue(null);
    const result = await articleService.getArticleById('999');
    expect(result).toBeNull();
  });

  it('should create and return a new article', async () => {
    const newArticle = { id: '123', title: 'New Article' };
    mockRepository.createArticle.mockResolvedValue(newArticle);
    const result = await articleService.createArticle({ title: 'New Article' });
    expect(result).toEqual(newArticle);
  });

  it('should update and return an existing article', async () => {
    const updatedArticle = { id: '1', title: 'Updated Article' };
    mockRepository.getArticleById.mockResolvedValue(updatedArticle);
    mockRepository.updateArticle.mockResolvedValue(updatedArticle);
    const result = await articleService.updateArticle('1', { title: 'Updated Article' });
    expect(result).toEqual(updatedArticle);
  });

  it('should return null if article to update is not found', async () => {
    mockRepository.getArticleById.mockResolvedValue(null);
    const result = await articleService.updateArticle('999', { title: 'Updated Article' });
    expect(result).toBeNull();
  });

  it('should delete and return an existing article', async () => {
    const article = { id: '1', title: 'Article 1' };
    mockRepository.getArticleById.mockResolvedValue(article);
    mockRepository.deleteArticle.mockResolvedValue(article);
    const result = await articleService.deleteArticle('1');
    expect(result).toEqual(article);
  });

  it('should return null if article to delete is not found', async () => {
    mockRepository.getArticleById.mockResolvedValue(null);
    const result = await articleService.deleteArticle('999');
    expect(result).toBeNull();
  });
});


### `ArticleRepository` Test Suite

| **Test Suite**        | **Test Case**                       | **Description**                                               | **Expected Output**                                               |
|describe('ArticleRepository', () => {
  let articleRepository;

  beforeEach(() => {
    articleRepository = new ArticleRepository();
  });

  it('should return all articles', async () => {
    const articles = await articleRepository.getAllArticles();
    expect(articles).toEqual([{ id: '1', title: 'Article 1' }, { id: '2', title: 'Article 2' }]);
  });

  it('should return an article by ID if it exists', async () => {
    const article = await articleRepository.getArticleById('1');
    expect(article).toEqual({ id: '1', title: 'Article 1' });
  });

  it('should return null if article ID does not exist', async () => {
    const article = await articleRepository.getArticleById('999');
    expect(article).toBeNull();
  });

  it('should create and save a new article', async () => {
    const newArticle = { title: 'New Article' };
    const createdArticle = await articleRepository.createArticle(newArticle);
    expect(createdArticle).toMatchObject({ id: '3', title: 'New Article' });
  });

  it('should update and save an existing article', async () => {
    const updatedArticle = await articleRepository.updateArticle('1', { title: 'Updated Article' });
    expect(updatedArticle).toEqual({ id: '1', title: 'Updated Article' });
  });

  it('should return null if article to update is not found', async () => {
    const result = await articleRepository.updateArticle('999', { title: 'Updated Article' });
    expect(result).toBeNull();
  });

  it('should delete an article and return it', async () => {
    const deletedArticle = await articleRepository.deleteArticle('1');
    expect(deletedArticle).toEqual({ id: '1', title: 'Article 1' });
  });

  it('should return null if article to delete is not found', async () => {
    const result = await articleRepository.deleteArticle('999');
    expect(result).toBeNull();
  });
});
                                |

---

### `Article API Integration Tests`

#### `GET /api/articles`

| **Test Suite**                | **Test Case**                          | **Description**                                    | **Expected Output**                                       |
|-------------------------------|----------------------------------------|----------------------------------------------------|-----------------------------------------------------------|
| `GET /api/articles`           | Returns all articles                  | Retrieves all articles from the API                | Status: `200`, Body: `[{ id: '1', title: 'Test Article 1' }]` |

#### `GET /api/articles/:id`

| **Test Suite**                | **Test Case**                                  | **Description**                                    | **Expected Output**                                               |
|-------------------------------|------------------------------------------------|----------------------------------------------------|-------------------------------------------------------------------|
| `GET /api/articles/:id`       | Retrieves an article by ID (existing)          | Returns a single article by specified ID           | Status: `200`, Body: `{ id: '1', title: 'Test Article 1' }`      |
|                               | Retrieves an article by ID (non-existent)      | Returns 404 if article ID not found                | Status: `404`, Body: `{ message: 'Article not found' }`          |

#### `POST /api/articles`

| **Test Suite**                | **Test Case**                                  | **Description**                                    | **Expected Output**                                                                                      |
|-------------------------------|------------------------------------------------|----------------------------------------------------|----------------------------------------------------------------------------------------------------------|
| `POST /api/articles`          | Creates a new article                          | Adds and returns a new article                     | Status: `201`, Body: `{ id: <new id>, title: 'New Article' }`, file has 2 articles |

#### `PUT /api/articles/:id`

| **Test Suite**                | **Test Case**                                     | **Description**                                    | **Expected Output**                                                       |
|-------------------------------|---------------------------------------------------|----------------------------------------------------|---------------------------------------------------------------------------|
| `PUT /api/articles/:id`       | Updates an article by ID (existing)               | Updates and returns an article with specified ID   | Status: `200`, Body: `{ title: 'Updated Article 1' }`, file updated for ID `1` |
|                               | Updates an article by ID (non-existent)           | Returns 404 if article to update is not found      | Status: `404`, Body: `{ message: 'Article not found' }`                       |

#### `DELETE /api/articles/:id`

| **Test Suite**                | **Test Case**                                     | **Description**                                    | **Expected Output**                                                          |
const ArticleService = require('./ArticleService');
const ArticleRepository = require('./ArticleRepository');

describe('ArticleService', () => {
  let articleService;
  let mockRepository;

  beforeEach(() => {
    mockRepository = {
      getAllArticles: jest.fn(),
      getArticleById: jest.fn(),
      createArticle: jest.fn(),
      updateArticle: jest.fn(),
      deleteArticle: jest.fn(),
    };
    articleService = new ArticleService(mockRepository);
  });

  it('should return all articles', async () => {
    const articles = [{ id: '1', title: 'Article 1' }];
    mockRepository.getAllArticles.mockResolvedValue(articles);
    
    const result = await articleService.getAllArticles();
    expect(result).toEqual(articles);
    expect(mockRepository.getAllArticles).toHaveBeenCalled();
  });

  it('should return a single article by ID if it exists', async () => {
    const article = { id: '1', title: 'Article 1' };
    mockRepository.getArticleById.mockResolvedValue(article);
    
    const result = await articleService.getArticleById('1');
    expect(result).toEqual(article);
    expect(mockRepository.getArticleById).toHaveBeenCalledWith('1');
  });

  it('should return null if article ID does not exist', async () => {
    mockRepository.getArticleById.mockResolvedValue(null);
    
    const result = await articleService.getArticleById('999');
    expect(result).toBeNull();
    expect(mockRepository.getArticleById).toHaveBeenCalledWith('999');
  });

  it('should create and return a new article', async () => {
    const newArticle = { id: '123', title: 'New Article' };
    mockRepository.createArticle.mockResolvedValue(newArticle);
    
    const result = await articleService.createArticle({ title: 'New Article' });
    expect(result).toEqual(newArticle);
    expect(mockRepository.createArticle).toHaveBeenCalledWith({ title: 'New Article' });
  });

  it('should update and return an existing article', async () => {
    const updatedArticle = { id: '1', title: 'Updated Article' };
    mockRepository.getArticleById.mockResolvedValue(updatedArticle);
    mockRepository.updateArticle.mockResolvedValue(updatedArticle);
    
    const result = await articleService.updateArticle('1', { title: 'Updated Article' });
    expect(result).toEqual(updatedArticle);
    expect(mockRepository.updateArticle).toHaveBeenCalledWith('1', { title: 'Updated Article' });
  });

  it('should return null if article to update is not found', async () => {
    mockRepository.getArticleById.mockResolvedValue(null);
    
    const result = await articleService.updateArticle('999', { title: 'Updated Article' });
    expect(result).toBeNull();
    expect(mockRepository.updateArticle).not.toHaveBeenCalled();
  });

  it('should delete and return an existing article', async () => {
    const article = { id: '1', title: 'Article 1' };
    mockRepository.getArticleById.mockResolvedValue(article);
    mockRepository.deleteArticle.mockResolvedValue(article);
    
    const result = await articleService.deleteArticle('1');
    expect(result).toEqual(article);
    expect(mockRepository.deleteArticle).toHaveBeenCalledWith('1');
  });

  it('should return null if article to delete is not found', async () => {
    mockRepository.getArticleById.mockResolvedValue(null);
    
    const result = await articleService.deleteArticle('999');
    expect(result).toBeNull();
    expect(mockRepository.deleteArticle).not.toHaveBeenCalled();
  });
});

| `DELETE /api/articles/:id`    | Deletes an article by ID (existing)               | Deletes and returns an article with specified ID   | Status: `200`, Body: `{ title: 'Test Article 1' }`, file has no articles     |
|                               | Deletes an article by ID (non-existent)           | Returns 404 if article to delete is not found      | Status: `404`, Body: `{ message: 'Article not found' }`                      |