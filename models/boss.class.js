class Boss extends MovableObject {
    x = 14500
    y=0
    height = 300;
    width = 350;

    offset = {
        top: 140,
        bottom: 70,
        left: 70,
        right: 70
    }

    state = "hidden" ;

    images_attack = [
        '../assets/images/enemies/boss/attack/1.png',
        '../assets/images/enemies/boss/attack/2.png',
        '../assets/images/enemies/boss/attack/3.png',
        '../assets/images/enemies/boss/attack/4.png',
        '../assets/images/enemies/boss/attack/5.png',
        '../assets/images/enemies/boss/attack/6.png'
    ]

    images_dead = [
        '../assets/images/enemies/boss/dead/Mesa de trabajo 2 copia 6.png',
        '../assets/images/enemies/boss/dead/Mesa de trabajo 2 copia 7.png',
        '../assets/images/enemies/boss/dead/Mesa de trabajo 2 copia 8.png',
        '../assets/images/enemies/boss/dead/Mesa de trabajo 2 copia 9.png',
        '../assets/images/enemies/boss/dead/Mesa de trabajo 2 copia 10.png'
    ]

    images_float = [
        '../assets/images/enemies/boss/float/1.png',
        '../assets/images/enemies/boss/float/2.png',
        '../assets/images/enemies/boss/float/3.png',
        '../assets/images/enemies/boss/float/4.png',
        '../assets/images/enemies/boss/float/5.png',
        '../assets/images/enemies/boss/float/6.png',
        '../assets/images/enemies/boss/float/7.png',
        '../assets/images/enemies/boss/float/8.png',
        '../assets/images/enemies/boss/float/8.png',
        '../assets/images/enemies/boss/float/10.png',
        '../assets/images/enemies/boss/float/11.png',
        '../assets/images/enemies/boss/float/12.png',
        '../assets/images/enemies/boss/float/13.png'
    ]

    images_hurt = [
        '../assets/images/enemies/boss/hurt/1.png',
        '../assets/images/enemies/boss/hurt/2.png',
        '../assets/images/enemies/boss/hurt/3.png',
        '../assets/images/enemies/boss/hurt/4.png'
    ]

    images_introduce = [
        '../assets/images/enemies/boss/introduce/1.png',
        '../assets/images/enemies/boss/introduce/2.png',
        '../assets/images/enemies/boss/introduce/3.png',
        '../assets/images/enemies/boss/introduce/4.png',
        '../assets/images/enemies/boss/introduce/5.png',
        '../assets/images/enemies/boss/introduce/6.png',
        '../assets/images/enemies/boss/introduce/7.png',
        '../assets/images/enemies/boss/introduce/8.png',
        '../assets/images/enemies/boss/introduce/9.png',
        '../assets/images/enemies/boss/introduce/10.png'
    ]

    constructor() {
        super();
        this.loadImages(this.images_attack);
        this.loadImages(this.images_dead);
        this.loadImages(this.images_float);
        this.loadImages(this.images_hurt);
        this.loadImages(this.images_introduce);
    }

    startIntroduceAnimation() {
        let interval = setInterval(() => {
            this.playAnimations(this.images_introduce);
            this.animationFrameSpeed(1);
        },50);

        setTimeout(() => {
            clearInterval(interval);
            this.state = "float";
            this.startFloatAnimation();
        }, this.images_introduce.length * 50);
    }

    startFloatAnimation() {
        setInterval(() => {
            if (this.state === "float") {
                this.playAnimations(this.images_float);
                this.animationFrameSpeed(3);
            }
        }, 50);
    }
}