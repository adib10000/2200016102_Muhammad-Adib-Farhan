const { expect } = require('chai');
const sinon = require('sinon');
const fs = require('fs');
const ArticleRepository = require('../../repositories/articleRepository');

describe('ArticleRepository', () => {
  let articleRepository;
  let fsReadFileSyncStub;
  let fsWriteFileSyncStub;

  beforeEach(() => {
    articleRepository = new ArticleRepository();
    fsReadFileSyncStub = sinon.stub(fs, 'readFileSync');
    fsWriteFileSyncStub = sinon.stub(fs, 'writeFileSync');
  });

  afterEach(() => {
    sinon.restore();
  });

  // TODO: Write test cases for getAllArticles
  //  - Should return an array of articles read from the file
  //  - Should call fs.readFileSync once with the correct file path
  describe('getAllArticles', () => {
    it('should return an array of articles read from the file', () => {
      const mockArticles = [{ id: '1', title: 'Article 1' }];
      fsReadFileSyncStub.returns(JSON.stringify(mockArticles));

      const articles = articleRepository.getAllArticles();

      expect(articles).to.be.an('array').that.deep.equals(mockArticles);
      sinon.assert.calledOnce(fsReadFileSyncStub);
    });
  });

  // TODO: Write test cases for getArticleById
  //  - Should return the article with the given id when it exists
  //  - Should return null when no article is found with the given id
  describe('getArticleById', () => {
    it('should return the article with the given id when it exists', () => {
      const mockArticles = [{ id: '1', title: 'Article 1' }];
      fsReadFileSyncStub.returns(JSON.stringify(mockArticles));

      const article = articleRepository.getArticleById('1');

      expect(article).to.deep.equal(mockArticles[0]);
    });

    it('should return null when no article is found with the given id', () => {
      const mockArticles = [{ id: '1', title: 'Article 1' }];
      fsReadFileSyncStub.returns(JSON.stringify(mockArticles));

      const article = articleRepository.getArticleById('999');

      expect(article).to.be.null;
    });
  });

  // TODO: Write test cases for createArticle
  //  - Should add a new article with a generated id to the articles array
  //  - Should call fs.writeFileSync to save the updated articles array to the file
  //  - Should return the newly created article object
  describe('createArticle', () => {
    it('should add a new article with a generated id to the articles array', () => {
      const mockArticles = [{ id: '1', title: 'Article 1' }];
      fsReadFileSyncStub.returns(JSON.stringify(mockArticles));

      const newArticle = { title: 'New Article' };
      const createdArticle = articleRepository.createArticle(newArticle);

      expect(createdArticle).to.have.property('id');
      expect(createdArticle.title).to.equal('New Article');
      sinon.assert.calledOnce(fsWriteFileSyncStub);

      const updatedArticles = JSON.parse(fsWriteFileSyncStub.firstCall.args[1]);
      expect(updatedArticles).to.include.deep.members([createdArticle]);
    });
  });

  describe('updateArticle', () => {
    it('should update an existing article', () => {
      const mockArticles = [{ id: '1', title: 'Article 1' }];
      fsReadFileSyncStub.returns(JSON.stringify(mockArticles));

      const updatedArticle = articleRepository.updateArticle('1', { title: 'Updated Article' });

      expect(updatedArticle.title).to.equal('Updated Article');
      sinon.assert.calledOnce(fsWriteFileSyncStub);
    });

    it('should return null if the article is not found', () => {
      const mockArticles = [{ id: '1', title: 'Article 1' }];
      fsReadFileSyncStub.returns(JSON.stringify(mockArticles));

      const updatedArticle = articleRepository.updateArticle('999', { title: 'Non-existing Article' });

      expect(updatedArticle).to.be.null;
    });
  });

  // TODO: Write test cases for deleteArticle
  //  - Should delete the article with the given id from the articles array
  //  - Should call fs.writeFileSync to save the updated articles array to the file
  //  - Should return the deleted article object
  //  - Should return null if the article with the given id is not found
  describe('deleteArticle', () => {
    it('should delete the article with the given id from the articles array', () => {
      const mockArticles = [{ id: '1', title: 'Article 1' }];
      fsReadFileSyncStub.returns(JSON.stringify(mockArticles));

      const deletedArticle = articleRepository.deleteArticle('1');

      expect(deletedArticle).to.deep.equal(mockArticles[0]);
      sinon.assert.calledOnce(fsWriteFileSyncStub);

      const updatedArticles = JSON.parse(fsWriteFileSyncStub.firstCall.args[1]);
      expect(updatedArticles).to.not.include.deep.members([mockArticles[0]]);
    });

    it('should return null if the article with the given id is not found', () => {
      const mockArticles = [{ id: '1', title: 'Article 1' }];
      fsReadFileSyncStub.returns(JSON.stringify(mockArticles));

      const deletedArticle = articleRepository.deleteArticle('999');

      expect(deletedArticle).to.be.null;
    });
  });
});
