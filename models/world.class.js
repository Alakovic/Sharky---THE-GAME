class World {
    character = new Character();
    level;
    ctx;    
    canvas;
    keyboard;
    camera_x = 0;
    healthBar = new HealthBar();
    coinBar = new CoinBar();
    poisonBar = new PoisonBar();
    second = 0;
    
    constructor(canvas , keyboard,level) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.level = level;
        this.draw();
        this.setWorld();
        setInterval(() => {
            this.second++;
        }, 1000)
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
        this.addObjectsToMap(this.level.hearth);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x,0);
        //----Space for fixed objects --- 
        this.addToMap(this.healthBar);
        this.addToMap(this.coinBar);
        this.addToMap (this.poisonBar);
        this.ctx.translate(this.camera_x,0);
        this.ctx.translate(-this.camera_x,0);

        this.drawTimeText();
    
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

    drawTimeText() {
        this.ctx.font = '30px Arial';
        this.ctx.fillStyle = '#f72307ff' ;
        this.ctx.textAlign = 'left' ;
        this.ctx.fillText(this.formatTime(), this.canvas.width / 2, 30);
    }

    formatTime() {
        const minutes = Math.floor(this.second / 60);
        const seconds = this.second % 60;
        return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    }
}