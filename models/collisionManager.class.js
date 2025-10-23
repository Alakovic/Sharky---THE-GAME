class CollisionManager {
  constructor(world) {
    this.world = world;
  }

  /**
   * Checks all collisions in the game world.
   */
  checkAll() {
    if (this.world.character.isDead()) return;
    this.checkCollection(this.world.level.coin,"coinCount",this.world.totalCoins,this.world.coinBar,this.world.sound.coin,(coin) => coin.value);
    this.checkCollection(this.world.level.poison,"poisonCount",this.world.totalPoison,this.world.poisonBar,this.world.sound.poison,() => 1);
    this.checkHearthCollection();
    this.checkEnemyCollision();
    this.checkBossTrigger();
    this.checkBubbleFishCollision();
    this.checkCharacterBossCollision();
    this.checkBubbleBossCollision();
  }

  /**
   * Generic collection checker for coins, poison, etc.
   * @param {Array} items - Array of collectible items
   * @param {string} characterAttr - Character attribute to increase
   * @param {number} maxValue - Maximum value for percentage calculation
   * @param {DrawableObject} bar - HUD bar to update
   * @param {string} sound - Sound to play
   * @param {Function} valueFn - Function to calculate the value added
   */
  checkCollection(items, characterAttr, maxValue, bar, sound, valueFn) {
    items.forEach((item, index) => {
      if (this.world.character.isColliding(item)) {
        this.world.character[characterAttr] += valueFn(item);
        let percentage = Math.min(
          (this.world.character[characterAttr] / maxValue) * 100,
          100
        );
        bar.setPercentage(percentage);
        this.world.sound.play(sound);
        items.splice(index, 1);
      }
    });
  }

  /**
   * Checks if the character collects hearts.
   * Increases character energy up to max 100, updates HUD and plays heart sound.
   */
  checkHearthCollection() {
    this.world.level.hearth.forEach((hearth, index) => {
      if (this.world.character.isColliding(hearth)) {
        if (this.world.character.energy < 100) {
          this.world.sound.play(this.world.sound.heart);
          this.world.character.energy += hearth.value;
          if (this.world.character.energy > 100)
            this.world.character.energy = 100;
          this.world.healthBar.setPercentage(this.world.character.energy);
          this.world.level.hearth.splice(index, 1);
        }
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
