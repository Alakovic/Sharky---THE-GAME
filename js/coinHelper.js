function generateCoinsLine(startX, y, count, spacing) {
    const coins = [];
    for (let i = 0; i < count; i++) {
        let x = startX + i * spacing;
        coins.push(new Coin(x, y));
    }
    return coins;
}

function generateCoinsArc(startX, startY, count, spacing, arcHeight) {
    const coins = [];
    for (let i = 0; i < count; i++) {
        const x = startX + i * spacing;
        const angle = (Math.PI / (count - 1)) * i; 
        const y = startY - Math.sin(angle) * arcHeight;
        coins.push(new Coin(x, y));
    }
    return coins;
}

const coin1 = [
    ...generateCoinsLine(800, 300, 5, 100),
    ...generateCoinsArc(2100,450,5,100,80),
    ...generateCoinsArc(2600,450,4,100,80),
    ...generateCoinsArc(5150,450,5,100,80),
]
