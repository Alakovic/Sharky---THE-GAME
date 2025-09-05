class jellyFish extends MovableObject {

    height = 100;
    width =100;
    damageType = 'electro'

    constructor(){
    super();
    }

    offset = {
        top:90,
        bottom: 90,
        left: 90,
        right: 90
    }

    animate(images) {
        setInterval(() => {
            this.animationFrameSpeed(1);
            this.playAnimations(images);
        }, 100);
    }

    applyOption(option) {
        if(option === "option1"){
            this.option1();
        }else if (option === "option2") {
            this.option2();
        }else if(option === "option3"){
            this.option3();
        }else if(option === "option4"){
            this.option4();
        }
    }

    option1(){
        this.speedY = 2.5;
        this.startMoveUpDown(this.y - 200,this.y + 200);
    }

    option2(){
        this.speedY = -5.5;
        this.startMoveUpDown(this.y - 200, this.y + 200);
    }

    option3(){
        this.speedY = -5.5;
        this.startMoveUpDown(this.y - 150, this.y + 150);
    }

    option4(){
        this.speedY = 2.5;
        this.startMoveUpDown(this.y - 150, this.y + 150);
    }

    applyVariant(variant) {
        if(variant === "variant1"){
            this.variant1();
        }else if (variant === "variant2") {
            this.variant2();
        }else if (variant === "variant3"){
            this.variant3();
        }
    }

    variant1(){
        this.speed = 1.5;
        this.startX = this.x;
        this.startY = this.y;
    }

    variant2(){
        this.speed = 7.5;
        this.startX = this.x ;
        this.startY = this.y ;
    }

    variant3(){
        this.speed = 3;
        this.startX = this.x ;
        this.startY = this.y ;
    }

    movingSquare() {
    setInterval(() => {
        if (this.direction === "up") {
            this.y -= this.speed;
            if (this.y <= this.startY - this.range) this.direction = "right";
        } 
        else if (this.direction === "right") {
            this.x += this.speed;
            if (this.x >= this.startX + this.range) this.direction = "down";
        } 
        else if (this.direction === "down") {
            this.y += this.speed;
            if (this.y + this.height >= this.startY + this.range) this.direction = "left";
        } 
        else if (this.direction === "left") {
            this.x -= this.speed;
            if (this.x <= this.startX) this.direction = "up";
        }
    }, 1000/60);
}
}