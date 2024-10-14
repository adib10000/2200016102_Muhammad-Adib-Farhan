class Service {
    constructor(primaryRepository, secondaryRepository) {
        this.primaryRepository = primaryRepository;
        this.secondaryRepository = secondaryRepository;
    }

    getItemById(id) {
        const item = this.primaryRepository.getItemById(id) || this.secondaryRepository.getItemById(id);
        if (!item) {
            throw new Error('Item not found in both repositories'); // Pesan error yang benar
        }
        return item;
    }

    // Metode lain seperti addItem dan getAllItems
}

module.exports = Service;
