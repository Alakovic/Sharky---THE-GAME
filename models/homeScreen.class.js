class HomeScreen extends DrawableObject {
    ctx;
    canvas;
    keyboard;
    world;
    gameStatus; // home, start , win , lose , pause 
    startButton = new StartButton();
    fullScreenButton = new FullScreen();
    soundButtonOn = new SoundButton();
    info = new Info();
    background = new Image();
    bgroundMusic;
    showOverlay = true;
    showInfoOverlay = false;
    soundEnabled = true;

    constructor(canvas,keyboard) {
        super();
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.gameStatus = 'home';
        this.setBackground(); 
        this.prepareMusic();
        this.loadInstructionImages();
        this.draw();
        this.canvas.addEventListener('click', (event) => this.handleClick(event));
        this.canvas.addEventListener('mousemove', (event) => this.handleMouseMove(event));
        document.addEventListener('fullscreenchange', () => {
            if (!document.fullscreenElement) {
                this.resetCanvasScale(); 
            }
        });
    }

    draw() {
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
        this.ctx.drawImage(this.background, 0, 0, this.canvas.width, this.canvas.height);
        this.drawTitle();
        this.addToMap(this.startButton);
        this.addToMap(this.fullScreenButton);
        this.addToMap(this.soundButtonOn);
        this.addToMap(this.info);
        if (this.showOverlay) {
            this.drawOverlay();
        }
        if (this.showInfoOverlay) {
            this.drawInfoOverlay();
        }
        requestAnimationFrame(() => {this.draw()});
    }

    handleMouseMove(event) {
        const { mouseX, mouseY } = this.getMousePos(event);
        this.startButton.isHovered = this.startButton.isClicked(mouseX, mouseY);
        this.fullScreenButton.isHovered = this.fullScreenButton.isClicked(mouseX, mouseY);
        this.soundButtonOn.isHovered = this.soundButtonOn.isClicked(mouseX, mouseY);
        this.info.isHovered = this.info.isClicked(mouseX, mouseY);

        if (this.startButton.isHovered || this.fullScreenButton.isHovered || 
            this.soundButtonOn.isHovered || this.info.isHovered) {
            this.canvas.style.cursor = 'pointer';
        } else {
            his.canvas.style.cursor = 'default';
        }
    }

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

    prepareMusic() {
        this.bgroundMusic = new Audio('../assets/sounds/funny-cartoon-sound-397415 (1).mp3');
        this.bgroundMusic.loop = true;
    }

    setBackground(){
        this.background.src ='../assets/images/game_interface/startScreenButtons/1.png';
    }

    addToMap(button) {
        this.ctx.save();
        let scale = button.isHovered ? 1.2 : 1;
        this.ctx.translate(button.x + button.width / 2, button.y + button.height / 2);
        this.ctx.scale(scale, scale);
        this.ctx.translate(-button.width / 2, -button.height / 2);
        button.draw(this.ctx);
        this.ctx.restore();
    }


    drawOverlay() {
        const ctx = this.ctx;
        ctx.save();
        ctx.fillStyle = "rgba(0,0,0,0.6)";
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        ctx.font = "bold 40px Lucky";
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.fillText("🔊 Click to enable sound", this.canvas.width / 2, this.canvas.height / 2);
        ctx.restore();
    }

    handleClick(event) {
        const { mouseX, mouseY } = this.getMousePos(event);

        if (this.soundButtonOn.isClicked(mouseX, mouseY)) {
            this.toggleSound();
            return; 
        }

        if (this.showInfoOverlay) {
            this.showInfoOverlay = false;
            return;
        }

        if (this.info.isClicked(mouseX, mouseY)) {
            this.showInfoOverlay = !this.showInfoOverlay;
            return;
        }

        if (this.startButton.isClicked(mouseX, mouseY)) {
            this.startGame();
            return;
        }

        if (this.fullScreenButton.isClicked(mouseX, mouseY)) {
    this.toggleFullScreen();
    return;
}

        if (this.showOverlay) {
            this.bgroundMusic.play()
            this.showOverlay = false;
        }
    }

    getMousePos(event) {
        const rect = this.canvas.getBoundingClientRect();
        const scaleX = this.canvas.width / this.canvas.clientWidth;
        const scaleY = this.canvas.height / this.canvas.clientHeight;
        const mouseX = (event.clientX - rect.left) * scaleX;
        const mouseY = (event.clientY - rect.top) * scaleY;
        return { mouseX, mouseY };
    }

    toggleSound() {
        if (!this.bgroundMusic) return;
        this.soundEnabled = !this.soundEnabled;
        this.bgroundMusic.muted = !this.soundEnabled;

        if (this.soundEnabled) {
            this.soundButtonOn.loadImage('../assets/images/game_interface/startScreenButtons/speaker-filled-audio-tool.png');
        } else {
            this.soundButtonOn.loadImage('../assets/images/game_interface/startScreenButtons/volume-mute.png');
        }
    }

    loadInstructionImages() {
        this.instructionImages = [
            { img: new Image(), text: "Move Character", src: '../assets/images/game_interface/buttons/arrow keys.png' },
            { img: new Image(), text: "Fin Attack", src: '../assets/images/game_interface/buttons/Space Bar key.png' },
            { img: new Image(), text: "Bubble / Poison Attack", src: '../assets/images/game_interface/buttons/D key.png' }
        ];

        this.instructionImages.forEach(item => item.img.src = item.src);
    }

    drawInfoOverlay() {
        const ctx = this.ctx;
        ctx.save();
        ctx.fillStyle = "rgba(0,0,0,0.6)";
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        const startX = 300;
        const startY = 250;
        const imgHeight = 100;
        const padding = 150;
        let currentX = startX;

        this.instructionImages.forEach(item => {
            const imgWidth = this.drawInstructionItem(ctx, item, currentX, startY, imgHeight);
            currentX += imgWidth + padding;
        });

        ctx.restore();
    }   

    drawInstructionItem(ctx, item, x, y, imgHeight) {
            let imgWidth = imgHeight;
        if (item.text === "Fin Attack") {
            imgWidth = 150; 
        }
            ctx.drawImage(item.img, x, y, imgWidth, imgHeight);
        ctx.font = "24px Lucky";
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.fillText(item.text, x + imgWidth / 2, y + imgHeight + 25);
        return imgWidth; 
    }

    startGame() {
        if (this.bgroundMusic) {
            this.bgroundMusic.pause();
            this.bgroundMusic.currentTime = 0; 
        }
            world = new World(this.canvas, this.keyboard, currentLevel);
        
        if (world.backgroundMusic) {
            world.backgroundMusic.play().catch(e => console.log("Autoplay blocked"));
        }
    }

    toggleFullScreen() {
        const container = this.canvas.parentElement;
        if (!document.fullscreenElement) {
            container.requestFullscreen().then(() => this.scaleCanvas()).catch(err => {
                console.error(`Fullscreen failed: ${err.message}`);
            });
        } else {
            document.exitFullscreen().then(() => this.resetCanvasScale());
        }
    }

    scaleCanvas() {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const scaleX = screenWidth / this.canvas.width;
        const scaleY = screenHeight / this.canvas.height;
        this.scaleFactor = Math.min(scaleX, scaleY);
        this.canvas.style.width = `${this.canvas.width * this.scaleFactor}px`;
        this.canvas.style.height = `${this.canvas.height * this.scaleFactor}px`;
        this.canvas.style.marginLeft = `${(screenWidth - this.canvas.width * this.scaleFactor) / 2}px`;
        this.canvas.style.marginTop = `${(screenHeight - this.canvas.height * this.scaleFactor) / 2}px`;
    }

    resetCanvasScale() {
        this.canvas.style.width = '';
        this.canvas.style.height = '';
        this.canvas.style.marginLeft = '';
        this.canvas.style.marginTop = '';
    }

}