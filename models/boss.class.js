class Boss extends MovableObject {
    x = 14500
    y=0
    height = 500;
    width = 550;
    minX = 12600;
    maxX = 14500;
    damage = 20;
    speed = 5;
    speedY = 5;
    direction = 1;
    energy = 100;
     hurtStartTime = 0;      // vreme kad je boss pogođen
    hurtDuration = 500; 

    offset = {
        top: 250,
        bottom: 80,
        left: 50,
        right: 80
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

    updateBoss(character) {
        if (this.isDead() && this.state !== "dead") {
            this.state = "dead";
        } else if (this.isHurt() && this.state !== "hurt" && this.state !== "dead") {
            this.state = "hurt";
        }else if (this.state !== "dead" && this.state !== "hurt") {
            this.checkAttack(character); 
        }
        this.switchAnimations(character);
    }

    switchAnimations(character) {
    switch (this.state) {
            case "dead":
                this.playDeathAnimation(this.images_dead);
                break;

            case "hurt":
                this.playAnimations(this.images_hurt);
                this.animationFrameSpeed(4);
            if (!this.isHurt()) {
                this.enterFloat(); 
            }
                break;

            case "introduce":
                this.playAnimations(this.images_introduce);
                this.animationFrameSpeed(6);
            if (this.currentImage >= this.images_introduce.length) {
                this.enterFloat(); 
            }
                break;

            case "float":
                this.floatPatrol();
                break;

            case "hunt":
                this.huntCharacter(character);
                break;

            case "attack":
                this.playAnimations(this.images_attack);
                this.animationFrameSpeed(4);
                break;

            default:
                break;
        }
    }

    huntCharacter(character) {
        if (character.x < this.x) {
            this.moveLeft();
            this.otherDirection = false;
        } else {
            this.moveRight();
            this.otherDirection = true;
        }
        if (character.y + character.height/2 < this.y + this.height/2) {
            this.moveUp();
        } else if (character.y + character.height/2 > this.y + this.height/2) {
            this.moveDown();
        }
        this.playAnimations(this.images_attack);
        this.animationFrameSpeed(4)
    }

    checkAttack(character) {
        if (this.state === "hidden" || this.state === "introduce" || this.state === "dead") return;
    const distance = Math.abs(character.x - this.x);
        if (distance < 500) {
            this.state = "hunt";
        } else if (this.state === "hunt") {
            this.enterFloat(); 
        }
    }

    floatPatrol() {
        if (this.state !== "float") return;
    this.x += this.speed * this.direction;
    if (this.x <= this.minX) {
        this.x = this.minX;
        this.direction = 1;
    } 
    if (this.x >= this.maxX) {
        this.x = this.maxX;
        this.direction = -1;
    }
        this.otherDirection = this.direction === -1 ? false : true;
        this.playAnimations(this.images_float);
        this.animationFrameSpeed(8); 
    }

    enterFloat() {
    this.state = "float";
    if (this.x < this.minX) this.x = this.minX;
    if (this.x > this.maxX) this.x = this.maxX;
        this.direction = 1;
        this.otherDirection = true;
    }
}