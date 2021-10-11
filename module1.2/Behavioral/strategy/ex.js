class Creature
{
  constructor(attack, health)
  {
    this.attack = attack;
    this.health = health;
    this.alive = this.health > 0;
    // todo
    this.id = Creature.counter;
    Creature.counter++;
  }
}
Creature.counter = 0;
class Game
{
  constructor(damageStrategy)
  {
    this.damageStrategy = damageStrategy;
  }

  springTrapOn(creature)
  {
    this.damageStrategy.damage(creature);
    return creature.alive;
  }
}

class DamageStrategy
{
  damage(creature)
  {
    if (creature.health <= 0)
    {
      creature.alive = false;
    }
  }
}

class ConstantDamageStrategy extends DamageStrategy
{
  damage(creature)
  {
    // todo
    creature.health -= 1;
    super.damage(creature);
  }
}

class GrowingDamageStrategy extends DamageStrategy
{
  damage(creature)
  {
    // todo
    if (!GrowingDamageStrategy.impact[creature.id]) {
        GrowingDamageStrategy.impact[creature.id] = 1;
    }
    creature.health -= GrowingDamageStrategy.impact[creature.id];
    GrowingDamageStrategy.impact[creature.id]++;
    super.damage(creature);
  }
}
GrowingDamageStrategy.impact = {};

const game = new Game(new GrowingDamageStrategy());
const creature = new Creature(1, 10);
game.springTrapOn(creature);
console.log(creature);
game.springTrapOn(creature);
console.log(creature);
game.springTrapOn(creature);
console.log(creature);