class World {
    character = new Character();
    level;
    ctx;    
    canvas;
    keyboard;
    camera_x = 0;
    
    constructor(canvas , keyboard,level) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.level = level;
        this.draw();
        this.setWorld();
    }

    setWorld(){
        this.character.world = this;
    }

    draw(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
        this.ctx.translate(this.camera_x,0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.obstacle);
        this.addObjectsToMap(this.level.poison);
        this.addObjectsToMap(this.level.coin);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x,0);
        //----Space for fixed objects --- 
        
        this.ctx.translate(this.camera_x,0);
        this.ctx.translate(-this.camera_x,0);
    
        requestAnimationFrame(() => {this.draw()}); // draw() wird immer wieder aufgerufen
    }

    addToMap(mo) {
        this.ctx.save();
        if (mo instanceof MovableObject) {
            mo.flipImage(this.ctx);
        } else {
            this.ctx.translate(mo.x, mo.y); 
        }
        mo.draw(this.ctx);         
        this.ctx.restore();
    }

    addObjectsToMap(objects){
        objects.forEach(o => {
            this.addToMap(o)
        });
    }
}