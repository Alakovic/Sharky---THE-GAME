/**
 * Represents a game level, including its enemies, obstacles, items, and background objects.
 */
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

/**
* Creates a new level instance with all objects and configuration.
* @param {Array} enemies - Array of enemy objects in the level.
* @param {Array} backgroundObjects - Array of background objects.
* @param {Array} obstacle - Array of obstacles.
* @param {Array} poison - Array of poison items.
* @param {Array} hearth - Array of health/hearth items.
* @param {Array} coin - Array of coin objects.
* @param {number} end_level_x - X-coordinate where the level ends.
*/
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

/**
* Initializes the current state arrays by copying from the original arrays.
*/   
    initCurrentState() {
        this.enemies = [...this.originalEnemies];
        this.obstacle = [...this.originalObstacle];
        this.poison = [...this.originalPoison];
        this.coin = [...this.originalCoin];
        this.hearth = [...this.originalHearth];
    }

/**
* Resets the level to its initial state by re-initializing all arrays.
*/
    resetLevel() {
        this.initCurrentState();
    }
}