
    const bg1_light = [
            'assets/images/background/bground/bg1/L1.png',
            'assets/images/background/bground/bg1/L2.png'
        ];
    
    const bg1_dark= [
            'assets/images/background/bground/bg1/D1.png',
            'assets/images/background/bground/bg1/D2.png'
        ];

    const bg2_light =  [
            'assets/images/background/bground/bg2/L1.png',
            'assets/images/background/bground/bg2/L2.png'
        ];
    
    const bg2_dark= [
            'assets/images/background/bground/bg2/D1.png',
            'assets/images/background/bground/bg2/D2.png'
        ];
    
    const water_light = [
            'assets/images/background/water/L1.png',
            'assets/images/background/water/L2.png'
        ];

    const water_dark = [
            'assets/images/background/water/D1.png',
            'assets/images/background/water/D2.png'
        ];

    const floor_light = [
            'assets/images/background/floor/L1.png',
            'assets/images/background/floor/L2.png'
        ];
    
    const floor_dark = [
            'assets/images/background/floor/D1.png',
            'assets/images/background/floor/D2.png'
        ];
    
    const light = [
            'assets/images/background/light/1.png',
            'assets/images/background/light/2.png'
        ];

/**
 * Generates an array of background objects by repeating the given images horizontally
 * between the specified X start and X end positions.
 *
 * The function cycles through the provided image paths and places each image at the given
 * Y coordinate, with specified width and height. When the end of the image array is reached,
 * it loops back to the first image.
 *
 * @param {string[]} images - Array of image paths to use for the background.
 * @param {number} xStart - The starting X position for the first background object.
 * @param {number} xEnd - The ending X position up to which the background is generated.
 * @param {number} y - The Y position where the background objects will be placed.
 * @param {number} width - The width of each background object.
 * @param {number} height - The height of each background object.
 * @returns {backgroundObject[]} An array of BackgroundObject instances representing the generated background.
 */
function generateBackground(images, xStart, xEnd, y, width, height) {
    let backgroundObject = [];
    let imageCount = images.length;

    for (let x = xStart, i = 0; x <= xEnd; x += width, i++) {
        let imagePath = images[i % imageCount];
        backgroundObject.push(new BackgroundObject(imagePath, x, y, width, height));
    }

    return backgroundObject;
}

/**
 * Array of background objects for level 1, combining water, background layers, lights, and floor.
 * @type {BackgroundObject[]}
 */
const background1 = [
    ...generateBackground(water_light, -5, 15000, 0, 1200, 600),
    ...generateBackground(bg2_light, 0,15000,100,900,500),
    ...generateBackground(bg1_light,0,15000,50,900,550),
    ...generateBackground(light,0,15000,0,1200,600),
    ...generateBackground(floor_light,0,15000,150,900,450)
]
