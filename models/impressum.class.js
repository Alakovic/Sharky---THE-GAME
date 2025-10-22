/**
 * Represents the game's Impressum overlay (legal notice / credits).
 * Handles drawing the overlay, title, and text content on the canvas.
 * @extends DrawableObject
 */
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

    /**
    * Shows the Impressum overlay.
    */
    show() {
        this.isVisible = true;
    }

    /**
    * Hides the Impressum overlay.
    */
    hide() {
        this.isVisible = false;
    }

    /**
    * Draws the Impressum overlay on the canvas if it is visible.
    * @param {CanvasRenderingContext2D} ctx - The canvas 2D context.
    * @param {HTMLCanvasElement} canvas - The canvas element.
    */
    drawOverlay(ctx, canvas) {
        if (!this.isVisible) return;

        ctx.save();
        ctx.fillStyle = "rgba(0,0,0,0.95)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        this.drawTitle(ctx, canvas);
        this.drawText(ctx, canvas);

        ctx.restore();
    }

    /**
    * Draws the overlay title.
    * @param {CanvasRenderingContext2D} ctx - The canvas 2D context.
    * @param {HTMLCanvasElement} canvas - The canvas element.
    */
    drawTitle(ctx, canvas) {
        ctx.font = 'bold 50px Lucky';
        ctx.fillStyle = '#FDF8FB';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText('Impressum', canvas.width / 2, 50);
    }

    /**
     * Draws the text content of the Impressum overlay.
     * Delegates to setupTextStyle and drawLines.
     * @param {CanvasRenderingContext2D} ctx - The canvas 2D context.
     * @param {HTMLCanvasElement} canvas - The canvas element.
     */
    drawText(ctx, canvas) {
        this.setupTextStyle(ctx);
        this.drawLines(ctx, canvas);
    }

    /**
    * Draws the individual lines of text on the overlay.
    * @param {CanvasRenderingContext2D} ctx - The canvas 2D context.
    * @param {HTMLCanvasElement} canvas - The canvas element.
    */
    drawLines(ctx, canvas) {
        const lines = [
            "Developer: Zeljko Alakovic",
            "Email: zeljkoalakovic997@outlook.com",
            "This game 'SHARKIE - THE GAME' is a personal project for educational purposes.",
            "All content, graphics, and code are created by the developer.",
            "© 2025 Zeljko Alakovic"
        ];
        let y = 150;
        lines.forEach(l => { ctx.fillText(l, canvas.width/2, y); y += 35; });
    }

    /**
    * Sets up the text style for the overlay content.
    * @param {CanvasRenderingContext2D} ctx - The canvas 2D context.
    */
    setupTextStyle(ctx) {
        ctx.font = '22px Lucky';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
    }

}