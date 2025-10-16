class MenuButton extends DrawableObject {
    constructor() {
        super();
        this.loadImage('assets/images/game_interface/startScreenButtons/menu-bar-blue.png');
        this.isHovered = false;
        this.x = 600;
        this.y = 70;
        this.width = 50;
        this.height = 50;
    }
}