class Impressum extends DrawableObject {
    constructor() {
        super();
        this.loadImage('assets/images/game_interface/startScreenButtons/impressum.png');
        this.x = 1120;
        this.y = 250;
        this.width = 50;
        this.height = 50;
        this.isVisible = false;
    }

    show() {
        this.isVisible = true;
    }

    hide() {
        this.isVisible = false;
    }

    drawOverlay(ctx, canvas) {
        if (!this.isVisible) return;

        ctx.save();
        ctx.fillStyle = "rgba(0,0,0,0.95)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        this.drawTitle(ctx, canvas);
        this.drawText(ctx, canvas);

        ctx.restore();
    }

    drawTitle(ctx, canvas) {
        ctx.font = 'bold 50px Lucky';
        ctx.fillStyle = '#FDF8FB';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText('Impressum', canvas.width / 2, 50);
    }

    
    drawText(ctx, canvas) {
        this.setupTextStyle(ctx);
        this.drawLines(ctx, canvas);
    }
    
   drawLines(ctx, canvas) {
        const lines = [
            "Developer: Zeljko Alakovic",
            "Email: example@email.com",
            "This game 'SHARKIE - THE GAME' is a personal project for educational purposes.",
            "All content, graphics, and code are created by the developer.",
            "© 2025 Zeljko Alakovic"
        ];
        let y = 150;
        lines.forEach(l => { ctx.fillText(l, canvas.width/2, y); y += 35; });
    }

    setupTextStyle(ctx) {
        ctx.font = '22px Lucky';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
    }

}