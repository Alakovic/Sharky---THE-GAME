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
    boss = new Boss();
    bubbles = [];
    second = 0;
    totalCoins;
    totalPoison;
    
    constructor(canvas , keyboard,level) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.level = level;
        this.totalCoins = this.level.coin.length;
        this.totalPoison = this.level.poison.length;
        this.draw();
        this.setWorld();
        this.checkCollisions();
        setInterval(() => {
            this.second++;
        }, 1000)
    }

    setWorld(){
        this.character.world = this;
    }

    checkCollisions() {
        setInterval(() => {
            this.checkCoinCollection();
            this.checkPoisonCollection();
            this.checkHearthCollection();
            this.checkEnemyCollision();
            this.checkBossTrigger();
            this.checkBubbleFishCollision();
        }, 200)
    }

    draw(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
        this.ctx.translate(this.camera_x,0);
        this.updateBubbles();
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.obstacle);
        this.level.obstacle.forEach(obs => obs.drawHitboxesObstacle(this.ctx));
        this.addObjectsToMap(this.level.poison);
        this.addObjectsToMap(this.level.coin);
        this.addObjectsToMap(this.level.hearth);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.bubbles); 
        this.addToMap(this.character);
        this.addBossToMap();
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

    addBossToMap(){
        if (this.boss.state !== "hidden") {
            this.addToMap(this.boss);
        }
    }

    checkCoinCollection() {
        this.level.coin.forEach((coin, index) => {
            if(this.character.isColliding(coin)) {
                this.character.coinCount += coin.value;
                let percentage = Math.min((this.character.coinCount / this.totalCoins) * 100 , 100);
                this.coinBar.setPercentage(percentage)
                this.level.coin.splice(index,1) ; // Remove collected coin
            }
        });
    }

    checkPoisonCollection() {
        this.level.poison.forEach((poison,index) => {
            if(this.character.isColliding(poison)){
                this.character.poisonCount += 1;
                let percentage = Math.min((this.character.poisonCount / this.totalPoison) * 100, 100);
                this.poisonBar.setPercentage(percentage);
                this.level.poison.splice(index,1);// Remove collected poison
            }
        } )
    }

    checkHearthCollection() {
        this.level.hearth.forEach((hearth,index) =>{
            if(this.character.isColliding(hearth)){
                if(this.character.energy < 100) {
                    this.character.energy += hearth.value;

                    if (this.character.energy > 100)  this.character.energy = 100;  
                    this.healthBar.setPercentage(this.character.energy);
                    this.level.hearth.splice(index,1);
                }
            }
        });
    }
    
    checkEnemyCollision() {
        this.level.enemies.forEach((enemy) => {
            if( this.character.isColliding(enemy)) {
                this.character.hit(enemy.damage);
                this.healthBar.setPercentage(this.character.energy);
                this.character.damageType = enemy.damageType;
            }
        })
    }

    checkBossTrigger() {
        if (this.character.x > 13800 && this.boss.state === "hidden") {
            this.boss.state = "introduce";
            this.boss.startIntroduceAnimation();
        }
    }
    
    updateBubbles() {
            this.bubbles.forEach((bubble, index) => {
            bubble.update(); 
        });
    }

    checkBubbleFishCollision() {
    this.bubbles.forEach((bubble, bIndex) => {
        this.level.enemies.forEach((enemy) => {
            if(bubble.isColliding(enemy)) {
                enemy.hit(bubble.damage);   // oduzima energiju enemy-ju
                console.log(`Fish hit! Enemy energy: ${enemy.energy}`); // << ovde provjeri energiju
                this.bubbles.splice(bIndex, 1); // bubble nestaje nakon udarca
            }
        });
    });
}

    addToMap(mo) {
        this.ctx.save();
        if (mo instanceof MovableObject ) {
            mo.flipImage(this.ctx);
        } else {
            this.ctx.translate(mo.x, mo.y); 
        }
        mo.draw(this.ctx);         
        this.ctx.restore();
        mo.drawHitbox(this.ctx);
    }

    addObjectsToMap(objects){
        objects.forEach(o => {
            this.addToMap(o)
        });
    }

    drawTimeText() {
        this.ctx.font = '30px Lucky';
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