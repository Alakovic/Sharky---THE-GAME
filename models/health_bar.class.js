/**
 * Represents the player's health bar in the game.
 * Extends DrawableObject to handle rendering on the canvas.
 */
class HealthBar extends DrawableObject{

    images_bar = [
        './assets/images/game_interface/health_bar/0.png',
        './assets/images/game_interface/health_bar/20.png',
        './assets/images/game_interface/health_bar/40.png',
        './assets/images/game_interface/health_bar/60.png',
        './assets/images/game_interface/health_bar/80.png',
        './assets/images/game_interface/health_bar/100.png'
    ]

/**
* Creates a new HealthBar instance and initializes it to full health.
*/
    constructor(){
        super();
        this.loadImages(this.images_bar)
        this.x = 35;
        this.y = 10;
        this.width = 300;
        this.height = 60;
        this.setPercentage(100);
    }

/**
* Sets the health bar to a specific percentage and updates the displayed image.
* @param {number} percentage - Health percentage (0 to 100).
*/
    setPercentage(percentage) {
        this.percentage = percentage;
        let index = this.resolveImageIndex();
        let path = this.images_bar[index];
        this.img = this.imageCache[path];
    }
    
/**
* Resolves the correct image index based on the current health percentage.
* Ensures the index is within bounds of the images_bar array.
* @returns {number} Index of the image to display for the current health percentage.
*/
    resolveImageIndex() {
        const maxIndex = this.images_bar.length - 1;
        let index = Math.round((this.percentage / 100) * maxIndex);
        if (index > maxIndex) index = maxIndex;
        if (index < 0) index = 0;
        return index;
    }
}