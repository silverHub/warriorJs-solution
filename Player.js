class Player {
  constructor() {
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
  strategy(direction, warrior){
    let space = warrior.feel(direction);
    let room = this.mapRoom(warrior.look());
    let health = warrior.health();

    if (direction === 'backward' && space.isWall()) {
      this.backWallHitted = true;
      warrior.walk();
      return;
    }

    if(room.hasEnemy()){
      warrior.shoot();
      //warrior.attack(direction);
    } else if(space.isCaptive()){
      warrior.rescue(direction);
    }
    else if (space.isEmpty()) {
      if (health <= this.maxLife/2 && this.pastHealth > health) {
        warrior.walk('backward');
      } else if(health < this.maxLife && health >= this.pastHealth){
        warrior.rest();
      } else {
        warrior.walk(direction);
      }
    }
    this.pastHealth = health;
  }
  playTurn(warrior) {
    let space = warrior.feel();
    //console.log(captive.isEmpty(),w1.isCaptive(),w2.isEnemy());

    if (!space.isWall()) {
      warrior.pivot();
      return;
    }
    //let direction = this.backWallHitted ? 'forward' : 'backward';
    this.strategy('forward', warrior);
  }

}
