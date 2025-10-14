class Controller {
    
    constructor(character, canvas) {
        this.character = character;
        this.canvas = canvas;
        this.touchButtons = [];
        const btnSize = 60;
        const margin = 20;
        const c = this.character;
        const canvasW = canvas.width;
        const canvasH = canvas.height;
        this.touchButtons.push(new TouchButton('assets/images/game_interface/buttons/up.png', margin + btnSize, canvasH - btnSize*3, btnSize, btnSize, () => c.moveUp()));
        this.touchButtons.push(new TouchButton('assets/images/game_interface/buttons/down.png', margin + btnSize, canvasH - btnSize, btnSize, btnSize, () => c.moveDown()));
        this.touchButtons.push(new TouchButton('assets/images/game_interface/buttons/left.png', margin, canvasH - btnSize*2, btnSize, btnSize, () => c.moveLeft()));
        this.touchButtons.push(new TouchButton('assets/images/game_interface/buttons/right.png', margin + btnSize*2, canvasH - btnSize*2, btnSize, btnSize, () => c.moveRight()));
        this.touchButtons.push(new TouchButton('assets/images/game_interface/buttons/Space Bar key.png', canvasW - btnSize*2 - margin, canvasH - btnSize*2, btnSize, btnSize, () => c.handleTailAttack()));
        this.touchButtons.push(new TouchButton('assets/images/game_interface/buttons/D key.png', canvasW - btnSize - margin, canvasH - btnSize*2, btnSize, btnSize, () => c.handleBubbleAttack()));
        this.addTouchEvents();
    }

    draw(ctx) {
        this.touchButtons.forEach(btn => btn.draw(ctx));
    }

    addTouchEvents() {
    this.canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const rect = this.canvas.getBoundingClientRect();
        const scaleX = this.canvas.width / rect.width;
        const scaleY = this.canvas.height / rect.height;
        for (let touch of e.touches) {
            const x = (touch.clientX - rect.left) * scaleX;
            const y = (touch.clientY - rect.top) * scaleY;
            this.touchButtons.forEach(btn => {
                if (btn.isClicked(x, y)) btn.press();
            });
        }
    });

    this.canvas.addEventListener('touchend', (e) => {
        e.preventDefault();
        this.touchButtons.forEach(btn => btn.release());
    });
    }

    update() {
        this.touchButtons.forEach(btn => {
            if (btn.isPressed && btn.action) btn.action();
        });
    }

}