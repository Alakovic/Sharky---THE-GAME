class GreenJellyFish extends jellyFish {

    images_green = [
        '/assets/images/enemies/greenJellyFish/Green 1.png',
        '/assets/images/enemies/greenJellyFish/Green 2.png',
        '/assets/images/enemies/greenJellyFish/Green 3.png',
        '/assets/images/enemies/greenJellyFish/Green 4.png'
    ]

    constructor(x,y,range,variant= "variant1",direction="up"){
        super();
        this.loadImage(this.images_green[0]);
        this.loadImages(this.images_green);
        this.animate(this.images_green);
        this.x = x;
        this.y = y;
        this.damage = 20;
        this.range = range;
        this.direction=direction;
        this.applyVariant(variant)
        this.movingSquare()
    }

}