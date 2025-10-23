class LoadingScreen {
  constructor(canvas, preloader) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.preloader = preloader;
    this.percentage = 0;
  }

  /**
   * Draws the entire loading screen by calling individual draw functions.
   */
  draw() {
    this.clearCanvas();
    this.drawBackground();
    this.drawText();
    this.drawProgressBar();
    this.drawPercentage();
  }

  /**
   * Clears the entire canvas.
   */
  clearCanvas() {
    const { width, height } = this.canvas;
    this.ctx.clearRect(0, 0, width, height);
  }

  /**
   * Draws the background of the loading screen.
   */
  drawBackground() {
    const { width, height } = this.canvas;
    const ctx = this.ctx;
    ctx.fillStyle = "#222";
    ctx.fillRect(0, 0, width, height);
  }

  /**
   * Draws the "Loading..." text above the progress bar.
   */
  drawText() {
    const { width, height } = this.canvas;
    const ctx = this.ctx;
    ctx.fillStyle = "#fff";
    ctx.font = "40px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Loading...", width / 2, height / 2 - 50);
  }

  /**
   * Draws the progress bar with border and fill according to the loading percentage.
   */
  drawProgressBar() {
    const { width, height } = this.canvas;
    const ctx = this.ctx;
    const barWidth = 400;
    const barHeight = 30;
    const barX = (width - barWidth) / 2;
    const barY = height / 2;
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 3;
    ctx.strokeRect(barX, barY, barWidth, barHeight);
    ctx.fillStyle = "#0f0";
    ctx.fillRect(barX, barY, (this.percentage / 100) * barWidth, barHeight);
  }

  /**
   * Draws the loading percentage below the progress bar.
   */
  drawPercentage() {
    const { width, height } = this.canvas;
    const ctx = this.ctx;
    const barHeight = 30;
    const barY = height / 2;
    ctx.fillStyle = "#fff";
    ctx.font = "20px Arial";
    ctx.fillText(
      `${Math.floor(this.percentage)}%`,
      width / 2,
      barY + barHeight + 25
    );
  }

  /**
   * Updates the loading progress percentage and redraws the screen.
   */
  updateProgress() {
    this.percentage = Math.min(this.preloader.getProgress() * 100, 100);
    this.draw();
  }

  /**
   * Starts loading all assets using the preloader.
   * Wraps preloader.loadImage to update progress after each image loads.
   * @returns {Promise<void>} Resolves when all assets are loaded.
   */
  async load() {
    const origLoadImage = this.preloader.loadImage.bind(this.preloader);

    this.preloader.loadImage = async (path) => {
      const img = await origLoadImage(path);
      this.updateProgress();
      return img;
    };

    await this.preloader.loadAll();
  }
}
