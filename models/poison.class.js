/**
 * Represents a poison item in the game that can be collected by the player.
 * Extends MovableObject to allow movement and animations.
 */
class Poison extends MovableObject {

    images_poison = [
        '/assets/images/poison/1.png',
        '/assets/images/poison/2.png',
        '/assets/images/poison/3.png',
        '/assets/images/poison/4.png',
        '/assets/images/poison/5.png',
        '/assets/images/poison/6.png',
        '/assets/images/poison/7.png',
        '/assets/images/poison/8.png'
    ]

/**
* Creates a new poison item at the given coordinates.
* @param {number} x - The x-coordinate of the poison item.
* @param {number} y - The y-coordinate of the poison item.
*/
    constructor(x,y){
        super().loadImage(this.images_poison[0]);
        this.loadImages(this.images_poison);
        this.animate();
        this.x = x;
        this.y = y;
        this.width = 70;
        this.height = 70;
        this.value = 20;
    }

/**
*  @type {Object} Collision offset values for the poison item 
*/
    offset = {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
    }

/**
* Animates the poison item by cycling through its images.
* Runs an interval to update the animation every 150ms.
*/
    animate() {
        setInterval(() => {
            this.animationFrameSpeed(1)
            this.playAnimations(this.images_poison);
        }, 150 ); 
    }

}