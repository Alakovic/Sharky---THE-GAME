class Obstacle extends MovableObject {
  constructor(imagePath, x, y, width, height, hitboxes = []) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.hitboxes = hitboxes.length > 0 ? hitboxes : [{top: 10,bottom: 10,left: 10,right: 10,},];
  }
}
