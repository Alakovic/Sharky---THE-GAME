class jellyFish extends MovableObject {

    height = 100;
    width =100;

    constructor(){
    super();
    }

    animate(images) {
        setInterval(() => {
            this.animationFrameSpeed(1);
            this.playAnimations(images);
        }, 100);
    }
}