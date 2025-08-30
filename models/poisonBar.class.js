class PoisonBar extends DrawableObject {
    
    images_bar = [
        'assets/images/game_interface/poison_bar/0.png',
        'assets/images/game_interface/poison_bar/20.png',
        'assets/images/game_interface/poison_bar/40.png',
        'assets/images/game_interface/poison_bar/60.png',
        'assets/images/game_interface/poison_bar/80.png',
        'assets/images/game_interface/poison_bar/100.png',
    ]

    percentage = 100;

    constructor(){
        super();
        this.loadImages(this.images_bar)
        this.x = 35;
        this.y = 110;
        this.width = 300;
        this.height = 60;
        this.setPercentage(0);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let index = this.resolveImageIndex();
        let path = this.images_bar[index];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        const maxIndex = this.images_bar.length - 1;
        let index = Math.floor((this.percentage / 100) * maxIndex);
        if (index > maxIndex) index = maxIndex;
        if (index < 0) index = 0;
        return index;
    }
}