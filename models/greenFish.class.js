class GreenFish extends Fish {
   images_green = [
        './assets/images/enemies/greenFish/1.swim1.png',
        './assets/images/enemies/greenFish/1.swim2.png',
        './assets/images/enemies/greenFish/1.swim3.png',
        './assets/images/enemies/greenFish/1.swim4.png',
        './assets/images/enemies/greenFish/1.swim5.png'
    ];

    images_dead = [
        './assets/images/enemies/greenFish/dead/1.png',
        './assets/images/enemies/greenFish/dead/2.png',
        './assets/images/enemies/greenFish/dead/3.png'
    ]

    constructor(x,y,option = "option2") {
        super();
        this.loadImage(this.images_green[0]);
        this.loadImages(this.images_green);
        this.loadImages(this.images_dead);
        this.animate(this.images_green, this.images_dead);
        this.x = x;
        this.y = y;
        this.speed = 2.4;
        this.damage = 10;
        this.applyOption(option);
    }
}