const { expect } = require('chai');
const sinon = require('sinon');
const ArticleService = require('../../services/articleService');
const ArticleRepository = require('../../repositories/articleRepository');

describe('ArticleService', () => {
    let articleService;
    let articleRepositoryMock;

    beforeEach(() => {
        articleRepositoryMock = sinon.createStubInstance(ArticleRepository); // TODO: Create a stub instance for ArticleRepository
        articleService = new ArticleService(articleRepositoryMock); // TODO: Initialize articleService with the mock repository
    });

    describe('getAllArticles', () => {
        it('should return all articles', () => {
            const mockArticles = [{ id: '1', title: 'Article 1' }];
            articleRepositoryMock.getAllArticles.returns(mockArticles);

            const articles = articleService.getAllArticles();

            expect(articles).to.deep.equal(mockArticles);
            sinon.assert.calledOnce(articleRepositoryMock.getAllArticles);
        });
    });

    // TODO: Write test cases for getAllArticles
    //  - Should return an array of articles
    //  - Should call articleRepository.getAllArticles once
    describe('getAllArticles', () => {
        it('should return an array of articles', () => {
            const mockArticles = [{ id: '1', title: 'Article 1' }];
            articleRepositoryMock.getAllArticles.returns(mockArticles);

            const articles = articleService.getAllArticles();

            expect(articles).to.be.an('array').that.deep.equals(mockArticles);
            sinon.assert.calledOnce(articleRepositoryMock.getAllArticles);
        });
    });

    // TODO: Write test cases for getArticleById
    //  - Should return the article with the given id when it exists
    //  - Should call articleRepository.getArticleById once with the correct id
    //  - Should return null when no article is found with the given id
    describe('getArticleById', () => {
        it('should return the article with the given id when it exists', () => {
            const mockArticle = { id: '1', title: 'Article 1' };
            articleRepositoryMock.getArticleById.withArgs('1').returns(mockArticle);

            const article = articleService.getArticleById('1');

            expect(article).to.deep.equal(mockArticle);
            sinon.assert.calledOnceWithExactly(articleRepositoryMock.getArticleById, '1');
        });

        it('should return null when no article is found with the given id', () => {
            articleRepositoryMock.getArticleById.withArgs('999').returns(null);

            const article = articleService.getArticleById('999');

            expect(article).to.be.null;
            sinon.assert.calledOnceWithExactly(articleRepositoryMock.getArticleById, '999');
        });
    });

    // TODO: Write test cases for createArticle
    //  - Should create a new article and return it
    //  - Should call articleRepository.createArticle once with the correct article data
    describe('createArticle', () => {
        it('should create a new article and return it', () => {
            const newArticleData = { title: 'New Article' };
            const createdArticle = { id: '2', title: 'New Article' };
            articleRepositoryMock.createArticle.withArgs(newArticleData).returns(createdArticle);

            const article = articleService.createArticle(newArticleData);

            expect(article).to.deep.equal(createdArticle);
            sinon.assert.calledOnceWithExactly(articleRepositoryMock.createArticle, newArticleData);
        });
    });

    // TODO: Write test cases for updateArticle
    //  - Should update an existing article and return it
    //  - Should call articleRepository.updateArticle once with the correct id and updated data
    //  - Should return null if the article is not found
    describe('updateArticle', () => {
        it('should update an existing article and return it', () => {
            const updatedData = { title: 'Updated Article' };
            const updatedArticle = { id: '1', title: 'Updated Article' };
            articleRepositoryMock.updateArticle.withArgs('1', updatedData).returns(updatedArticle);

            const article = articleService.updateArticle('1', updatedData);

            expect(article).to.deep.equal(updatedArticle);
            sinon.assert.calledOnceWithExactly(articleRepositoryMock.updateArticle, '1', updatedData);
        });

        it('should return null if the article is not found', () => {
            articleRepositoryMock.updateArticle.withArgs('999', sinon.match.any).returns(null);

            const article = articleService.updateArticle('999', { title: 'Non-existing Article' });

            expect(article).to.be.null;
            sinon.assert.calledOnceWithExactly(articleRepositoryMock.updateArticle, '999', { title: 'Non-existing Article' });
        });
    });

    // TODO: Write test cases for deleteArticle
    //  - Should delete an article and return it
    //  - Should call articleRepository.deleteArticle once with the correct id
    //  - Should return null if the article is not found
    describe('deleteArticle', () => {
        it('should delete an article and return it', () => {
            const deletedArticle = { id: '1', title: 'Article 1' };
            articleRepositoryMock.deleteArticle.withArgs('1').returns(deletedArticle);

            const article = articleService.deleteArticle('1');

            expect(article).to.deep.equal(deletedArticle);
            sinon.assert.calledOnceWithExactly(articleRepositoryMock.deleteArticle, '1');
        });

        it('should return null if the article is not found', () => {
            articleRepositoryMock.deleteArticle.withArgs('999').returns(null);

            const article = articleService.deleteArticle('999');

            expect(article).to.be.null;
            sinon.assert.calledOnceWithExactly(articleRepositoryMock.deleteArticle, '999');
        });
    });
});
