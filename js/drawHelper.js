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
