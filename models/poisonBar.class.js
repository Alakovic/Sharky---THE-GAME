/**
 * Represents the poison bar UI element that displays the player's available poison.
 * Extends DrawableObject to allow rendering on the canvas.
 */
class PoisonBar extends DrawableObject {
    
    images_bar = [
        'assets/images/game_interface/poison_bar/0.png',
        'assets/images/game_interface/poison_bar/20.png',
        'assets/images/game_interface/poison_bar/40.png',
        'assets/images/game_interface/poison_bar/60.png',
        'assets/images/game_interface/poison_bar/80.png',
        'assets/images/game_interface/poison_bar/100.png',
    ]

    percentage = 100;

/**
* Creates a new PoisonBar instance and initializes its properties.
*/
    constructor(){
        super();
        this.loadImages(this.images_bar)
        this.x = 35;
        this.y = 110;
        this.width = 300;
        this.height = 60;
        this.setPercentage(0);
    }

/**
* Updates the poison bar to reflect the current poison percentage.
* @param {number} percentage - The new poison percentage (0-100).
*/
    setPercentage(percentage) {
        this.percentage = percentage;
        let index = this.resolveImageIndex();
        let path = this.images_bar[index];
        this.img = this.imageCache[path];
    }

/**
* Resolves the index of the image to use based on the current percentage.
* @returns {number} The index of the image to display.
*/
    resolveImageIndex() {
        const maxIndex = this.images_bar.length - 1;
        let index = Math.floor((this.percentage / 100) * maxIndex);
        if (index > maxIndex) index = maxIndex;
        if (index < 0) index = 0;
        return index;
    }
}