class Level {
    enemies;
    backgroundObjects;
    obstacle;
    poison;
    coin;
    end_level_x;
    hearth;

    originalEnemies;
    originalObstacle;
    originalPoison;
    originalCoin;
    originalHearth;

    constructor(enemies, backgroundObjects, obstacle, poison, hearth, coin, end_level_x) {
        this.originalEnemies = enemies;
        this.originalObstacle = obstacle;
        this.originalPoison = poison;
        this.originalCoin = coin;
        this.originalHearth = hearth;
        this.backgroundObjects = backgroundObjects;
        this.end_level_x = end_level_x;
        this.initCurrentState();
    }

    initCurrentState() {
        this.enemies = [...this.originalEnemies];
        this.obstacle = [...this.originalObstacle];
        this.poison = [...this.originalPoison];
        this.coin = [...this.originalCoin];
        this.hearth = [...this.originalHearth];
    }

    resetLevel() {
        this.initCurrentState();
    }
}