class UIManager {
  menuButton = new MenuButton();

  constructor(canvas, sound, world) {
    this.canvas = canvas;
    this.sound = sound;
    this.world = world;
    this.overlayButtons = [];
    this.showMenuOverlay = false;
    this.showInfoOverlay = false;
    this.paused = false;
    this.frozenFrame = null;
    this.registerEventListeners();
  }

  /**
   * Draws all UI elements.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
    this.drawMenuButton(ctx);
    this.drawFrozenOverlay(ctx);
    this.drawOverlayButtons(ctx);
    this.drawInfoOverlay(ctx);
  }

  /**
   * Draws the main menu button.
   * @param {CanvasRenderingContext2D} ctx
   */
  drawMenuButton(ctx) {
    ctx.save();
    ctx.translate(this.menuButton.x, this.menuButton.y);
    this.menuButton.draw(ctx);
    ctx.restore();
  }

  /**
   * Draws a frozen snapshot overlay when the menu is open.
   * @param {CanvasRenderingContext2D} ctx
   */
  drawFrozenOverlay(ctx) {
    if (this.showMenuOverlay && this.frozenFrame) {
      ctx.drawImage(
        this.frozenFrame,
        0,
        0,
        ctx.canvas.width,
        ctx.canvas.height
      );
    }
  }

  /**
   * Draws all overlay buttons.
   * @param {CanvasRenderingContext2D} ctx
   */
  drawOverlayButtons(ctx) {
    this.overlayButtons.forEach((btn) => {
      ctx.save();
      ctx.translate(btn.x, btn.y);
      btn.draw(ctx);
      ctx.restore();
    });
  }

  /**
   * Draws the info overlay if active.
   * @param {CanvasRenderingContext2D} ctx
   */
  drawInfoOverlay(ctx) {
    if (this.showInfoOverlay) {
      drawInfoOverlay(ctx, this.canvas, instructionImages);
    }
  }

  /**
   * Registers click and mousemove event listeners for the UI.
   */
  registerEventListeners() {
    this.canvas.addEventListener("click", (event) => this.handleClick(event));
    this.canvas.addEventListener("mousemove", (event) =>
      this.handleMouseMove(event)
    );
    this.canvas.addEventListener(
      "touchstart",
      (event) => this.handleTouchStart(event),
      { passive: false }
    );
    this.canvas.addEventListener(
      "touchmove",
      (event) => this.handleTouchMove(event),
      { passive: false }
    );
  }

  /**
   * Converts event coordinates to canvas coordinates.
   * @param {MouseEvent} event
   * @returns {{mouseX: number, mouseY: number}}
   */
  getMousePos(event) {
    const rect = this.canvas.getBoundingClientRect();
    const scaleX = this.canvas.width / this.canvas.clientWidth;
    const scaleY = this.canvas.height / this.canvas.clientHeight;
    const mouseX = (event.clientX - rect.left) * scaleX;
    const mouseY = (event.clientY - rect.top) * scaleY;
    return { mouseX, mouseY };
  }

  /**
   * Handles click events on menu, overlay buttons, and info overlay.
   * @param {MouseEvent} event
   */
  handleClick(event) {
    const { mouseX, mouseY } = this.getMousePos(event);
    if (this.showInfoOverlay) {
      this.showInfoOverlay = false;
      return;
    }
    if (this.menuButton.isClicked(mouseX, mouseY)) {
      this.toggleMenuOverlay();
      return;
    }
    if (this.showMenuOverlay) {
      this.handleOverlayButtonsClick(mouseX, mouseY);
    }
  }

  /**
   * Handles mouse movement for hover effects and cursor updates.
   * @param {MouseEvent} event
   */
  handleMouseMove(event) {
    const { mouseX, mouseY } = this.getMousePos(event);
    this.resetHoverStates();
    const hovered = this.checkHover(mouseX, mouseY);
    this.updateCursor(hovered);
  }

  /**
   * Checks if any UI element is hovered.
   * @param {number} mouseX
   * @param {number} mouseY
   * @returns {boolean} True if hovered over an interactive element.
   */
  checkHover(mouseX, mouseY) {
    let hovered = false;
    if (this.checkMenuButtonHover(mouseX, mouseY)) hovered = true;
    if (this.showMenuOverlay && this.checkOverlayButtonsHover(mouseX, mouseY))
      hovered = true;
    return hovered;
  }

  /**
   * Checks hover over the main menu button.
   * @param {number} mouseX
   * @param {number} mouseY
   * @returns {boolean} True if hovered.
   */
  checkMenuButtonHover(mouseX, mouseY) {
    if (this.menuButton.isClicked(mouseX, mouseY)) {
      this.menuButton.isHovered = true;
      return true;
    }
    return false;
  }

  /**
   * Checks hover over all overlay buttons.
   * @param {number} mouseX
   * @param {number} mouseY
   * @returns {boolean} True if any button hovered.
   */
  checkOverlayButtonsHover(mouseX, mouseY) {
    let hovered = false;
    this.overlayButtons.forEach((btn) => {
      if (btn.isClicked(mouseX, mouseY)) {
        btn.isHovered = true;
        hovered = true;
      }
    });
    return hovered;
  }

  /**
   * Updates the cursor style based on hover state.
   * @param {boolean} hovered
   */
  updateCursor(hovered) {
    this.canvas.style.cursor = hovered ? "pointer" : "default";
  }

  /**
   * Toggles the menu overlay on/off.
   */
  toggleMenuOverlay() {
    this.showMenuOverlay = !this.showMenuOverlay;
    if (this.showMenuOverlay) this.showOverlay();
    else this.hideOverlay();
  }

  /**
   * Activates the overlay and pauses the game.
   */
  showOverlay() {
    this.createOverlayButtons();
    this.freezeFrame();
    this.world.pauseGame();
  }

  /**
   * Creates all overlay buttons.
   */
  createOverlayButtons() {
    this.overlayButtons = [
      new RestartButton(460, 70),
      new Info("assets/images/game_interface/startScreenButtons/info_blue.png",530,70,50,50),
      new FullScreen("assets/images/game_interface/startScreenButtons/fullscreen-blue.png",670,70,50,50),
      new SoundButton(this.sound.enabled ? "assets/images/game_interface/startScreenButtons/sound.png" : "assets/images/game_interface/startScreenButtons/mute.png",740,70,50,50),
    ];
  }

  /**
   * Captures a frozen snapshot of the canvas for the overlay.
   */
  freezeFrame() {
    this.frozenFrame = new Image();
    this.frozenFrame.src = this.canvas.toDataURL();
  }

  /**
   * Pauses the UI and background music.
   */
  pauseGame() {
    this.paused = true;
    this.sound.background.pause();
  }

  /**
   * Hides the overlay and resumes the game.
   */
  hideOverlay() {
    this.overlayButtons = [];
    this.frozenFrame = null;
    this.paused = false;
    if (this.sound.enabled) this.sound.background.play();
    this.world.resumeGame();
  }

  /**
   * Handles click logic for overlay buttons.
   * @param {number} mouseX
   * @param {number} mouseY
   */
  handleOverlayButtonsClick(mouseX, mouseY) {
    this.overlayButtons.forEach((btn) => {
      if (!btn.isClicked(mouseX, mouseY)) return;
      if (btn instanceof Info) this.showInfoOverlay = !this.showInfoOverlay;
      if (btn instanceof FullScreen) toggleFullScreen(this.canvas);
      if (btn instanceof SoundButton) this.toggleSound();
      if (btn instanceof RestartButton) this.world.reset();
    });
  }

  /**
   * Resets hover states for all buttons.
   */
  resetHoverStates() {
    this.menuButton.isHovered = false;
    this.overlayButtons.forEach((btn) => (btn.isHovered = false));
  }

  /**
   * Toggles game sound on/off.
   */
  toggleSound() {
    this.sound.toggle();
    const icon = this.sound.enabled
      ? "assets/images/game_interface/startScreenButtons/sound.png"
      : "assets/images/game_interface/startScreenButtons/mute.png";
    const soundButton = this.overlayButtons.find(
      (btn) => btn instanceof SoundButton
    );
    if (soundButton) soundButton.loadImage(icon);
  }

  /**
   * Resets the UI state.
   */
  reset() {
    this.showMenuOverlay = false;
    this.showInfoOverlay = false;
    this.overlayButtons = [];
    this.paused = false;
  }

  /**
   * Handles the start of a touch event by preventing the default behavior
   * and simulating a click event at the touch position.
   *
   * @param {TouchEvent} event - The touchstart event object.
   */
  handleTouchStart(event) {
    event.preventDefault();
    const touch = event.touches[0];
    const fakeEvent = {
      clientX: touch.clientX,
      clientY: touch.clientY,
    };
    this.handleClick(fakeEvent);
  }

  /**
   * Handles a touch movement by preventing the default behavior
   * and simulating a mousemove event at the touch position.
   *
   * @param {TouchEvent} event - The touchmove event object.
   */
  handleTouchMove(event) {
    event.preventDefault();
    const touch = event.touches[0];
    const fakeEvent = {
      clientX: touch.clientX,
      clientY: touch.clientY,
    };
    this.handleMouseMove(fakeEvent);
  }
}
