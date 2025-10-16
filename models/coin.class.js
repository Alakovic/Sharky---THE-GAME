/**
 * Represents a collectible coin in the game.
 * Extends MovableObject to inherit movement and collision capabilities.
 */

class Coin extends MovableObject {
    images_coin = [
        'assets/images/coin/1.png',
        'assets/images/coin/2.png',
        'assets/images/coin/3.png',
        'assets/images/coin/4.png'
    ];

/**
*  @type {Object} Collision offsets for fine-tuned hit detection. 
*/
    offset = {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
    }

/**
* Creates a new coin instance at the specified coordinates.
* @param {number} x - The x-coordinate of the coin.
* @param {number} y - The y-coordinate of the coin.
*/
    constructor(x,y) {
        super().loadImage(this.images_coin[0]);
        this.loadImages(this.images_coin);
        this.animate();
        this.x = x;
        this.y = y;
        this.width = 80;
        this.height = 80;
        this.value = 1.5;
    }

/**
* Starts the coin's spinning animation using a set interval.
* The animation cycles through the coin images at a fixed speed.
*/    
    animate() {
        setInterval(() => {
            this.animationFrameSpeed(1)
            this.playAnimations(this.images_coin);
        }, 150 ); 
    }
}