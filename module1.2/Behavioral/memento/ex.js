class Token
{
  constructor(value=0)
  {
    this.value = value;
  }
}

class Memento
{
  constructor(tokens)
  {
    this.tokens = [];
  }

  addToken(token) {
      this.tokens = [...this.tokens, token];
  }
}

/* 
  * Yields tokents that represent the system state.
  * The tokens do not allow direct manipulation but it's possible to implement a roll back.
*/
class TokenMachine
{
  constructor()
  {
    // todo
    this.tokens = [];
  }

  addTokenValue(value)
  {
    return this.addToken(new Token(value));
  }

  addToken(token)
  {
    // todo
    const m = new Memento();
    for (const currentToken of this.tokens) {
        m.addToken(new Token(currentToken.value));
    }
    m.addToken(new Token(token.value));
    this.tokens = [...this.tokens, token];
    return m;
  }

  revert(m)
  {
    // todo
    this.tokens = m.tokens;
  }
}

const machine = new TokenMachine();
const m1 = machine.addTokenValue(1);
const m2 = machine.addTokenValue(2);
machine.revert(m1);
console.log(machine);
