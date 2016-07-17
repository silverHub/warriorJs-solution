class Player {
  constructor() {
      this.maxLife = 20;
      this.pastHealth = this.maxLife;
      this.backWallHitted = false;
  }

  strategy(direction, warrior){
    let space = warrior.feel(direction);
    let health = warrior.health();

    if (direction === 'backward' && space.isWall()) {
      this.backWallHitted = true;
      warrior.walk();
      return;
    }

    if (space.isEmpty()) {
      if (health <= this.maxLife/2 && this.pastHealth > health) {
        warrior.walk('backward');
      } else if(health < this.maxLife && health >= this.pastHealth){
        warrior.rest();
      } else {
        warrior.walk(direction);
      }
    } else {
      if(space.isCaptive()){
          warrior.rescue(direction);
      } else {
        warrior.attack(direction);
      }
    }
    this.pastHealth = health;
  }
  playTurn(warrior) {
    let direction = this.backWallHitted ? 'forward' : 'backward';
    this.strategy(direction, warrior);
  }

}
