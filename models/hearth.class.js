/**
 * Represents a collectible heart item that restores health.
 * Extends MovableObject to allow animations and movement.
 */
class Hearth extends MovableObject {

    images_hearth = [
        '../assets/images/hearth/1.png',
        '../assets/images/hearth/2.png',
        '../assets/images/hearth/3.png',
        '../assets/images/hearth/4.png',
        '../assets/images/hearth/5.png',
        '../assets/images/hearth/6.png'
    ];

/**
* Creates a new Hearth instance at the given position.
* @param {number} x - The x-coordinate of the heart on the canvas.
* @param {number} y - The y-coordinate of the heart on the canvas.
*/
    constructor(x,y) {
        super().loadImage(this.images_hearth[0]);
        this.loadImages(this.images_hearth);
        this.animate();
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 60;
        this.value = 20;
    }

/** 
 * @type {Object} Collision offset for more precise hit detection.
 */
    offset = {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
    }

/**
* Animates the heart by cycling through its images at a fixed interval.
*/
    animate() {
        setInterval(() => {
            this.animationFrameSpeed(1)
            this.playAnimations(this.images_hearth);
        }, 200 ); 
    }
}