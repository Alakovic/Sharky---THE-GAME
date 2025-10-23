class CollisionManager {
  constructor(world) {
    this.world = world;
  }

  /**
   * Checks all collisions in the game world.
   */
  checkAll() {
    if (this.world.character.isDead()) return;
    this.checkCollection("coin","coinCount",this.world.coinBar,this.world.totalCoins,"coin");
    this.checkCollection("poison","poisonCount",this.world.poisonBar,this.world.totalPoison,"poison");
    this.checkCollection("hearth","energy",this.world.healthBar,100,"heart");
    this.checkEnemyCollision();
    this.checkBossTrigger();
    this.checkBubbleFishCollision();
    this.checkCharacterBossCollision();
    this.checkBubbleBossCollision();
  }

  /**
   * Generic collection checker for coins, poison, hearts, etc.
   * @param {string} type - Type of item in level array ('coin', 'poison', 'hearth').
   * @param {string} countKey - Character property to increment ('coinCount', 'poisonCount', 'energy').
   * @param {object} bar - HUD bar to update (optional).
   * @param {number} maxValue - Maximum value (optional, default 100).
   * @param {string} soundKey - Sound to play on collection.
   */
  checkCollection(type, countKey, bar = null, maxValue = 100, soundKey) {
    this.world.level[type].forEach((item, index) => {
      if (this.world.character.isColliding(item)) {
        if (countKey === "energy" && this.world.character.energy >= maxValue)
          return;
        const increment = item.value || 1; 
        this.world.character[countKey] += increment;
        if (this.world.character[countKey] > maxValue)
          this.world.character[countKey] = maxValue;
        if (bar) bar.setPercentage(this.world.character[countKey]);
        this.world.sound.play(this.world.sound[soundKey]);
        this.world.level[type].splice(index, 1);
      }
    });
  }

  /**
   * Checks collisions between character and enemies.
   * Handles either character taking damage or hitting enemy depending on SPACE key.
   */
  checkEnemyCollision() {
    this.world.level.enemies.forEach((enemy) => {
      if (!enemy.death && this.world.character.isColliding(enemy)) {
        if (this.world.keyboard.SPACE) {
          this.handleEnemyHit(enemy);
        } else {
          this.handleCharacterHit(enemy);
        }
      }
    });
  }

  /**
   * Handles character taking damage from an enemy.
   * @param {MovableObject} enemy - The enemy that hit the character.
   */
  handleCharacterHit(enemy) {
    this.world.character.hit(enemy.damage);
    this.world.sound.play(this.world.sound.hurt);
    this.world.healthBar.setPercentage(this.world.character.energy);
    this.world.character.damageType = enemy.damageType;
  }

  /**
   * Handles hitting an enemy with a fin slap.
   * @param {MovableObject} enemy - The enemy being hit.
   */
  handleEnemyHit(enemy) {
    enemy.hit(this.world.character.finSlapDamage);
    enemy.damage = 0;
    this.world.sound.play(this.world.sound.enemy);
    const direction = this.getKnockbackDirection(this.world.character, enemy);
    enemy.knockback(direction, -1);
  }

  /**
   * Determines knockback direction for an enemy based on character position.
   * @param {MovableObject} character - The player character.
   * @param {MovableObject} enemy - The enemy to knock back.
   * @returns {number} 1 if knockback to the right, -1 if to the left.
   */
  getKnockbackDirection(character, enemy) {
    let characterMid = character.x + character.width / 2;
    let enemyMid = enemy.x + enemy.width / 2;
    return characterMid < enemyMid ? 1 : -1;
  }

  /**
   * Triggers boss introduction if the character reaches the boss area.
   */
  checkBossTrigger() {
    if (this.world.character.x > 13800 && this.world.boss.state === "hidden") {
      this.world.boss.state = "introduce";
      this.world.sound.play(this.world.sound.bossIntro);
    }
  }

  /**
   * Checks collisions between bubbles and enemies.
   * Damages enemies and removes bubbles.
   */
  checkBubbleFishCollision() {
    this.world.bubbles.forEach((bubble, bIndex) => {
      this.world.level.enemies.forEach((enemy) => {
        if (bubble.isColliding(enemy)) {
          enemy.hit(bubble.damage);
          this.world.bubbles.splice(bIndex, 1);
        }
      });
    });
  }

  /**
   * Checks collisions between bubbles and the boss.
   * Damages boss, updates HUD, and plays hit sound.
   */
  checkBubbleBossCollision() {
    if (this.world.boss.state === "hidden") return;
    this.world.bubbles.forEach((bubble, bIndex) => {
      if (bubble.isColliding(this.world.boss)) {
        this.world.boss.hit(bubble.damage);
        this.world.healthBarBoss.setPercentage(this.world.boss.energy);
        this.world.boss.state = "hurt";
        this.world.sound.play(this.world.sound.bossHit);
        this.world.bubbles.splice(bIndex, 1);
      }
    });
  }

  /**
   * Checks collision between character and the boss.
   * Character takes damage and HUD updates.
   */
  checkCharacterBossCollision() {
    if (this.world.character.isColliding(this.world.boss)) {
      this.world.character.hit(this.world.boss.damage);
      this.world.healthBar.setPercentage(this.world.character.energy);
      this.world.sound.play(this.world.sound.hurt);
      this.world.character.damageType = "poison";
    }
  }
}
