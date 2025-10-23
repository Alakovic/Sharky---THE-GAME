class RestartButton extends DrawableObject {
  restart_image = [
    "assets/images/game_interface/startScreenButtons/restart.png",
    "assets/images/game_interface/startScreenButtons/undo.png",
    "assets/images/game_interface/endScreenButtons/Recurso 18.png",
  ];

  constructor(x, y, width = 50, height = 50, index = 1) {
    super();
    this.loadImage(this.restart_image[index]);
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}
