class Character extends MovableObject {

    y=200
    height = 300;
    width = 350;
    speed = 10 ;
    world;
    energy = 100;
    coinCount = 0;
    poisonCount = 0;
    damageType;

    offset = {
        top: 140,
        bottom: 70,
        left: 70,
        right: 70
    }

    images_idle = [
        '../assets/images/character/idle/1.png',
        '../assets/images/character/idle/2.png',
        '../assets/images/character/idle/3.png',
        '../assets/images/character/idle/4.png',
        '../assets/images/character/idle/5.png',
        '../assets/images/character/idle/6.png',
        '../assets/images/character/idle/7.png',
        '../assets/images/character/idle/8.png',
        '../assets/images/character/idle/9.png',
        '../assets/images/character/idle/10.png',
        '../assets/images/character/idle/11.png',
        '../assets/images/character/idle/12.png',
        '../assets/images/character/idle/13.png',
        '../assets/images/character/idle/14.png',
        '../assets/images/character/idle/15.png',
        '../assets/images/character/idle/16.png',
        '../assets/images/character/idle/17.png',
        '../assets/images/character/idle/18.png'
    ];

    images_swim = [
        '../assets/images/character/swim/1.png',
        '../assets/images/character/swim/2.png',
        '../assets/images/character/swim/3.png',
        '../assets/images/character/swim/4.png',
        '../assets/images/character/swim/5.png',
        '../assets/images/character/swim/6.png'
    ];

    images_poisoned = [
        '../assets/images/character/hurt/poisoned/1.png',
        '../assets/images/character/hurt/poisoned/2.png',
        '../assets/images/character/hurt/poisoned/3.png',
        '../assets/images/character/hurt/poisoned/4.png',
        '../assets/images/character/hurt/poisoned/5.png'
    ];

    images_electrified = [
        '../assets/images/character/hurt/electric shock/1.png',
        '../assets/images/character/hurt/electric shock/2.png',
        '../assets/images/character/hurt/electric shock/3.png'
    ]

    images_deathPoison = [
        '../assets/images/character/dead/poisoned/1.png',
        '../assets/images/character/dead/poisoned/2.png',
        '../assets/images/character/dead/poisoned/3.png',
        '../assets/images/character/dead/poisoned/4.png',
        '../assets/images/character/dead/poisoned/5.png',
        '../assets/images/character/dead/poisoned/6.png',
        '../assets/images/character/dead/poisoned/7.png',
        '../assets/images/character/dead/poisoned/8.png',
        '../assets/images/character/dead/poisoned/9.png',
        '../assets/images/character/dead/poisoned/10.png',
        '../assets/images/character/dead/poisoned/11.png',
        '../assets/images/character/dead/poisoned/12.png'
    ]

    images_deathElectro = [
        '../assets/images/character/dead/electrified/1.png',
        '../assets/images/character/dead/electrified/2.png',
        '../assets/images/character/dead/electrified/3.png',
        '../assets/images/character/dead/electrified/4.png',
        '../assets/images/character/dead/electrified/5.png',
        '../assets/images/character/dead/electrified/6.png',
        '../assets/images/character/dead/electrified/7.png',
        '../assets/images/character/dead/electrified/8.png',
        '../assets/images/character/dead/electrified/9.png',
        '../assets/images/character/dead/electrified/10.png'
    ]

    constructor() {
        super().loadImage('../assets/images/character/idle/1.png');
        this.loadImages(this.images_swim);
        this.loadImages(this.images_idle);
        this.loadImages(this.images_poisoned);
        this.loadImages(this.images_electrified);
        this.loadImages(this.images_deathElectro);
        this.loadImages(this.images_deathPoison);
        this.animate();
    }

    animate() {
        setInterval (() => {
            const maxX = this.world.level.end_level_x - this.width;
            const maxY = 360;
            const minY = -130;
            if(this.world.keyboard.RIGHT && this.x < maxX) {
            this.otherDirection = false;
            this.moveRight();
        }
            if(this.world.keyboard.LEFT && this.x > 100 ) {
            this.otherDirection = true ;
            this.moveLeft();
        }

            if (this.world.keyboard.UP && this.y > minY) {
            this.moveUp();
        }
            if (this.world.keyboard.DOWN && this.y < maxY) {
            this.moveDown();
        }

            const margin = 100; // Distance in pixels from the left edge of the screen where the character should be positioned
            const maxCameraX = -(this.world.level.end_level_x - this.world.canvas.width); // The furthest left the camera can scroll, so the right edge of the level aligns with the right edge of the screen
            let cameraX = -this.x + margin; // Calculate camera position so the character stays 100px from the left
            if (cameraX < maxCameraX) {  // Prevent camera from going beyond the right edge of the level
            cameraX = maxCameraX;
        }
            const rightEdge = this.world.level.end_level_x - this.width; // The maximum x-position where the character is fully visible on screen
            if (this.x > rightEdge) { // Lock the camera at the end so the character doesn’t go partially off-screen
            cameraX = -(this.world.level.end_level_x - this.world.canvas.width); 
        }

        this.world.camera_x = cameraX;
        }, 1000 / 60 );

        setInterval(() => {
            if(this.isDead()) {
                if (this.damageType === 'poison') {
                    this.animationFrameSpeed(2);
                    this.playAnimations(this.images_deathPoison);
                }else if (this.damageType === 'electro') {
                    this.animationFrameSpeed(2);
                    this.playAnimations(this.images_deathElectro);
                }
            }else if(this.isHurt()) {
                if(this.damageType === 'poison') {
                    this.animationFrameSpeed(2);
                    this.playAnimations(this.images_poisoned);
                } else if (this.damageType === 'electro') {
                    this.animationFrameSpeed(2);
                    this.playAnimations(this.images_electrified);
                }
            } else {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN) {
                this.animationFrameSpeed(1)
                this.playAnimations(this.images_swim);
            } else {
                this.animationFrameSpeed(3)
                this.playAnimations(this.images_idle);
            }}
        }, 50);
    }
}