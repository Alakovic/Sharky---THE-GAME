class PinkJellyFish extends jellyFish {
    constructor(x,y,range,variant= "variant1",direction="up"){
        super();
        this.loadImage(GameAssets.enemies.pinkJellyFish.swim[0]);
        this.loadImages(GameAssets.enemies.pinkJellyFish.swim);
        this.animate(GameAssets.enemies.pinkJellyFish.swim);
        this.x = x;
        this.y = y;
        this.damage = 20;
        this.range = range;
        this.direction=direction;
        this.applyVariant(variant)
        this.movingSquare()
    }

    clone() {
        return new PinkJellyFish(this.x, this.y, this.range, this.variant, this.direction);
    }

}