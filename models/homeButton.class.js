class HomeButton extends DrawableObject {
  home_images = [
    "assets/images/game_interface/startScreenButtons/home.png",
    "assets/images/game_interface/startScreenButtons/home-button-blue.png",
  ];

  constructor(x, y) {
    super();
    this.loadImage(this.home_images[1]);
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
  }
}
