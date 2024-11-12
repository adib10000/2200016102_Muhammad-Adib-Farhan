class ArticleService {
    constructor(articleRepository) {
        this.articleRepository = articleRepository;
    }

    getAllArticles() {
        // Mengambil semua artikel dari repository
        return this.articleRepository.getAll();
    }

    getArticleById(id) {
        // Mengambil satu artikel berdasarkan ID dari repository
        return this.articleRepository.getById(id);
    }

    createArticle(article) {
        // Memberikan ID unik pada artikel dan menyimpannya ke dalam repository
        article.id = Date.now().toString();
        return this.articleRepository.save(article);
    }

    updateArticle(id, updatedArticle) {
        // Menggunakan metode updateArticle dari repository
        return this.articleRepository.updateArticle(id, updatedArticle);
    }

    deleteArticle(id) {
        // Menghapus artikel berdasarkan ID dari repository
        return this.articleRepository.delete(id);
    }
}

module.exports = ArticleService;
