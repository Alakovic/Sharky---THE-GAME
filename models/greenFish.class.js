class GreenFish extends Fish {
    constructor(x,y,option = "option2") {
        super();
        this.loadImage(GameAssets.enemies.greenFish.swim[0]);
        this.loadImages(GameAssets.enemies.greenFish.swim);
        this.loadImages(GameAssets.enemies.greenFish.dead);
        this.animate(GameAssets.enemies.greenFish.swim, GameAssets.enemies.greenFish.dead);
        this.x = x;
        this.y = y;
        this.speed = 2.4;
        this.damage = 10;
        this.applyOption(option);
    }

    clone() {
       return new GreenFish(this.x, this.y, this.option);
    }
}