/**
 * Represents the coin bar UI element showing the player's collected coins as a percentage.
 * Extends DrawableObject to inherit drawing capabilities on the canvas.
 */
class CoinBar extends DrawableObject {

    images_bar = [
        '../assets/images/game_interface/coin_bar/0.png',
        '../assets/images/game_interface/coin_bar/20.png',
        '../assets/images/game_interface/coin_bar/40.png',
        '../assets/images/game_interface/coin_bar/60.png',
        '../assets/images/game_interface/coin_bar/80.png',
        '../assets/images/game_interface/coin_bar/100.png'
    ]

    percentage = 100;

/**
* Creates a new CoinBar instance, loads images, and sets initial position and size.
*/
    constructor(){
        super();
        this.loadImages(this.images_bar)
        this.x = 35;
        this.y = 60;
        this.width = 240;
        this.height = 60;
        this.setPercentage(0);
    }

/**
* Updates the coin bar to reflect the given percentage of collected coins.
* @param {number} percentage - Percentage of coins collected (0 to 100).
*/
    setPercentage(percentage) {
        this.percentage = percentage;
        let index = this.resolveImageIndex();
        let path = this.images_bar[index];
        this.img = this.imageCache[path];
    }

/**
* Resolves the index of the image to display based on the current percentage.
* @returns {number} Index of the corresponding image in the images_bar array.
*/    
    resolveImageIndex() {
        const maxIndex = this.images_bar.length - 1;
        let index = Math.floor((this.percentage / 100) * maxIndex);
        if (index > maxIndex) index = maxIndex;
        if (index < 0) index = 0;
        return index;
    }
}