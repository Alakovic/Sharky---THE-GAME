class LilaJellyFish extends jellyFish {

    images_lila = [
        './assets/images/enemies/lilaJellyFish/Lila 1.png',
        './assets/images/enemies/lilaJellyFish/Lila 2.png',
        './assets/images/enemies/lilaJellyFish/Lila 3.png',
        './assets/images/enemies/lilaJellyFish/Lila 4.png'
    ]

    constructor(x,option="option1") {
        super();
        this.loadImage(this.images_lila[0]);
        this.loadImages(this.images_lila);
        this.animate(this.images_lila);
        this.x = x;
        this.y = 250;
        this.damage = 10;
        this.applyOption(option);
    }
}