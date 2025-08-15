const level1 = new Level (
    [
        new YellowJellyFish(4000),
        new YellowJellyFish(4400),
        new YellowJellyFish(4800)
    ],
    background1,
    [//imagePath,x,y,width,height
        new Obstacle('../assets/images/background/barriers/1.png', 1200, 0 , 800 , 600),
        new Obstacle('../assets/images/background/barriers/1.png', 3000, 0 , 800 , 600),
        new Obstacle('../assets/images/background/barriers/1.png', 6000, 0 , 800 , 600),
        new Obstacle('../assets/images/background/barriers/1.png', 9000, 0 , 800 , 600),
        new Obstacle('../assets/images/background/barriers/1.png', 14000, 0 , 800 , 600),
        new Obstacle('../assets/images/background/barriers/1.png', 17000, 0 , 800 , 600)
    ],
    [
        new Poison(2300,500),
        new Poison(2750,500),
        new Poison(5350,500),
    ],
    coin1,
    20000
);