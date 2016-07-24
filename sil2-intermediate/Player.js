class Player {
  playTurn(warrior) {
    console.log(warrior.directionOfStairs());
    warrior.walk(warrior.directionOfStairs());
  }
}
