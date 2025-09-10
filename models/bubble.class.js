class Bubble extends MovableObject {
    speed = 10;       
    width = 40;       
    height = 40;      
    direction = 1; 
    damage = 20;   
    
    offset = {
        top: 5,
        bottom: 5,
        left: 5,
        right: 5
    }

    constructor(x, y, direction) {
        super().loadImage('../assets/images/bubble/bubbleGreen.png'); 
        this.x = x;          
        this.y = y;          
        this.direction = direction;
        this.otherDirection = direction < 0; 
    }

    update() {
        this.x += this.speed * this.direction;
    }
    

}