
    const bg1_light = [
            '../assets/images/background/bground/bg1/L1.png',
            '../assets/images/background/bground/bg1/L2.png'
        ];
    
    const bg1_dark= [
            '../assets/images/background/bground/bg1/D1.png',
            '../assets/images/background/bground/bg1/D2.png'
        ];

    const bg2_light =  [
            '../assets/images/background/bground/bg2/L1.png',
            '../assets/images/background/bground/bg2/L2.png'
        ];
    
    const bg2_dark= [
            '../assets/images/background/bground/bg2/D1.png',
            '../assets/images/background/bground/bg2/D2.png'
        ];
    
    const water_light = [
            '../assets/images/background/water/L1.png',
            '../assets/images/background/water/L2.png'
        ];

    const water_dark = [
            '../assets/images/background/water/D1.png',
            '../assets/images/background/water/D2.png'
        ];

    const floor_light = [
            '../assets/images/background/floor/L1.png',
            '../assets/images/background/floor/L2.png'
        ];
    
    const floor_dark = [
            '../assets/images/background/floor/D1.png',
            '../assets/images/background/floor/D2.png'
        ];
    
    const light = [
            '../assets/images/background/light/1.png',
            '../assets/images/background/light/2.png'
        ];


function generateBackground(images, xStart, xEnd, y, width, height) {
    let water = [];
    let imageCount = images.length;

    for (let x = xStart, i = 0; x <= xEnd; x += width, i++) {
        let imagePath = images[i % imageCount];
        water.push(new BackgroundObject(imagePath, x, y, width, height));
    }

    return water;
}

const background1 = [
    ...generateBackground(water_light, -5, 20000, 0, 1200, 600),
    ...generateBackground(bg2_light, 0,20000,100,900,500),
    ...generateBackground(bg1_light,0,20000,50,900,550),
    ...generateBackground(light,0,20000,0,1200,600),
    ...generateBackground(floor_light,0,20000,150,900,450)
]
