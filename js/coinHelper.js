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
    ...generateCoinsLine(3900, 0,10, 150),
    ...generateCoinsLine(3900, 500,10, 120),
    ...generateCoinsLine(7600,50,6, 100),
    ...generateCoinsLine(7600,150,6, 100),
    ...generateCoinsLine(7600,250,6, 100),
    ...generateCoinsLine(7600,350,6, 100),
    ...generateCoinsLine(7600,450,6, 100),
]
