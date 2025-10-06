/**
 * Represents a bubble projectile in the game.
 * Extends MovableObject to inherit movement and collision behavior.
 */

class Bubble extends MovableObject {
    speed = 10;       
    width = 40;       
    height = 40;      
    direction = 1; 
    damage = 20;   
    
    offset = {
        top: 5,
        bottom: 5,
        left: 5,
        right: 5
    }

/**
     * Creates a new bubble instance.
     * @param {number} x - Initial x-coordinate of the bubble.
     * @param {number} y - Initial y-coordinate of the bubble.
     * @param {number} direction - Direction of movement (1 for right, -1 for left).
     */
    constructor(x, y, direction) {
        super().loadImage('../assets/images/bubble/bubbleGreen.png'); 
        this.x = x;          
        this.y = y;          
        this.direction = direction;
        this.otherDirection = direction < 0; 
    }

/**
* Updates the bubble's position based on its speed and direction.
*/
    update() {
        this.x += this.speed * this.direction;
    }
    

}