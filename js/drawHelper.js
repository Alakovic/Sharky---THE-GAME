/**
 * Array of instruction objects for the game controls.
 * Each object contains an image, description text, and source path.
 * @type {{img: Image, text: string, src: string}[]}
 */
const instructionImages = [
    { img: new Image(), text: "Move Character", src: '../assets/images/game_interface/buttons/arrow keys.png' },
    { img: new Image(), text: "Fin Attack", src: '../assets/images/game_interface/buttons/Space Bar key.png' },
    { img: new Image(), text: "Bubble / Poison Attack", src: '../assets/images/game_interface/buttons/D key.png' }
];

// Set the image sources
instructionImages.forEach(item => item.img.src = item.src)

/**
 * Draws a semi-transparent overlay showing game instructions.
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 * @param {HTMLCanvasElement} canvas - The canvas element.
 * @param {{img: Image, text: string, src: string}[]} instructionImages - Array of instruction images and texts.
 */
function drawInfoOverlay(ctx, canvas, instructionImages) {
    ctx.save();
    ctx.fillStyle = "rgba(0,0,0,0.6)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const startX = 300;
    const startY = 250;
    const imgHeight = 100;
    const padding = 150;
    let currentX = startX;

    instructionImages.forEach(item => {
        const imgWidth = drawInstructionItem(ctx, item, currentX, startY, imgHeight);
        currentX += imgWidth + padding;
    });

    ctx.restore();
}

/**
 * Draws a single instruction item with its image and description.
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 * @param {{img: Image, text: string}} item - Instruction item object.
 * @param {number} x - X position to draw the item.
 * @param {number} y - Y position to draw the item.
 * @param {number} imgHeight - Height of the image.
 * @returns {number} The width of the drawn image.
 */
function drawInstructionItem(ctx, item, x, y, imgHeight) {
    let imgWidth = imgHeight;
    if (item.text === "Fin Attack") imgWidth = 150;
    ctx.drawImage(item.img, x, y, imgWidth, imgHeight);
    ctx.font = "24px Lucky";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText(item.text, x + imgWidth / 2, y + imgHeight + 25);
    return imgWidth;
}

/**
 * Toggles fullscreen mode for the canvas parent container.
 * @param {HTMLCanvasElement} canvas - The canvas element.
 */
function toggleFullScreen(canvas) {
    const container = canvas.parentElement;
    if (!document.fullscreenElement) {
        container.requestFullscreen()
            .then(() => scaleCanvas(canvas))
            .catch(err => {
                console.error(`Fullscreen failed: ${err.message}`);
            });
    } else {
        document.exitFullscreen()
            .then(() => resetCanvasScale(canvas));
    }
}

/**
 * Scales the canvas to fit the screen while maintaining aspect ratio.
 * Centers the canvas horizontally and vertically.
 * @param {HTMLCanvasElement} canvas - The canvas element.
 */

function scaleCanvas(canvas) {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const scaleX = screenWidth / canvas.width;
    const scaleY = screenHeight / canvas.height;
    const scaleFactor = Math.min(scaleX, scaleY);
    canvas.style.width = `${canvas.width * scaleFactor}px`;
    canvas.style.height = `${canvas.height * scaleFactor}px`;
    canvas.style.marginLeft = `${(screenWidth - canvas.width * scaleFactor) / 2}px`;
    canvas.style.marginTop = `${(screenHeight - canvas.height * scaleFactor) / 2}px`;
}

/**
 * Resets the canvas to its original scale and removes any margins.
 * @param {HTMLCanvasElement} canvas - The canvas element.
 */
function resetCanvasScale(canvas) {
    canvas.style.width = '';
    canvas.style.height = '';
    canvas.style.marginLeft = '';
    canvas.style.marginTop = '';
}

