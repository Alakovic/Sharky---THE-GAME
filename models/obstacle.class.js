class Obstacle extends MovableObject {

    constructor(imagePath, x, y, width, height, hitboxes = []) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.hitboxes = hitboxes.length > 0 ? hitboxes : [{
            top: 10,
            bottom: 10,
            left: 10,
            right: 10
        }];
    }

    drawHitboxesObstacle(ctx) {
        ctx.lineWidth = 2;
        ctx.strokeStyle = "red";
        this.hitboxes.forEach(hb => {
            ctx.beginPath();
            ctx.rect(
                this.x + (hb.left || 0),
                this.y + (hb.top || 0),
                this.width - (hb.left || 0) - (hb.right || 0),
                this.height - (hb.top || 0) - (hb.bottom || 0)
            );
            ctx.stroke();
        });
    }
}
