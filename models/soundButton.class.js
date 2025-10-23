class SoundButton extends DrawableObject {
  constructor(path, x, y, w, h) {
    super();
    this.loadImage(path);
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
  }
}
