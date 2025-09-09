class Poison extends MovableObject {

    images_poison = [
        '../assets/images/poison/1.png',
        '../assets/images/poison/2.png',
        '../assets/images/poison/3.png',
        '../assets/images/poison/4.png',
        '../assets/images/poison/5.png',
        '../assets/images/poison/6.png',
        '../assets/images/poison/7.png',
        '../assets/images/poison/8.png'
    ]

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

    offset = {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
    }

    animate() {
        setInterval(() => {
            this.animationFrameSpeed(1)
            this.playAnimations(this.images_poison);
        }, 150 ); 
    }

}