class EndScreen extends DrawableObject {
    ctx;
    canvas;
    keyboard;
    outcome;
    background = new Image();
    tryAgainButton ;
    gameOverTitle ;

    constructor(canvas,outcome,keyboard) {
        super();
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.outcome = outcome;
        this.keyboard = keyboard;
        this.setBackground(outcome);
        this.draw();
        this.canvas.addEventListener('click', (event) => this.handleClick(event));
        this.canvas.addEventListener('mousemove', (event) => this.handleMouseMove(event));
    }

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

    setBackground(outcome){
        if(outcome === 'win') {
           this.drawWinScreen();
        } else if ( outcome === 'lose') {
            this.drawLoseScreen();
        }
    }

    drawWinScreen(){
        this.background.src = 'assets/images/game_interface/endScreenButtons/Mesa de trabajo 1.png';
        this.tryAgainButton = new RestartButton(500, 450,200,50, 2);
         this.gameOverTitle = null;
    }

    drawLoseScreen(){
        this.background.src = 'assets/images/game_interface/endScreenButtons/black.png';
        this.tryAgainButton = new RestartButton(500, 400, 200, 50, 2);
        this.drawGameOverTitle();
    }

    drawGameOverTitle(){
        this.gameOverTitle = new Image();
        this.gameOverTitle.src = 'assets/images/game_interface/endScreenButtons/Recurso 10.png';
        this.titleX = 300; 
        this.titleY = 200; 
        this.titleWidth = 600;
        this.titleHeight = 80;
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

    handleMouseMove(event) {
    const { mouseX, mouseY } = this.getMousePos(event);

    this.tryAgainButton.isHovered = this.tryAgainButton.isClicked(mouseX, mouseY);
    if (this.tryAgainButton.isHovered) {
        this.canvas.style.cursor = 'pointer';
    } else {
        this.canvas.style.cursor = 'default';
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

    updateHover(mouseX, mouseY) {
        this.tryAgainButton.isHovered = this.tryAgainButton.isClicked(mouseX, mouseY);
    }

     handleClick(event) {
        const { mouseX, mouseY } = this.getMousePos(event);
        if (this.tryAgainButton && this.tryAgainButton.isClicked(mouseX, mouseY)) {
            this.startGame();
        }
    }

    startGame() {
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