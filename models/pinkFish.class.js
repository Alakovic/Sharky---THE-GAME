class PinkFish extends Fish {
    constructor(x,y,option = "option1") {
        super();
        this.loadImage(GameAssets.enemies.pinkFish.swim[0]);
        this.loadImages(GameAssets.enemies.pinkFish.swim);
        this.loadImages(GameAssets.enemies.pinkFish.dead);
        this.animate(GameAssets.enemies.pinkFish.swim, GameAssets.enemies.pinkFish.dead);
        this.x = x
        this.y = y;
        this.damage = 10;
        this.applyOption(option);
    }

    clone(){
        return new PinkFish(this.x, this.y, this.option);
    }

}