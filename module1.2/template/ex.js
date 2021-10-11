class Creature
{
  constructor(attack, health)
  {
    this.attack = attack;
    this.health = health;
  }
}

class CardGame
{
  constructor(creatures)
  {
    this.creatures = creatures;
  }

  // returns index of winner if there's a winner
  // returns -1 if there's no winner (both alive or both dead)
  combat(creature1index, creature2index)
  {
    let first = this.creatures[creature1index];
    let second = this.creatures[creature2index];
    this.hit(first, second);
    this.hit(second, first);
    let firstAlive = first.health > 0;
    let secondAlive = second.health > 0;
    if (firstAlive === secondAlive) return -1;
    return firstAlive ? creature1index : creature2index;
  }

  hit(attacker, defender)
  {
    throw new Error('Please implement this in inheritors');
  }
}

class TemporaryCardDamageGame extends CardGame
{
  constructor(creatures) {
    super(creatures);
  }

  hit(attacker, defender) {
    if (attacker.attack >= defender.health) {
        defender.health = 0;
    }
  }
}

class PermanentCardDamageGame extends CardGame
{
  constructor(creatures) {
    super(creatures);
  }

  hit(attacker, defender) {
    defender.health -= attacker.attack;
  }
}

const creature1 = new Creature(2, 3);
const creature2 = new Creature(1, 2);

const game1 = new TemporaryCardDamageGame([creature1, creature2]);
const game2 = new PermanentCardDamageGame([creature1, creature2]);
game1.combat(0, 1);
console.log(creature1)
console.log(creature2)