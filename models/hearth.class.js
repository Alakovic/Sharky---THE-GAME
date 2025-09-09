class Hearth extends MovableObject {

    images_hearth = [
        '../assets/images/hearth/1.png',
        '../assets/images/hearth/2.png',
        '../assets/images/hearth/3.png',
        '../assets/images/hearth/4.png',
        '../assets/images/hearth/5.png',
        '../assets/images/hearth/6.png'
    ];

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
    
    offset = {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
    }

    animate() {
        setInterval(() => {
            this.animationFrameSpeed(1)
            this.playAnimations(this.images_hearth);
        }, 200 ); 
    }
}