/**
 * Manages all overlays on the home screen, including the main overlay,
 * info overlay, about me overlay, and impressum overlay.
 * Responsible for drawing overlays, handling clicks, and blocking hover effects.
 */
class OverlayManager {
    constructor(ctx, canvas, aboutMe, impressum, instructionImages) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.aboutMe = aboutMe;
        this.impressum = impressum;
        this.instructionImages = instructionImages;
        this.showOverlay = true;
        this.showInfoOverlay = false;
        this.showAboutMe = false;
    }

    /**
    * Draws all active overlays on the canvas.
    */
    drawOverlays() {
        if (this.showOverlay) this.drawMainOverlay();
        if (this.showInfoOverlay) drawInfoOverlay(this.ctx, this.canvas, this.instructionImages);
        if (this.showAboutMe) this.aboutMe.drawAboutMe(this.ctx, this.canvas);
        if (this.impressum.isVisible) this.impressum.drawOverlay(this.ctx, this.canvas);
    }

    /**
    * Draws the main starting overlay with title, goal, hints, and "Click to start" text.
    */
    drawMainOverlay() {
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
    * Draws the overlay title and goal text.
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
    * Draws gameplay hints on the overlay.
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
    * Handles click events on overlays.
    * Hides the currently visible overlay if clicked.
    * @param {HTMLAudioElement} [homeMusic] - Optional background music to play when the main overlay is clicked.
    * @returns {boolean} True if an overlay was clicked and handled.
    */
    handleOverlayClicks(homeMusic) {
        if (this.showOverlay) {
            if (homeMusic) homeMusic.play();
            this.showOverlay = false;
            return true;
        }
        if (this.showInfoOverlay) { this.showInfoOverlay = false; return true; }
        if (this.showAboutMe) { this.showAboutMe = false; return true; }
        if (this.impressum.isVisible) { this.impressum.isVisible = false; return true; }
        return false;
    }

    /**
    * Determines if hover effects should be blocked based on active overlays.
    * @returns {boolean} True if hover should be blocked.
    */
    blockHover() {
        return this.showOverlay || this.showInfoOverlay || this.impressum.isVisible;
    }

    
    /**
    * Toggles the visibility of the info overlay.
    */
    toggleInfoOverlay() {
        this.showInfoOverlay = !this.showInfoOverlay;
    }

    /**
    * Toggles the visibility of the AboutMe overlay.
    */
    toggleAboutMeOverlay() {
        this.showAboutMe = !this.showAboutMe;
    }
}
