class HomeScreen extends DrawableObject {
    ctx;
    canvas;
    keyboard;
    gameStatus; // home, start , win , lose , pause 
    startButton = new StartButton();
    fullScreenButton = new FullScreen();
    background = new Image();

    constructor(canvas,keyboard) {
        super();
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.gameStatus = 'home';
        this.setBackground(); 
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
        this.ctx.drawImage(this.background, 0, 0, this.canvas.width, this.canvas.height);
        this.addToMap(this.startButton);
        this.addToMap(this.fullScreenButton);
        requestAnimationFrame(() => {this.draw()});
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