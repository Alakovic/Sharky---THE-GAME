class YellowJellyFish extends jellyFish {

    images_yellow = [
        '../assets/images/enemies/yellowJellyFish/Yellow 1.png',
        '../assets/images/enemies/yellowJellyFish/Yellow 2.png',
        '../assets/images/enemies/yellowJellyFish/Yellow 3.png',
        '../assets/images/enemies/yellowJellyFish/Yellow 4.png'
    ]

    constructor(x) {
        super();
        this.loadImage(this.images_yellow[0]);
        this.loadImages(this.images_yellow);
        this.animate(this.images_yellow);
        this.x = x;
        this.y = 250;
        this.speedY = 2.5;
        this.damage = 10;
        this.startMoveUpDown(this.y - 200,this.y + 200);
    }
}