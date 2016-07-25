class Player {
  constructor(){
    this.maxHealth = 20;
  }
  getSurrounding(warrior){

    let surroundings = {
        right : warrior.feel('right'),
        left : warrior.feel('left'),
        backward : warrior.feel('backward'),
        forward : warrior.feel('forward')
    };

    function get(fnName, direction){
      return surroundings[direction][fnName];
    }
    function getAll(fnName) {
      var enemies = Object.keys(surroundings).map(function(direction) {
        let space = surroundings[direction];
        return space[fnName]() ? direction : null;
      });
      return enemies.filter(function(element){ return !!element;});
    }

    return {
      getAll,
      get
    };
  }
  playTurn(warrior) {
    let surround = this.getSurrounding(warrior);
    let towardsStairs = warrior.directionOfStairs();
    let health = warrior.health();
    let enemies = surround.getAll('isEnemy');
    let captives = surround.getAll('isCaptive');

    if(enemies.length > 0){
      let enemy = enemies[0];
      if(enemies.length === 1){
        warrior.attack(enemy);
      } else {
        warrior.bind(enemy);
      }
    } else {
      if(health < this.maxHealth){
        warrior.rest();
      } else {
        if (captives.length) {
          let captive = captives[0];
          warrior.rescue(captive);
        } else {
          if(surround.get('isEmpty',towardsStairs)){
            warrior.walk(towardsStairs);
          }
        }
      }
    }
  }
}
