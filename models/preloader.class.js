class Preloader {
    constructor() {
        this.loadedCount = 0;
        this.totalCount = 0;
        this.images = [];
        this.sounds = [];
    }

    /**
    * Add image paths to the preloader.
    * @param {string[]} imageArray - Array of image paths.
    */
    addImages(imageArray) {
        this.images.push(...imageArray);
        this.totalCount += imageArray.length;
    }

    /**
    * Load a single image.
    * @param {string} path - Path to the image file.
    * @returns {Promise<HTMLImageElement>} A promise that resolves with the loaded image.
    */
    loadImage(path) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = path;
            img.onload = () => {
                this.loadedCount++;
                resolve(img);
            };
            img.onerror = () => reject(`Failed to load image: ${path}`);
        });
    }

    /**
    * Load all images added to the preloader.
    * @returns {Promise<HTMLImageElement[]>} A promise that resolves with all loaded images.
    */
    async loadAll() {
        const imagePromises = this.images.map(path => this.loadImage(path));
        return Promise.all(imagePromises);
    }

    /**
    * Get the current loading progress as a fraction.
    * @returns {number} Progress between 0 (none loaded) and 1 (all loaded).
    */
    getProgress() {
        return this.totalCount ? this.loadedCount / this.totalCount : 0;
    }
}
