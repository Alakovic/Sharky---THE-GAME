/**
 * Represents the game world, including the character, boss, level, UI, and all game objects.
 */
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
    sound = new SoundManager();
    
    /**
    * Creates a new game world instance.
    * @param {HTMLCanvasElement} canvas - The game canvas.
    * @param {Keyboard} keyboard - The keyboard input manager.
    * @param {Level} level - The current level object.
    */
    constructor(canvas , keyboard,level) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.level = level;
        this.totalCoins = this.level.coin.length;
        this.totalPoison = this.level.poison.length;
        this.uiManager = new UIManager(canvas, this.sound, this);
        this.initWorld();
        this.initCollisions();
        this.initTimer();
        this.initSounds();
        this.initEventListeners();
    }

    /** Initializes the world drawing and references for game objects. */
    initWorld(){
        this.draw();
        this.setWorld();
    }

    /** Initializes the collision manager and starts collision checks. */
    initCollisions(){
        this.collisionManager = new CollisionManager(this);
        this.checkCollisions();
    }

    /** Starts the in-game timer. */
    initTimer(){
         setInterval(() => {
            if(!this.paused){
                this.second++;
            }
        }, 1000);
    }

    /** Plays the background sound. */
    initSounds() {
        this.sound.play(this.sound.background);
    }
    
    /** Registers event listeners (e.g., fullscreen change). */
    initEventListeners(){
        document.addEventListener('fullscreenchange', () => {
            if (!document.fullscreenElement) {
                resetCanvasScale(this.canvas);
            }
        });
    }

    /** Sets the world reference for the character and boss. */
    setWorld(){
        this.character.world = this;
        this.boss.world = this;
    }

    /** Starts continuous collision checking. */
    checkCollisions() {
        setInterval(() => {
            this.collisionManager.checkAll();
        }, 200);
    }

    /** Main draw loop, renders the game world and UI. */
    draw(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.drawGameWorld();
        this.drawHUD();
        this.uiManager.draw(this.ctx);
        this.drawOverlays();
        this.drawTimeText();
        requestAnimationFrame(() => {this.draw()}); // draw() wird immer wieder aufgerufen
    }

    /** Draws the game world, including background, objects, enemies, and character. */
    drawGameWorld(){
        this.ctx.translate(this.camera_x,0);
        this.updateBubbles();
        this.drawBackground();
        this.drawEnemiesAndObjects();
        this.drawCharacterAndBoss();
        this.ctx.translate(-this.camera_x,0);
    }

    /** Draws background objects and obstacles. */
    drawBackground(){
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.obstacle);
       // this.level.obstacle.forEach(obs => obs.drawHitboxesObstacle(this.ctx));
    }

    /** Draws enemies, pickups, and bubbles. */
    drawEnemiesAndObjects(){
        this.addObjectsToMap(this.level.poison);
        this.addObjectsToMap(this.level.coin);
        this.addObjectsToMap(this.level.hearth);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.bubbles); 
    }

    /** Draws the player character and boss. */
    drawCharacterAndBoss(){
        this.addToMap(this.character);
        this.addBossToMap();
    }

    /** Draws the HUD (health, coins, poison, boss health). */
    drawHUD(){
        this.addToMap(this.healthBar);
        this.addToMap(this.coinBar);
        this.addToMap (this.poisonBar);
        if(this.boss.state !== "hidden") {this.addToMap(this.healthBarBoss);}
    }

    /** Draws overlays such as menu or info screens. */
    drawOverlays(){
        if (this.showMenuOverlay) this.drawMenuOverlay();
        if (this.showInfoOverlay) drawInfoOverlay(this.ctx, this.canvas, instructionImages);
    }

    /**
    * Handles character death sequence.
    * @param {string} damageType - Type of damage that killed the character.
    */
    handleCharacterDeath(damageType) {
        if (this.character.onDeathEndScreenShown) return;
        this.character.onDeathEndScreenShown = true;
        this.paused = true;
        this.sound.play(this.sound.lose);
        const deathImages = this.getDeathImages(damageType);
        this.animateDeath(deathImages,120,500);
    }

    /**
    * Returns death images based on damage type.
    * @param {string} damageType
    * @returns {string[]} Array of image keys
    */
    getDeathImages(damageType) {
        switch(damageType) {
        case 'poison':
            return this.character.images_deathPoison;
        case 'electro':
            return this.character.images_deathElectro;
        default:
            return this.character.images_deathPoison;
        }
    }

    /**
    * Animates the death of the character.
    * @param {string[]} images - Array of image keys.
    * @param {number} frameDuration - Duration per frame in ms.
    * @param {number} endScreenDelay - Delay before showing end screen.
    */
    animateDeath(images,frameDuration = 120, endScreenDelay = 500) {
        let frame = 0;
        const deathInterval = setInterval(() => {
            if (frame < images.length) {
                this.character.img = this.character.imageCache[images[frame]];
                frame++;
            } else {
                clearInterval(deathInterval);
                setTimeout(() => {
                    new EndScreen(this.canvas, 'lose', this.keyboard);
                }, endScreenDelay);
            }
        }, frameDuration);
    }

    /** Handles boss death sequence. */
    handleBossDeath(){
        if (this.boss.onDeathEndScreenShown) return;
        this.boss.onDeathEndScreenShown = true;
        this.paused = true;
        this.sound.play(this.sound.win);
        const deathImages = this.getBossDeathImages();
        this.animateBossDeath(deathImages,120,500);
    }

    /** Returns boss death images. */
    getBossDeathImages() {
        return [this.boss.images_dead];
    }

    /**
    * Animates boss death sequence.
    * @param {string[]} images
    * @param {number} frameDuration
    * @param {number} endScreenDelay
    */
    animateBossDeath(images, frameDuration = 120, endScreenDelay = 500) {
        let frame = 0;
        const deathInterval = setInterval(() => {
            if (frame < images.length) {
                this.boss.img = this.boss.imageCache[images[frame]];
                frame++;
            } else {
                clearInterval(deathInterval);
                setTimeout(() => {
                    new EndScreen(this.canvas, 'win', this.keyboard);
                }, endScreenDelay);
            }
        }, frameDuration);
    }

    /** Adds the boss to the map and updates its state. */
    addBossToMap(){
        if (this.boss.state !== "hidden") {
            this.boss.checkAttack(this.character); 
            this.boss.updateBoss(this.character);  
            this.addToMap(this.boss);         
        }
    }
    
    /** Updates all bubble objects. */
    updateBubbles() {
            this.bubbles.forEach((bubble) => {
            bubble.update(); 
        });
    }

    /**
    * Adds a drawable object to the canvas.
    * @param {DrawableObject} mo
    */
    addToMap(mo) {
    this.ctx.save();
    if (mo instanceof MovableObject) {
        mo.flipImage(this.ctx);
    } else {
        this.ctx.translate(mo.x, mo.y);
        if (mo.isHovered) {
            this.ctx.translate(mo.width / 2, mo.height / 2);
            this.ctx.scale(1.2, 1.2);
            this.ctx.translate(-mo.width / 2, -mo.height / 2);
        }
    }
    mo.draw(this.ctx);
    this.ctx.restore();
  //  mo.drawHitbox(this.ctx);
    }

    /**
    * Adds multiple objects to the canvas.
    * @param {DrawableObject[]} objects
    */
    addObjectsToMap(objects){
        objects.forEach(o => {
            this.addToMap(o)
        });
    }

    /** Draws the game time on the canvas. */
    drawTimeText() {
        this.ctx.font = '30px Lucky';
        this.ctx.fillStyle = '#f72307ff' ;
        this.ctx.textAlign = 'left' ;
        this.ctx.fillText(this.formatTime(), this.canvas.width / 2, 30);
    }

    /**
    * Formats the in-game timer.
    * @returns {string} Formatted time as MM:SS
    */
    formatTime() {
        const minutes = Math.floor(this.second / 60);
        const seconds = this.second % 60;
        return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    }

    /**
    * Converts a mouse event to canvas coordinates.
    * @param {MouseEvent} event
    * @returns {{mouseX: number, mouseY: number}}
    */
    getMousePos(event) {
        const rect = this.canvas.getBoundingClientRect();
        const scaleX = this.canvas.width / this.canvas.clientWidth;
        const scaleY = this.canvas.height / this.canvas.clientHeight;
        const mouseX = (event.clientX - rect.left) * scaleX;
        const mouseY = (event.clientY - rect.top) * scaleY;
        return { mouseX, mouseY };
    }

    /** Draws the menu overlay. */
    drawMenuOverlay() {
        if (!this.overlayButtons) this.overlayButtons = [];
        const ctx = this.ctx;
        ctx.save();
        this.overlayButtons.forEach(btn => this.addToMap(btn));
        ctx.restore();
    }

    /** Resets the entire game world state. */
    reset() {
        this.resetEntities();
        this.resetHUD();
        this.resetLevel();
        this.resetWorldState();
        this.resetUIState();
        this.uiManager.reset();
        this.resumeGame();
    }

    /** Resets the character and boss. */
    resetEntities() {
        this.character = new Character();
        this.boss = new Boss();
        this.setWorld();
    }

    /** Resets HUD elements. */
    resetHUD() {
        this.healthBar.setPercentage(this.character.energy);
        this.coinBar.setPercentage(0);
        this.poisonBar.setPercentage(0);
        this.healthBarBoss = new HealthBarBoss();
    }

    /** Resets level objects and bubbles. */
    resetLevel() {
        this.level.resetLevel();
        this.bubbles = [];
    }

    /** Resets camera and timer. */
    resetWorldState() {
        this.camera_x = 0;
        this.second = 0;
    }

    /** Resets UI state. */
    resetUIState() {
        this.showMenuOverlay = false;
        this.showInfoOverlay = false;
        this.overlayButtons = [];
        this.paused = false;
    }

     /** Pauses the game and background music. */
    pauseGame() {
        this.paused = true;
        this.sound.background.pause();
    }

     /** Resumes the game and background music if enabled. */
    resumeGame() {
        this.paused = false;
        if(this.sound.enabled) this.sound.background.play();
    }

}