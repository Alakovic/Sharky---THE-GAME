class PinkFish extends Fish {

    images_pink = [
        './assets/images/enemies/pinkFish/2.swim1.png',
        './assets/images/enemies/pinkFish/2.swim2.png',
        './assets/images/enemies/pinkFish/2.swim3.png',
        './assets/images/enemies/pinkFish/2.swim4.png',
        './assets/images/enemies/pinkFish/2.swim5.png'
    ];

    images_dead = [
        './assets/images/enemies/pinkFish/dead/2.2.png',
        './assets/images/enemies/pinkFish/dead/2.3.png',
        './assets/images/enemies/pinkFish/dead/2.png'
    ]

    constructor(x,y,option = "option1") {
        super();
        this.loadImage(this.images_pink[0]);
        this.loadImages(this.images_pink);
        this.loadImages(this.images_dead);
        this.animate(this.images_pink, this.images_dead);
        this.x = x
        this.y = y;
        this.damage = 10;
        this.applyOption(option);
    }

}