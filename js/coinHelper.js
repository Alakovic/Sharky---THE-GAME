/**
 * Generates a horizontal line of coins.
 * @param {number} startX - Starting X position of the first coin.
 * @param {number} y - Y position for all coins in the line.
 * @param {number} count - Number of coins to generate.
 * @param {number} spacing - Horizontal spacing between each coin.
 * @returns {Coin[]} Array of Coin instances forming a line.
 */
function generateCoinsLine(startX, y, count, spacing) {
    const coins = [];
    for (let i = 0; i < count; i++) {
        let x = startX + i * spacing;
        coins.push(new Coin(x, y));
    }
    return coins;
}

/**
 * Generates coins in an arc pattern using a sine wave.
 * @param {number} startX - Starting X position of the first coin.
 * @param {number} startY - Base Y position for the arc.
 * @param {number} count - Number of coins to generate along the arc.
 * @param {number} spacing - Horizontal spacing between each coin.
 * @param {number} arcHeight - Maximum height of the arc.
 * @returns {Coin[]} Array of Coin instances forming an arc.
 */
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

/**
 * Array of all coin instances for level 1, combining lines and arcs.
 * @type {Coin[]}
 */
const coin1 = [
    ...generateCoinsLine(800, 300, 5, 100),
    ...generateCoinsArc(2100,450,5,100,80),
    ...generateCoinsArc(2600,450,4,100,80),
    ...generateCoinsArc(5150,450,5,100,80),
    ...generateCoinsLine(3900, 0,10, 150),
    ...generateCoinsLine(3900, 500,10, 120),
    ...generateCoinsLine(7600,50,6, 100),
    ...generateCoinsLine(7600,150,6, 100),
    ...generateCoinsLine(7600,250,5, 100),
    ...generateCoinsLine(7600,350,6, 100),
    ...generateCoinsLine(7600,450,6, 100),
    ...generateCoinsLine(10950,50,4, 100),
    ...generateCoinsLine(10950,150,4, 100),
    ...generateCoinsLine(10950,250,4, 100),
    ...generateCoinsLine(10950,350,4, 100),
    ...generateCoinsLine(10950,450,4, 100),
    ...generateCoinsLine(12900,50,10, 100),
    ...generateCoinsLine(12900,150,10, 100),
    ...generateCoinsLine(12900,250,10, 100),
    ...generateCoinsLine(12900,350,10, 100),
    ...generateCoinsLine(12900,450,10, 100),
    ...generateCoinsArc(9900,450,5,100,80),
]
