class HomeScreen extends DrawableObject {
    ctx;
    canvas;
    keyboard;
    gameStatus; // home, start , win , lose , pause 
    startButton = new StartButton();
    fullScreenButton = new FullScreen();
    soundButtonOn = new SoundButton();
    info = new Info();
    background = new Image();
    bgroundMusic;

    constructor(canvas,keyboard) {
        super();
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.gameStatus = 'home';
        this.setBackground(); 
        this.playMusic();
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
        this.ctx.drawImage(this.background, 0, 0, this.canvas.width, this.canvas.height);
        this.drawTitle();
        this.addToMap(this.startButton);
        this.addToMap(this.fullScreenButton);
        this.addToMap(this.soundButtonOn);
        this.addToMap(this.info);
        requestAnimationFrame(() => {this.draw()});
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

    playMusic(){
        this.bgroundMusic = new Audio('../assets/sounds/funny-cartoon-sound-397415 (1).mp3');
        this.bgroundMusic.loop = true;
        this.bgroundMusic.play()
    }

    setBackground(){
        this.background.src ='../assets/images/game_interface/startScreenButtons/1.png';
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
}