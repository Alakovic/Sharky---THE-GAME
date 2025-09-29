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

    getHitbox() {
        return {
            left: this.x + (this.offset?.left || 0),
            right: this.x + this.width - (this.offset?.right || 0),
            top: this.y + (this.offset?.top || 0),
            bottom: this.y + this.height - (this.offset?.bottom || 0)
        };
    }

    drawHitbox(ctx) {
        if (this.isCollidable()) {
            const hb = this.getHitbox();
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "red";
            ctx.rect(hb.left, hb.top, hb.right - hb.left, hb.bottom - hb.top);
            ctx.stroke();
        }
    }

    isCollidable() {
        return (
            this instanceof Character ||
            this instanceof Coin ||
            this instanceof Poison ||
            this instanceof Hearth ||
            this instanceof Fish ||
            this instanceof jellyFish ||
            this instanceof Boss ||
            this instanceof Bubble
        );
    }

    isClicked(mouseX, mouseY) {
        return (
            mouseX >= this.x &&
            mouseX <= this.x + this.width &&
            mouseY >= this.y &&
            mouseY <= this.y + this.height
        );
    }
    
}