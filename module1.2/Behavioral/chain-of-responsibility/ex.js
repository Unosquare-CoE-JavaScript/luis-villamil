/* 
  * Allows several components to process certain events in a chain, and each elevent in the chain can refer to the next element. 
*/
class Query
{
  constructor(creatureName, whatToQuery, value)
  {
    this.creatureName = creatureName;
    this.whatToQuery = whatToQuery;
    this.value = value;
  }
}

let WhatToQuery = Object.freeze({
    'attack': 1,
    'defense': 2
  });

class Event
{
  constructor()
  {
    this.handlers = new Map();
    this.count = 0;
  }

  subscribe(handler)
  {
    this.handlers.set(++this.count, handler);
    return this.count;
  }

  unsubscribe(idx)
  {
    this.handlers.delete(idx);
  }

  fire(sender, args)
  {
    this.handlers.forEach(function (v, k)
    {
      v(sender, args);
    });
  }
}

class Goblin
{
  constructor(game, baseAttack=1, baseDefense=1)
  {
    // todo
    this.game = game;
    this.initial_attack = baseAttack;
    this.initial_defense = baseDefense;
    this.token = game.queries.subscribe(
      this.handle.bind(this)
    );
  }

  get attack()
  {
    let q = new Query('goblin', WhatToQuery.attack,
      this.initial_attack);
    this.game.performQuery(this, q);
    return q.value;
  }

  get defense()
  {
    let q = new Query('goblin', WhatToQuery.defense, 0);
    this.game.performQuery(this, q);
    return q.value;
  }

  handle(sender, query) {
    if (query.whatToQuery === WhatToQuery.defense)
    {
      query.value++;
    }
  }
}

class GoblinKing extends Goblin
{
  constructor(game)
  {
      // todo
      super(game, 3, 3);
  }

  get attack()
  {
    let q = new Query('goblinKing', WhatToQuery.attack,
      this.initial_attack);
    this.game.performQuery(this, q);
    return q.value;
  }

  get defense()
  {
    let q = new Query('goblinKing', WhatToQuery.defense,
      this.initial_defense);
    this.game.performQuery(this, q);
    return q.value;
  }

  handle(sender, query) {
    if (query.creatureName === 'goblin' && query.whatToQuery === WhatToQuery.attack)
    {
      query.value += 1;
    }
    if (query.whatToQuery === WhatToQuery.defense)
    {
      query.value++;
    }
  }
}

class Game
{
    constructor() {
        this.queries = new Event();
    }

    performQuery(sender, query)
    {
      this.queries.fire(sender, query);
    }
}

let game = new Game();
let goblin = new Goblin(game);
let goblin2 = new Goblin(game);
let goblin3 = new Goblin(game);

console.log(game);

let goblinKing = new GoblinKing(game);
console.log(goblinKing.attack, goblinKing.defense)

console.log(goblin.attack, goblin.defense)
console.log(goblin2.attack, goblin2.defense)
console.log(goblin3.attack, goblin3.defense)
