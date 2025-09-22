class HealthBarBoss extends DrawableObject{

    images_bar = [
        '../assets/images/game_interface/health_barBoss/0.png',
        '../assets/images/game_interface/health_barBoss/20.png',
        '../assets/images/game_interface/health_barBoss/40.png',
        '../assets/images/game_interface/health_barBoss/60.png',
        '../assets/images/game_interface/health_barBoss/80.png',
        '../assets/images/game_interface/health_barBoss/100.png',
    ]

    constructor(){
        super();
        this.loadImages(this.images_bar)
        this.x = 780;
        this.y = 10;
        this.width = 400;
        this.height = 60;
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let index = this.resolveImageIndex();
        let path = this.images_bar[index];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        const maxIndex = this.images_bar.length - 1;
        let index = Math.round((this.percentage / 100) * maxIndex);
        if (index > maxIndex) index = maxIndex;
        if (index < 0) index = 0;
        return index;
    }
}