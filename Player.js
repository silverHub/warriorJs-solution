class Player {
  constructor() {
      this.maxLife = 20;
      this.pastHealth = this.maxLife;
  }

  playTurn(warrior) {
    let clearAhead = warrior.feel().isEmpty;
    let isCaptive = warrior.feel().isCaptive;

    if (clearAhead()) {
      if(warrior.health() < this.maxLife && warrior.health() >= this.pastHealth){
        warrior.rest();
      } else {
        warrior.walk();
      }
    } else {
      if(isCaptive()){
          warrior.rescue();
      } else {
        warrior.attack();
      }
    }
    this.pastHealth = warrior.health();
  }

}
