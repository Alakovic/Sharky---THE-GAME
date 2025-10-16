class PinkJellyFish extends jellyFish {

    images_pink = [
        '/assets/images/enemies/pinkJellyFish/Pink 1.png',
        '/assets/images/enemies/pinkJellyFish/Pink 2.png',
        '/assets/images/enemies/pinkJellyFish/Pink 3.png',
        '/assets/images/enemies/pinkJellyFish/Pink 4.png'
    ]

    constructor(x,y,range,variant= "variant1",direction="up"){
        super();
        this.loadImage(this.images_pink[0]);
        this.loadImages(this.images_pink);
        this.animate(this.images_pink);
        this.x = x;
        this.y = y;
        this.damage = 20;
        this.range = range;
        this.direction=direction;
        this.applyVariant(variant)
        this.movingSquare()
    }

}