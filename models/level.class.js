class Level {
    enemies;
    backgroundObjects;
    obstacle;
    poison;
    coin;
    end_level_x;
    hearth;

    constructor(enemies,backgroundObjects,obstacle,poison,hearth,coin,end_level_x) {
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects ; 
        this.obstacle = obstacle;
        this.poison = poison;
        this.hearth = hearth
        this.coin = coin;
        this.end_level_x = end_level_x;
    }
}