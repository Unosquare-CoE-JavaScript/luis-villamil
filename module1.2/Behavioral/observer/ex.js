
class Game
{
    constructor() {
        this.rats = [];
    }

}

class Rat
{
  constructor(game)
  {
    // todo
    this.game = game;
    this.game.rats.push(this);
  }

  get attack() {
    return this.game.rats.length;
  }

  die()
  {
    // todo
    this.game.rats.pop();
  }
}

let game = new Game();
let rat = new Rat(game);
let rat2 = new Rat(game);
console.log(rat.attack);
console.log(rat2.attack);