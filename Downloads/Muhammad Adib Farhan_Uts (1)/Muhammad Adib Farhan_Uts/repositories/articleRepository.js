const fs = require('fs');
const path = require('path');
const articlesFilePath = path.join(__dirname, '../data/articles.json');

class ArticleRepository {

    getAllArticles() {
        // Membaca file JSON untuk mengambil semua artikel
        const data = fs.readFileSync(articlesFilePath, 'utf8');
        return JSON.parse(data);
    }

    getArticleById(id) {
        // Mengambil semua artikel, lalu mencari artikel dengan ID yang cocok
        const articles = this.getAllArticles();
        return articles.find(article => article.id === id) || null;
    }

    createArticle(article) {
        // Membuat ID unik untuk artikel jika belum ada
        if (!article.id) {
            article.id = String(Date.now());
        }

        // Menambahkan artikel baru ke file JSON
        const articles = this.getAllArticles();
        articles.push(article);
        fs.writeFileSync(articlesFilePath, JSON.stringify(articles, null, 2));
        return article;
    }

    updateArticle(id, updatedArticle) {
        // Mengambil semua artikel
        const articles = this.getAllArticles();
        const index = articles.findIndex(article => article.id === id);

        // Mengupdate artikel jika ditemukan
        if (index !== -1) {
            articles[index] = { ...articles[index], ...updatedArticle };
            fs.writeFileSync(articlesFilePath, JSON.stringify(articles, null, 2));
            return articles[index];
        }

        return null;
    }

    deleteArticle(id) {
        // Mengambil semua artikel
        const articles = this.getAllArticles();
        const index = articles.findIndex(article => article.id === id);

        // Menghapus artikel jika ditemukan
        if (index !== -1) {
            const [deletedArticle] = articles.splice(index, 1);
            fs.writeFileSync(articlesFilePath, JSON.stringify(articles, null, 2));
            return deletedArticle;
        }

        return null;
    }
}

module.exports = ArticleRepository;
