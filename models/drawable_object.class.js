class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0 ;
    x = 120;
    y = 400;
    height = 150;
    width = 100;
    otherDirection = false;

    draw(ctx) {
        if (this.img) {
            ctx.drawImage(this.img, 0, 0, this.width, this.height);
        }
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    flipImage(ctx) {
        if (this.otherDirection) {
            ctx.translate(this.x + this.width, this.y);
            ctx.scale(-1, 1);
        } else {
            ctx.translate(this.x, this.y);
        }
    }
/*
    drawHitbox(ctx) {
    if(this.isCollidable()) {
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "red";
        ctx.rect(
            this.offset.left,
            this.offset.top,
            this.width - this.offset.left - this.offset.right,
            this.height - this.offset.top - this.offset.bottom
        );
        ctx.stroke();
        }
    }

    isCollidable() {
        return (
            this instanceof Character || 
            this instanceof Ant ||
            this instanceof Snake ||
            this instanceof Rabbit ||
            this instanceof Obstacle ||
            this instanceof Box ||
            this instanceof Coin ||
            this instanceof Hearth ||
            this instanceof Diamond ||
            this instanceof Centipede
        );
    }
    */
}