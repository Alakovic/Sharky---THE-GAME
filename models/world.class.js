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
    healthBarBoss = new HealthBarBoss();
    bubbles = [];
    second = 0;
    totalCoins;
    totalPoison;
    showMenuOverlay = false;
    menuButton = new MenuButton();
    paused = false;
    frozenFrame = null;
    
    constructor(canvas , keyboard,level) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.level = level;
        this.totalCoins = this.level.coin.length;
        this.totalPoison = this.level.poison.length;
        this.draw();
        this.setWorld();
        this.backgroundMusic = new Audio('../assets/sounds/underwater-loop-amb.wav');
        this.backgroundMusic.loop = true;
        this.checkCollisions();
        setInterval(() => {
            if(!this.paused){
                this.second++;
            }
        }, 1000)
        this.canvas.addEventListener('click', (event) => this.handleClick(event));
        this.canvas.addEventListener('mousemove', (event) => this.handleMouseMove(event));

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
            this.checkCharacterBossCollision();
            this.checkBubbleBossCollision();
        }, 200)
    }

    draw(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    if (this.showMenuOverlay && this.frozenFrame) {
        this.ctx.drawImage(this.frozenFrame, 0, 0, this.canvas.width, this.canvas.height);
    } else {
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
    }
        //----Space for fixed objects --- 
        this.addToMap(this.healthBar);
        this.addToMap(this.coinBar);
        this.addToMap (this.poisonBar);
        if(this.boss.state !== "hidden") {
        this.addToMap(this.healthBarBoss);
        }
        this.addToMap(this.menuButton); 
        if (this.showMenuOverlay) {
        this.drawMenuOverlay();
        }
        this.ctx.translate(this.camera_x,0);
        this.ctx.translate(-this.camera_x,0);

        this.drawTimeText();
        requestAnimationFrame(() => {this.draw()}); // draw() wird immer wieder aufgerufen
    }

    addBossToMap(){
        if (this.boss.state !== "hidden") {
            this.boss.checkAttack(this.character); 
            this.boss.updateBoss(this.character);  
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

    checkCharacterBossCollision() {
        if (this.character.isColliding(this.boss)) {
                this.character.hit(this.boss.damage); 
                this.healthBar.setPercentage(this.character.energy)
                this.character.damageType = 'poison';
            }
    }

    checkEnemyCollision() {
        this.level.enemies.forEach((enemy) => {
            if (!enemy.death && this.character.isColliding(enemy)) {
                if (!this.keyboard.SPACE) {
                    this.character.hit(enemy.damage);
                    this.healthBar.setPercentage(this.character.energy);
                    this.character.damageType = enemy.damageType;
                } else {
                    enemy.hit(this.character.finSlapDamage);
                    enemy.damage = 0;
                    const direction =  this.getKnockbackDirection(this.character, enemy); 
                    enemy.knockback(direction, -1);
                }
            }
        });
    }

    getKnockbackDirection(character, enemy) {
        let characterMid = character.x + character.width / 2;
        let enemyMid = enemy.x + enemy.width / 2;

        if (characterMid < enemyMid) {
            return 1;  // Character left - Fish goes right 
        } else {
            return -1; //Character right  - Fish goes left 
        }
    }

    checkBossTrigger() {
        if (this.character.x > 13800 && this.boss.state === "hidden") {
            this.boss.state = "introduce";
        }
    }
    
    updateBubbles() {
            this.bubbles.forEach((bubble) => {
            bubble.update(); 
        });
    }

    checkBubbleFishCollision() {
    this.bubbles.forEach((bubble, bIndex) => {
        this.level.enemies.forEach((enemy) => {
            if(bubble.isColliding(enemy)) {
                enemy.hit(bubble.damage);  
                this.bubbles.splice(bIndex, 1); 
                }
            });
        });
    }

    checkBubbleBossCollision() {
        if (this.boss.state === "hidden") return; 

        this.bubbles.forEach((bubble, bIndex) => {
            if (bubble.isColliding(this.boss)) {
                this.boss.hit(bubble.damage);
                this.healthBarBoss.setPercentage(this.boss.energy);   
                this.boss.state = "hurt";
                this.bubbles.splice(bIndex, 1); 
            }
        });
    }

    addToMap(mo) {
                this.ctx.save();
    if (mo instanceof MovableObject) {
                mo.flipImage(this.ctx);
    } else {
            if (mo.isHovered) {
                this.ctx.translate(mo.x + mo.width / 2, mo.y + mo.height / 2);
                this.ctx.scale(1.2, 1.2);
                this.ctx.translate(-mo.width / 2, -mo.height / 2);
            } else {
                this.ctx.translate(mo.x, mo.y);
            }
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

    getMousePos(event) {
        const rect = this.canvas.getBoundingClientRect();
        const scaleX = this.canvas.width / this.canvas.clientWidth;
        const scaleY = this.canvas.height / this.canvas.clientHeight;
        const mouseX = (event.clientX - rect.left) * scaleX;
        const mouseY = (event.clientY - rect.top) * scaleY;
        return { mouseX, mouseY };
    }

    drawMenuOverlay() {
        const ctx = this.ctx;
        ctx.save();
        const menuWidth = 400;
        const menuHeight = 70;
        const menuX = (this.canvas.width - menuWidth) / 2;  
        const menuY = (this.canvas.height - menuHeight) / 3;
        ctx.fillStyle = "white";
        ctx.fillRect(menuX, menuY, menuWidth, menuHeight);
        ctx.strokeStyle = "#048cf2";
        ctx.lineWidth = 3;
        ctx.strokeRect(menuX, menuY, menuWidth, menuHeight);
        this.addToMap(new HomeButton(menuX + 10 ,menuY + 10));
        this.addToMap(new RestartButton(menuX + 70 , menuY + 10));
        this.addToMap(new Info('assets/images/game_interface/startScreenButtons/info_blue.png',menuX + 130 , menuY + 10, 50,50));
        this.addToMap(new FullScreen('assets/images/game_interface/startScreenButtons/fullscreen-blue.png',menuX + 190 , menuY + 10, 50,50));
        this.addToMap(new SoundButton('assets/images/game_interface/startScreenButtons/sound.png',menuX + 250, menuY + 10 , 50, 50 ))
        ctx.restore();
    }

    handleClick(event) {
            const { mouseX, mouseY } = this.getMousePos(event);
    if (this.menuButton.isClicked(mouseX, mouseY)) {
            this.showMenuOverlay = !this.showMenuOverlay;
        if (this.showMenuOverlay) {
            this.frozenFrame = new Image();
            this.frozenFrame.src = this.canvas.toDataURL();
            this.paused = true;  
            this.backgroundMusic.pause();
        } else {
            this.frozenFrame = null; 
            this.paused = false;
            this.backgroundMusic.play();
            }
    }      
    }


    handleMouseMove(event) {
        const { mouseX, mouseY } = this.getMousePos(event);
        this.menuButton.isHovered = false;
    if (this.menuButton.isClicked(mouseX, mouseY)) {
        this.menuButton.isHovered = true;
        this.canvas.style.cursor = 'pointer';
    } else {
        this.canvas.style.cursor = 'default';
        }
    }
}