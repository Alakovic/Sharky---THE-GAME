class TouchButton extends DrawableObject {
    action; 
    isPressed = false;

    constructor(imgPath, x, y, width, height, action) {
        super();
        this.loadImage(imgPath);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.action = action;
    }

    press() {
        this.isPressed = true;
    }

    release() {
        this.isPressed = false;
    }

    draw(ctx) {
        if (!this.img) return;
        ctx.save();
        const scale = this.isPressed ? 0.9 : 1; 
        ctx.translate(this.x + this.width/2, this.y + this.height/2);
        ctx.scale(scale, scale);
        ctx.translate(-this.width/2, -this.height/2);
        ctx.drawImage(this.img, 0, 0, this.width, this.height);
        ctx.restore();
    }

    isClicked(x, y) {
        return x >= this.x && x <= this.x + this.width &&
               y >= this.y && y <= this.y + this.height;
    }
}