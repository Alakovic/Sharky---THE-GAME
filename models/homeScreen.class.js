/**
 * Represents the game's home/start screen, including buttons, overlays, and background rendering.
 * This class handles drawing, hover effects, click detection, and music control for the main menu.
 * @extends DrawableObject
 */

class HomeScreen extends DrawableObject {
    ctx;
    canvas;
    keyboard;
    world;
    startButton = new StartButton();
    fullScreenButton = new FullScreen('assets/images/game_interface/startScreenButtons/fullscreen-black.png',1130,140,30,30);
    soundButtonOn = new SoundButton('assets/images/game_interface/startScreenButtons/speaker-filled-audio-tool.png',1130, 30 , 40, 40);
    info = new Info('assets/images/game_interface/startScreenButtons/info.png', 1125,80,40,40);
    aboutMe = new AboutMe();
    background = new Image();
    bgroundMusic;
    showOverlay = true;
    showInfoOverlay = false;
    soundEnabled = true;
    showAboutMe = false;

/**
* Creates a new HomeScreen instance.
* @param {HTMLCanvasElement} canvas - The canvas element to render the home screen.
* @param {Keyboard} keyboard - The keyboard input handler.
*/
    constructor(canvas,keyboard) {
        super();
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setBackground(); 
        this.prepareMusic();
        this.draw();
        this.canvas.addEventListener('click', (event) => this.handleClick(event));
        this.canvas.addEventListener('mousemove', (event) => this.handleMouseMove(event));
        document.addEventListener('fullscreenchange', () => {
            if (!document.fullscreenElement) {
                resetCanvasScale(this.canvas); 
            }
        });
    }

/**
* Continuously draws the home screen and its UI elements using requestAnimationFrame.
* Handles overlays and button rendering.
*/
    draw() {
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
        this.ctx.drawImage(this.background, 0, 0, this.canvas.width, this.canvas.height);
        this.drawTitle();
        this.addToMap(this.startButton);
        this.addToMap(this.fullScreenButton);
        this.addToMap(this.soundButtonOn);
        this.addToMap(this.info);
        this.addToMap(this.aboutMe);
        if (this.showOverlay) {
            this.drawOverlay();
        }
        if (this.showInfoOverlay) {
            drawInfoOverlay(this.ctx, this.canvas,instructionImages);
        }
        if(this.showAboutMe){
            this.drawAboutMe();
        }
        requestAnimationFrame(() => {this.draw()});
    }

/**
* Handles mouse movement for hover effects and cursor changes.
* @param {MouseEvent} event - The mouse move event.
*/
    handleMouseMove(event) {
        if (this.blockHover()) return;
        const { mouseX, mouseY } = this.getMousePos(event);
        this.resetHover();
        this.updateHover(mouseX, mouseY);

        if (this.startButton.isHovered || this.fullScreenButton.isHovered || this.soundButtonOn.isHovered || this.info.isHovered || this.aboutMe.isHovered) {
            this.canvas.style.cursor = 'pointer';
        } else {
            this.canvas.style.cursor = 'default';
        }
    }

/**
 * Resets the hover state for all buttons.
*/
    resetHover() {
        this.startButton.isHovered = false;
        this.fullScreenButton.isHovered = false;
        this.soundButtonOn.isHovered = false;
        this.info.isHovered = false;
        this.aboutMe.isHovered = false;
    }

/**
* Updates the hover state for buttons based on mouse position.
* @param {number} mouseX - The x-coordinate of the mouse.
* @param {number} mouseY - The y-coordinate of the mouse.
*/    
    updateHover(mouseX, mouseY) {
        this.startButton.isHovered = this.startButton.isClicked(mouseX, mouseY);
        this.fullScreenButton.isHovered = this.fullScreenButton.isClicked(mouseX, mouseY);
        this.soundButtonOn.isHovered = this.soundButtonOn.isClicked(mouseX, mouseY);
        this.info.isHovered = this.info.isClicked(mouseX, mouseY);
        this.aboutMe.isHovered = this.aboutMe.isClicked(mouseX, mouseY);
    }

/**
* Prevents hover effects when overlays are active.
* @returns {boolean} True if hover should be blocked.
*/    
    blockHover() {
        if (this.showOverlay || this.showInfoOverlay) {
            this.canvas.style.cursor = 'default';
            return true ;
        }
        return false;
    }

/**
* Draws the game title on the home screen.
*/    
    drawTitle() {
        const ctx = this.ctx;
        ctx.font = 'bold 70px Lucky';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillStyle = '#FDF8FB';
        ctx.fillText('SHARKIE - THE GAME', this.canvas.width / 2, 200);
        ctx.lineWidth = 4;
        ctx.strokeStyle = '#BF067F'
        ctx.strokeText('SHARKIE - THE GAME', this.canvas.width / 2, 200);
        ctx.shadowColor = 'transparent';
    }

/**
* Loads and prepares background music for the home screen.
*/
    prepareMusic() {
        this.bgroundMusic = new Audio('assets/sounds/funny-cartoon-sound-397415 (1).mp3');
        this.bgroundMusic.loop = true;
    }


/**
* Sets the background image for the home screen.
*/    
    setBackground(){
        this.background.src ='assets/images/game_interface/startScreenButtons/1.png';
    }

/**
* Draws a button on the canvas with hover scaling.
* @param {DrawableObject} button - The button to draw.
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
* Draws the main overlay screen with game title, goal, hints, and start instruction.
*/
    drawOverlay() {
        const ctx = this.ctx;
        ctx.save();
        ctx.fillStyle = "rgba(0,0,0,0.7)";
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawOverlayTitleAndGoal(ctx);
        this.drawOverlayHints(ctx);
        ctx.font = "bold 32px Lucky";
        ctx.fillStyle = "#BF067F";
        ctx.textAlign = "center";
        ctx.fillText("Click anywhere to start", this.canvas.width / 2, 520);
        ctx.restore();
    }

/**
* Draws the overlay's title and the main game goal.
* @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
*/
    drawOverlayTitleAndGoal(ctx) {
        ctx.font = "bold 40px Lucky";
        ctx.fillStyle = "#BF067F";
        ctx.textAlign = "center";
        ctx.fillText("Underwater Adventure", this.canvas.width / 2, 150);
        ctx.font = "24px Lucky";
        ctx.fillText("Goal: Reach the end of the ocean and defeat the boss!", this.canvas.width / 2, 230);
    }

/**
* Draws gameplay hints, including enemies and item usage tips.
* @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
*/
    drawOverlayHints(ctx) {
        ctx.font = "25px Lucky";
        ctx.fillStyle = "#BF067F";
        ctx.textAlign = "center";
        ctx.fillText("🐟 Fish can be defeated with tail hits or poison bubbles", this.canvas.width / 2, 300);
        ctx.fillText("🐙 Jellyfish can't be defeated — avoid them!", this.canvas.width / 2, 340);
        ctx.fillText("👑 Boss can only be defeated with poisoned bubbles", this.canvas.width / 2, 380);
        ctx.fillText("⚗️ You only have 5 poison bubbles — use them wisely!", this.canvas.width / 2, 430);
    }
/**
* Handles click events for overlays and buttons.
* @param {MouseEvent} event - The mouse click event.
*/    
    handleClick(event) {
        const { mouseX, mouseY } = this.getMousePos(event);
        if(this.handleOverlayClicks()) return;
        if(this.handleButtonClick(mouseX,mouseY)) return;
    }

/**
* Handles clicks on overlays (start, info, about screens).
* @returns {boolean} True if an overlay was interacted with.
*/    
    handleOverlayClicks() {
        if (this.showOverlay) return this.bgroundMusic.play(), this.showOverlay = false, true;
        if (this.showInfoOverlay) return this.showInfoOverlay = false, true;
        if (this.showAboutMe) return this.showAboutMe = false, true;
        return false;
    }

/**
* Handles button clicks on the home screen.
* @param {number} x - Mouse X coordinate.
* @param {number} y - Mouse Y coordinate.
* @returns {boolean} True if a button was clicked.
*/    
    handleButtonClick(x,y) {
        if (this.soundButtonOn.isClicked(x, y)) return this.toggleSound(), true;
        if (this.info.isClicked(x, y)) return this.showInfoOverlay = !this.showInfoOverlay, true;
        if (this.aboutMe.isClicked(x, y)) return this.showAboutMe = !this.showAboutMe, true;
        if (this.startButton.isClicked(x, y)) return this.startGame(), true;
        if (this.fullScreenButton.isClicked(x, y)) return toggleFullScreen(this.canvas), true;
        return false;
    }

/**
* Calculates mouse position relative to the canvas.
* @param {MouseEvent} event - The mouse event.
* @returns {{ mouseX: number, mouseY: number }} The mouse position.
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
* Toggles background sound on or off and updates the sound icon.
*/    
    toggleSound() {
        if (!this.bgroundMusic) return;
        this.soundEnabled = !this.soundEnabled;
        this.bgroundMusic.muted = !this.soundEnabled;

        if (this.soundEnabled) {
            this.soundButtonOn.loadImage('assets/images/game_interface/startScreenButtons/speaker-filled-audio-tool.png');
        } else {
            this.soundButtonOn.loadImage('assets/images/game_interface/startScreenButtons/volume-mute.png');
        }
    }

/**
* Draws the "About Me" screen with information about the developer.
*/
    drawAboutMe() {
        const ctx = this.ctx;
        ctx.save();
        ctx.fillStyle = "rgba(0,0,0,1)";
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawAboutMeTitle(ctx);
        this.drawAboutMeText(ctx);
        ctx.restore();
    }

/**
* Draws the title section on the "About Me" overlay.
* @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
*/    
    drawAboutMeTitle(ctx) {
        ctx.font = 'bold 60px Lucky';
        ctx.fillStyle = '#FDF8FB';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText('SHARKIE - THE GAME', this.canvas.width / 2, 50);
    }

/**
* Draws text content on the "About Me" screen.
* @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
*/    
    drawAboutMeText(ctx) {
        ctx.font = '24px Lucky';
        ctx.fillStyle = '#ffffff';
        const textLines = [
            "This game was created by Zeljko Alakovic as part of my studies at Developer Akademie.",
            "It showcases my skills in JavaScript, Canvas, and game development.",
            "I hope you enjoy playing it as much as I enjoyed creating it!"
        ];

        let startY = 250;
        const lineHeight = 35;
        textLines.forEach(line => {
            ctx.fillText(line, this.canvas.width / 2, startY);
            startY += lineHeight;
        });
    }


/**
* Starts the actual game by creating a World instance and playing background music.
*/    
    startGame() {
        const isPortrait = window.innerHeight > window.innerWidth;
    if (isPortrait && /Mobi|Android/i.test(navigator.userAgent)) {
        alert("Please rotate your device to landscape mode before starting the game!");
        return;
    }
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

}