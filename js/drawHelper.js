const instructionImages = [
    { img: new Image(), text: "Move Character", src: '../assets/images/game_interface/buttons/arrow keys.png' },
    { img: new Image(), text: "Fin Attack", src: '../assets/images/game_interface/buttons/Space Bar key.png' },
    { img: new Image(), text: "Bubble / Poison Attack", src: '../assets/images/game_interface/buttons/D key.png' }
];

instructionImages.forEach(item => item.img.src = item.src)

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

function resetCanvasScale(canvas) {
    canvas.style.width = '';
    canvas.style.height = '';
    canvas.style.marginLeft = '';
    canvas.style.marginTop = '';
}

