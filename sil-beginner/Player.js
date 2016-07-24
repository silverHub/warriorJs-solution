class Player {
  constructor() {
      this.direction = false;
      this.maxLife = 20;
      this.pastHealth = this.maxLife;
      this.backWallHitted = false;
  }
  mapRoom(spaces){
    function hasEnemy() {
      let [step1,step2,step3] = spaces;
      return step1.isEnemy() || step1.isEmpty() && step2.isEnemy() || step1.isEmpty() && step2.isEmpty() && step3.isEnemy();
    }
    return {
        hasEnemy: hasEnemy
    };
  }
  strategy(warrior){
    let space = warrior.feel();
    let room = this.mapRoom(warrior.look());
    let health = warrior.health();

    if(room.hasEnemy()){
      warrior.shoot();
      //warrior.attack(direction);
    } else if(space.isCaptive()){
      warrior.rescue();
    }
    else if (space.isEmpty()) {
      if (health <= this.maxLife/2 && this.pastHealth > health) {
        warrior.walk('backward');
      } else if(health < this.maxLife && health >= this.pastHealth){
        warrior.rest();
      } else {
        warrior.walk();
      }
    }
    this.pastHealth = health;
  }
  playTurn(warrior) {
    if(!this.direction){
        this.direction = 'backward';
        warrior.pivot();
        return;
    }
    let space = warrior.feel();
    if (this.direction === 'backward' && space.isWall()) {
      this.direction = 'forward';
      warrior.pivot();
      return;
    }
    this.strategy(warrior);
  }

}
