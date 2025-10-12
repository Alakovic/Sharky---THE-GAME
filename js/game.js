let canvas;
let world ;
let keyboard = new Keyboard();
let currentLevel = createLevel1();
let homeScreen;
let currentScreen;

/** 
 * Initializes the game by setting up the canvas and home screen.
 */
function init() {
    canvas = document.getElementById('canvas');
    homeScreen = new HomeScreen(canvas , keyboard);
}

/**
 * Handles keydown events to update the keyboard state.
 * @param {KeyboardEvent} e - The keyboard event object.
 */
window.addEventListener("keydown", (e) =>{
    if(e.keyCode == 39 ){
        keyboard.RIGHT = true;
    }

    if(e.keyCode == 37 ){
        keyboard.LEFT = true;
    }

    if(e.keyCode == 40 ){
        keyboard.DOWN = true;
    }

    if(e.keyCode == 32 ){
        keyboard.SPACE = true;
    }  

    if(e.keyCode == 38 ){
        keyboard.UP = true;
    }  

    if(e.keyCode == 68 ){
        keyboard.D = true;
    }  
    
});

/**
 * Handles keyup events to update the keyboard state.
 * @param {KeyboardEvent} e - The keyboard event object.
 */
window.addEventListener("keyup", (e) =>{
    if(e.keyCode == 39 ){
        keyboard.RIGHT = false;
    }

    if(e.keyCode == 37 ){
        keyboard.LEFT = false;
    }

    if(e.keyCode == 40 ){
        keyboard.DOWN = false;
    }

    if(e.keyCode == 32 ){
        keyboard.SPACE = false;
    }   
    
    if(e.keyCode == 38 ){
        keyboard.UP = false;
    }  

    if(e.keyCode == 68 ){
        keyboard.D = false;
    }  
});