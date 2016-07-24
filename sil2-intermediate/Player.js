class Player {
  constructor(){
    this.maxHealth = 20;
  }
  playTurn(warrior) {
    let direction = warrior.directionOfStairs();
    let space = warrior.feel(direction);
    let health = warrior.health();

    if(space.isEnemy()){
      warrior.attack(direction);
    } else {
      if(health < this.maxHealth){
        warrior.rest();
      } else {
        warrior.walk(direction);
      }
    }
  }
}
