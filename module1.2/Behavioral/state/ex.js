class CombinationLock
{
  constructor(combination)
  {
    this.combination = combination;
    this.reset();
    this.digitsIndex = 0;
  }

  reset()
  {
    // reset lock state here
    this.status = 'LOCKED';
  }

  enterDigit(digit)
  {
    // set this.status depending on state of the lock
    if (this.combination[this.digitsIndex] == digit) {
        this.digitsIndex += 1;
        if (this.status === 'LOCKED') {
            this.status = `${digit}`;
            return;
        }
        this.status += `${digit}`;
    } else {
        this.status = 'ERROR';
    }

    if (this.status == this.combination.join('')) {
        this.status = 'OPEN';
    }
  }
}

let cl = new CombinationLock([1, 2, 3, 4, 5]);
console.log(cl.status);
cl.enterDigit(1);
cl.enterDigit(2);
cl.enterDigit(3);
cl.enterDigit(4);
cl.enterDigit(5);
console.log(cl.status);
