/**
 * Represents the end screen shown after winning or losing the game.
 * @extends DrawableObject
 */
class EndScreen extends DrawableObject {
    ctx;
    canvas;
    keyboard;
    outcome;
    background = new Image();
    tryAgainButton ;
    gameOverTitle ;


    /**
    * Creates an end screen.
    * @param {HTMLCanvasElement} canvas - The game canvas.
    * @param {string} outcome - "win" or "lose".
    * @param {Keyboard} keyboard - Keyboard input manager.
    */
    constructor(canvas,outcome,keyboard,world) {
        super();
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.outcome = outcome;
        this.keyboard = keyboard;
        this.world = world;
        this.setBackground(outcome);
        this.draw();
        this.canvas.addEventListener('click', (event) => this.handleClick(event));
        this.canvas.addEventListener('mousemove', (event) => this.handleMouseMove(event));
        this.canvas.addEventListener('touchstart', (event) => this.handleTouchStart(event), { passive: false });
        this.canvas.addEventListener('touchmove', (event) => this.handleTouchMove(event), { passive: false });
    }

    /**
    * Handles the start of a touch event on the end screen.
    * 
    * This method prevents the default touch behavior (such as scrolling) and 
    * simulates a mouse click event based on the touch coordinates. It allows 
    * the end screen buttons (like "Try Again") to work correctly on touch devices.
    * 
    * @param {TouchEvent} event - The touchstart event triggered by the user.
    * @returns {void}
    */
    handleTouchStart(event) {
        event.preventDefault()
        const touch = event.touches[0];
        const fakeEvent = {
            clientX: touch.clientX,
            clientY: touch.clientY
        };
        this.handleClick(fakeEvent); 
    }

    /**
    * Handles touch movement events on the end screen.
    * 
    * This method prevents the default scrolling behavior and simulates a mousemove 
    * event so that hover effects (like button scaling or cursor changes) work 
    * properly on touch devices.
    * 
    * @param {TouchEvent} event - The touchmove event triggered by the user.
    * @returns {void}
    */
    handleTouchMove(event) {
        event.preventDefault();
        const touch = event.touches[0];
        const fakeEvent = {
            clientX: touch.clientX,
            clientY: touch.clientY
        };
        this.handleMouseMove(fakeEvent); 
    }

    /** Main draw loop for the end screen. */
    draw() {
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.background, 0, 0, this.canvas.width, this.canvas.height);
       if (this.gameOverTitle) {
        this.ctx.drawImage(this.gameOverTitle, this.titleX, this.titleY, this.titleWidth, this.titleHeight);
        }
        this.addToMap(this.tryAgainButton);
        requestAnimationFrame(() => {this.draw()});
    }

    /**
    * Sets background based on game outcome.
    * @param {string} outcome
    */
    setBackground(outcome){
        if(outcome === 'win') {
           this.drawWinScreen();
        } else if ( outcome === 'lose') {
            this.drawLoseScreen();
        }
    }

    /** Configures the win screen. */
    drawWinScreen(){
        this.background.src = 'assets/images/game_interface/endScreenButtons/Mesa de trabajo 1.png';
        this.tryAgainButton = new RestartButton(500, 450,200,50, 2);
         this.gameOverTitle = null;
    }

    /** Configures the lose screen. */
    drawLoseScreen(){
        this.background.src = 'assets/images/game_interface/endScreenButtons/black.png';
        this.tryAgainButton = new RestartButton(500, 400, 200, 50, 2);
        this.drawGameOverTitle();
    }

    /** Draws the "Game Over" title image. */
    drawGameOverTitle(){
        this.gameOverTitle = new Image();
        this.gameOverTitle.src = 'assets/images/game_interface/endScreenButtons/Recurso 10.png';
        this.titleX = 300; 
        this.titleY = 200; 
        this.titleWidth = 600;
        this.titleHeight = 80;
    }

    /**
    * Draws a button with hover scaling.
    * @param {RestartButton} button
    */
    addToMap(button) {
        this.ctx.save();
        let scale = button.isHovered ? 1.2 : 1;
        this.ctx.translate(button.x + button.width / 2, button.y + button.height / 2);
        this.ctx.scale(scale, scale);
        this.ctx.translate(-button.width / 2, -button.height / 2);
        button.draw(this.ctx);
        this.ctx.restore();
    }

    /**
    * Handles mouse movement to update hover state.
    * @param {MouseEvent} event
    */
    handleMouseMove(event) {
    const { mouseX, mouseY } = this.getMousePos(event);

    this.tryAgainButton.isHovered = this.tryAgainButton.isClicked(mouseX, mouseY);
    if (this.tryAgainButton.isHovered) {
        this.canvas.style.cursor = 'pointer';
    } else {
        this.canvas.style.cursor = 'default';
    }
    }

    /**
    * Converts mouse event to canvas coordinates.
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

    /**
    * Updates hover state manually (optional).
    * @param {number} mouseX
    * @param {number} mouseY
    */
    updateHover(mouseX, mouseY) {
        this.tryAgainButton.isHovered = this.tryAgainButton.isClicked(mouseX, mouseY);
    }

    /**
    * Handles click events on the end screen.
    * @param {MouseEvent} event
    */
    handleClick(event) {
        const { mouseX, mouseY } = this.getMousePos(event);
        if (this.tryAgainButton && this.tryAgainButton.isClicked(mouseX, mouseY)) {
            this.startGame();
        }
    }

    /** Restarts the game when "Try Again" is clicked. */ 
    startGame() {
        this.stopWorld();
        if (this.bgroundMusic) {
            this.bgroundMusic.pause();
            this.bgroundMusic.currentTime = 0; 
        }
            currentLevel = createLevel1();
            world = new World(this.canvas, this.keyboard, currentLevel);
        
        if (world.backgroundMusic) {
            world.backgroundMusic.play().catch(e => console.log("Autoplay blocked"));
        }
    }

    /**
    * Stops all active processes, animations, sounds, and input listeners 
    * of the currently running game world when the end screen is shown.
    * 
    * This method safely cancels animation frames, clears intervals for game logic
    * (like timers and collision checks), pauses background music, removes input handlers,
    * and marks the world as paused.
    * 
    * @method stopWorld
    * @memberof EndScreen
    * @returns {void}
    */
    stopWorld() {
    if (!this.world) return;
    if (this.world.drawFrameId) cancelAnimationFrame(this.world.drawFrameId);
    if (this.world.timerInterval) clearInterval(this.world.timerInterval);
    if (this.world.collisionInterval) clearInterval(this.world.collisionInterval);
    if (this.world.sound && this.world.sound.background) {this.world.sound.background.pause();}
    if (this.world.controller) {this.world.controller.removeTouchEvents();}
    this.world.paused = true;
    console.log("🧹 World stopped");
    }
    
}