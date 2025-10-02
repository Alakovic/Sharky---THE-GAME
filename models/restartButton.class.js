class RestartButton extends DrawableObject {

    restart_image = [
        '../assets/images/game_interface/startScreenButtons/restart.png',
        'assets/images/game_interface/startScreenButtons/undo.png'
    ];

    constructor(x, y) {
        super();
        this.loadImage(this.restart_image[1]);
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
    }
}