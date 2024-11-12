const express = require('express');
const router = express.Router();

module.exports = (articleController) => {
    router.get('/', (req, res) => articleController.getAllArticles(req, res));
    router.get('/:id', (req, res) => articleController.getArticleById(req, res));
    router.post('/', (req, res) => articleController.createArticle(req, res));
    router.put('/:id', (req, res) => articleController.updateArticle(req, res));
    router.delete('/:id', (req, res) => articleController.deleteArticle(req, res));
    return router;
};
