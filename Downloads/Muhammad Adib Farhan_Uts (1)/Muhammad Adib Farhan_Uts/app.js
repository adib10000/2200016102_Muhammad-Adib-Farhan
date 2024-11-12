const express = require('express');
const ArticleRepository = require('./repositories/articleRepository');
const ArticleService = require('./services/articleService');
const ArticleController = require('./controllers/articleController');
const articleRoutes = require('./routes/articleRoutes');
const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());

// Dependency Injection
const articleRepository = new ArticleRepository();
const articleService = new ArticleService(articleRepository);
const articleController = new ArticleController(articleService);

// Register routes
app.use('/api/articles', articleRoutes(articleController));


app.use('/', (req, res) => {
    res.send('Welcome to the Article API');
});



module.exports = app;