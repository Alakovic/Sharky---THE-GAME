class Coin extends MovableObject {
    images_coin = [
        '../assets/images/coin/1.png',
        '../assets/images/coin/2.png',
        '../assets/images/coin/3.png',
        '../assets/images/coin/4.png'
    ];

    offset = {
        top: 70,
        bottom: 70,
        left: 70,
        right: 70
    }

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

    

    animate() {
        setInterval(() => {
            this.animationFrameSpeed(1)
            this.playAnimations(this.images_coin);
        }, 150 ); 
    }
}