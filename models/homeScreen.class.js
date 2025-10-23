class HomeScreen extends DrawableObject {
  ctx;
  canvas;
  keyboard;
  world;
  startButton = new StartButton();
  fullScreenButton = new FullScreen("assets/images/game_interface/startScreenButtons/fullscreen-black.png",1130,140,30,30);
  soundButtonOn = new SoundButton("assets/images/game_interface/startScreenButtons/speaker-filled-audio-tool.png",1130,30,40,40);
  info = new Info("assets/images/game_interface/startScreenButtons/info.png",1125,80,40,40);
  background = new Image();
  impressum = new Impressum();
  bgroundMusic;
  soundEnabled = true;
  overlayManager;

  /**
   * Creates a new HomeScreen instance.
   * @param {HTMLCanvasElement} canvas - The canvas element to render the home screen.
   * @param {Keyboard} keyboard - The keyboard input handler.
   */
  constructor(canvas, keyboard) {
    super();
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.overlayManager = new OverlayManager(this.ctx,this.canvas,this.aboutMe,this.impressum,instructionImages);
    this.initBackground();
    this.initMusic();
    this.loadSavedSoundState();
    this.initEventListeners();
    this.draw();
  }

  /**
   * Sets up the background image for the home screen.
   */
  initBackground() {
    this.setBackground();
  }

  /**
   * Prepares the background music for the home screen.
   */
  initMusic() {
    this.prepareMusic();
  }

  /**
   * Loads the saved sound state from localStorage and applies it.
   */
  loadSavedSoundState() {
    this.loadSoundState();
  }

  /**
   * Adds all event listeners for clicks, mouse moves, and fullscreen changes.
   */
  initEventListeners() {
    this.canvas.addEventListener("click", (event) => this.handleClick(event));
    this.canvas.addEventListener("mousemove", (event) =>
      this.handleMouseMove(event)
    );
    document.addEventListener("fullscreenchange", () => {
      if (!document.fullscreenElement) {
        resetCanvasScale(this.canvas);
      }
    });
  }

  /**
   * Loads the saved sound state from localStorage and applies it to the game.
   * Updates the background music mute state and the sound button icon accordingly.
   * @returns {void}
   */
  loadSoundState() {
    const savedSound = localStorage.getItem("soundEnabled");
    if (savedSound !== null) {
      this.soundEnabled = savedSound === "true";
      if (this.bgroundMusic) this.bgroundMusic.muted = !this.soundEnabled;
      const icon = this.soundEnabled
        ? "assets/images/game_interface/startScreenButtons/speaker-filled-audio-tool.png"
        : "assets/images/game_interface/startScreenButtons/volume-mute.png";
      this.soundButtonOn.loadImage(icon);
    }
  }

  /**
   * Continuously draws the home screen and its UI elements using requestAnimationFrame.
   */
  draw() {
    this.clearCanvas();
    this.drawBackground();
    this.drawUIElements();
    this.drawOverlays();
    requestAnimationFrame(() => this.draw());
  }

  /**
   * Clears the canvas before redrawing.
   */
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Draws the background image.
   */
  drawBackground() {
    this.ctx.drawImage(
      this.background,
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
  }

  /**
   * Draws the main UI elements: title, buttons, icons.
   */
  drawUIElements() {
    this.drawTitle();
    this.addToMap(this.startButton);
    this.addToMap(this.fullScreenButton);
    this.addToMap(this.soundButtonOn);
    this.addToMap(this.info);
    this.addToMap(this.impressum);
  }

  drawOverlays() {
    this.overlayManager.drawOverlays();
  }

  /**
   * Handles mouse movement for hover effects and cursor changes.
   * @param {MouseEvent} event - The mouse move event.
   */
  handleMouseMove(event) {
    if (this.blockHover()) return;
    const { mouseX, mouseY } = this.getMousePos(event);
    this.resetHover();
    this.updateHover(mouseX, mouseY);
    if (this.startButton.isHovered ||this.fullScreenButton.isHovered ||this.soundButtonOn.isHovered ||this.info.isHovered ||this.impressum.isHovered) {
      this.canvas.style.cursor = "pointer";
    } else {
      this.canvas.style.cursor = "default";
    }
  }

  /**
   * Resets the hover state for all buttons.
   */
  resetHover() {
    this.startButton.isHovered = false;
    this.fullScreenButton.isHovered = false;
    this.soundButtonOn.isHovered = false;
    this.info.isHovered = false;
    this.impressum.isHovered = false;
  }

  /**
   * Updates the hover state for buttons based on mouse position.
   * @param {number} mouseX - The x-coordinate of the mouse.
   * @param {number} mouseY - The y-coordinate of the mouse.
   */
  updateHover(mouseX, mouseY) {
    this.startButton.isHovered = this.startButton.isClicked(mouseX, mouseY);
    this.fullScreenButton.isHovered = this.fullScreenButton.isClicked(mouseX,mouseY);
    this.soundButtonOn.isHovered = this.soundButtonOn.isClicked(mouseX, mouseY);
    this.info.isHovered = this.info.isClicked(mouseX, mouseY);
    this.impressum.isHovered = this.impressum.isClicked(mouseX, mouseY);
  }

  /**
   * Prevents hover effects when overlays are active.
   * @returns {boolean} True if hover should be blocked.
   */
  blockHover() {
    if (this.overlayManager.blockHover()) {
      this.canvas.style.cursor = "default";
      return true;
    }
    return false;
  }

  /**
   * Draws the game title on the home screen.
   */
  drawTitle() {
    const ctx = this.ctx;
    ctx.font = "bold 70px Lucky";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillStyle = "#FDF8FB";
    ctx.fillText("SHARKIE - THE GAME", this.canvas.width / 2, 200);
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#BF067F";
    ctx.strokeText("SHARKIE - THE GAME", this.canvas.width / 2, 200);
    ctx.shadowColor = "transparent";
  }

  /**
   * Loads and prepares background music for the home screen.
   */
  prepareMusic() {
    this.bgroundMusic = new Audio(
      "assets/sounds/funny-cartoon-sound-397415 (1).mp3"
    );
    this.bgroundMusic.loop = true;
  }

  /**
   * Sets the background image for the home screen.
   */
  setBackground() {
    this.background.src =
      "assets/images/game_interface/startScreenButtons/1.png";
  }

  /**
   * Draws a button on the canvas with hover scaling.
   * @param {DrawableObject} button - The button to draw.
   */
  addToMap(button) {
    this.ctx.save();
    let scale = button.isHovered ? 1.2 : 1;
    this.ctx.translate(
      button.x + button.width / 2,
      button.y + button.height / 2
    );
    this.ctx.scale(scale, scale);
    this.ctx.translate(-button.width / 2, -button.height / 2);
    button.draw(this.ctx);
    this.ctx.restore();
  }

  /**
   * Handles click events for overlays and buttons.
   * @param {MouseEvent} event - The mouse click event.
   */
  handleClick(event) {
    const { mouseX, mouseY } = this.getMousePos(event);
    if (this.handleOverlayClicks()) return;
    if (this.handleButtonClick(mouseX, mouseY)) return;
  }

  handleOverlayClicks() {
    return this.overlayManager.handleOverlayClicks(this.bgroundMusic);
  }

  /**
   * Handles button clicks on the home screen.
   * @param {number} x - Mouse X coordinate.
   * @param {number} y - Mouse Y coordinate.
   * @returns {boolean} True if a button was clicked.
   */
  handleButtonClick(x, y) {
    if (this.soundButtonOn.isClicked(x, y)) return this.toggleSound(), true;
    if (this.info.isClicked(x, y))
      return this.overlayManager.toggleInfoOverlay(), true;
    if (this.startButton.isClicked(x, y))
      return this.startGameWithLoading(), true;
    if (this.fullScreenButton.isClicked(x, y))
      return toggleFullScreen(this.canvas), true;
    if (this.impressum.isClicked(x, y))
      return (this.impressum.isVisible = !this.impressum.isVisible), true;
    return false;
  }

  /**
   * Calculates mouse position relative to the canvas.
   * @param {MouseEvent} event - The mouse event.
   * @returns {{ mouseX: number, mouseY: number }} The mouse position.
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
   * Toggles background sound on or off and updates the sound icon.
   */
  toggleSound() {
    if (!this.bgroundMusic) return;
    this.soundEnabled = !this.soundEnabled;
    this.bgroundMusic.muted = !this.soundEnabled;

    if (this.soundEnabled) {
      this.soundButtonOn.loadImage(
        "assets/images/game_interface/startScreenButtons/speaker-filled-audio-tool.png"
      );
    } else {
      this.soundButtonOn.loadImage(
        "assets/images/game_interface/startScreenButtons/volume-mute.png"
      );
    }
    localStorage.setItem("soundEnabled", this.soundEnabled);
  }

  /**
   * Starts the game with a loading screen.
   */
  async startGameWithLoading() {
    this.hideOverlay();
    const preloader = this.setupPreloader();
    const loadingScreen = new LoadingScreen(this.canvas, preloader);
    const loadPromise = loadingScreen.load();
    await this.showLoadingScreen(loadingScreen, preloader);
    await loadPromise;
    this.startGameAfterLoading();
  }

  /**
   * Hides the main overlay and resets cursor.
   */
  hideOverlay() {
    this.canvas.style.cursor = "default";
  }

  /**
   * Prepares the preloader with game assets.
   * @returns {Preloader} The prepared preloader instance.
   */
  setupPreloader() {
    const preloader = new Preloader();
    addImagesFromObject(GameAssets, preloader);
    return preloader;
  }

  /**
   * Animates the loading screen until all assets are loaded.
   * @param {LoadingScreen} loadingScreen
   * @param {Preloader} preloader
   * @returns {Promise} Resolves when loading is complete.
   */
  showLoadingScreen(loadingScreen, preloader) {
    return new Promise((resolve) => {
      const drawLoop = () => {
        loadingScreen.updateProgress();
        if (preloader.getProgress() < 1) {
          requestAnimationFrame(drawLoop);
        } else {
          resolve();
        }
      };
      drawLoop();
    });
  }

  /**
   * Starts the actual game after loading is complete.
   */
  startGameAfterLoading() {
    if (this.isPortraitMobile()) return;
    this.stopHomeMusic();
    this.initWorld();
    this.playWorldMusic();
  }

  /**
   * Checks if the device is a mobile in portrait mode.
   * @returns {boolean} True if device is portrait mobile.
   */
  isPortraitMobile() {
    const isPortrait = window.innerHeight > window.innerWidth;
    if (isPortrait && /Mobi|Android/i.test(navigator.userAgent)) {
      alert(
        "Please rotate your device to landscape mode before starting the game!"
      );
      return true;
    }
    return false;
  }

  /**
   * Stops the home screen background music.
   */
  stopHomeMusic() {
    if (this.bgroundMusic) {
      this.bgroundMusic.pause();
      this.bgroundMusic.currentTime = 0;
    }
  }

  /**
   * Initializes the game world.
   */
  initWorld() {
    currentLevel = createLevel1();
    world = new World(this.canvas, this.keyboard, currentLevel);
  }

  /**
   * Plays the world background music, if available.
   */
  playWorldMusic() {
    if (world.backgroundMusic) {
      world.backgroundMusic
        .play()
        .catch((e) => console.log("Autoplay blocked"));
    }
  }
}
