/**
 * Represents the "About Me" overlay screen for the game.
 * Displays information about the developer and project on top of the game canvas.
 * @extends DrawableObject
 */
class AboutMe extends DrawableObject {
    constructor() {
        super();
        this.loadImage('assets/images/game_interface/startScreenButtons/graduate-hat.png');
        this.x = 1120;
        this.y = 190;
        this.width = 50;
        this.height = 50;
    }

    /**
    * Draws the About Me overlay on the canvas.
    * @param {CanvasRenderingContext2D} ctx - The canvas 2D rendering context.
    * @param {HTMLCanvasElement} canvas - The canvas element.
    */
    drawAboutMe(ctx, canvas) {
        ctx.save();
        ctx.fillStyle = "rgba(0,0,0,1)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        this.drawTitle(ctx, canvas);
        this.drawText(ctx, canvas);

        ctx.restore();
    }

    /**
    * Draws the title of the About Me overlay.
    * @param {CanvasRenderingContext2D} ctx - The canvas 2D rendering context.
    * @param {HTMLCanvasElement} canvas - The canvas element.
    */
    drawTitle(ctx, canvas) {
        ctx.font = 'bold 60px Lucky';
        ctx.fillStyle = '#FDF8FB';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText('SHARKIE - THE GAME', canvas.width / 2, 50);
    }

    /**
    * Draws the text content of the About Me overlay.
    * @param {CanvasRenderingContext2D} ctx - The canvas 2D rendering context.
    * @param {HTMLCanvasElement} canvas - The canvas element.
    */
    drawText(ctx, canvas) {
        ctx.font = '24px Lucky';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        const lines = [
            "This game was created by Zeljko Alakovic as part of my studies at Developer Akademie.",
            "It showcases my skills in JavaScript, Canvas, and game development.",
            "I hope you enjoy playing it as much as I enjoyed creating it!"
        ];
        let y = 250;
        lines.forEach(line => {
            ctx.fillText(line, canvas.width / 2, y);
            y += 35;
        });
    }
}
