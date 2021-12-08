/* 
  * It encapsulates a request into a separte object and then send that object somewhere. 
  * Good for auditing, replay, undo/redo.
*/
let Action = Object.freeze({
    deposit: 0,
    withdraw: 1
  });
  
  class Command
  {
    constructor(action, amount)
    {
      this.action = action;
      this.amount = amount;
      this.success = false;
    }
  }
  
  class Account
  {
    constructor()
    {
      this.balance = 0;
    }
  
    process(cmd)
    {
      switch(cmd.action) {
          case Action.deposit:
              this.balance += cmd.amount;
              cmd.success = true;
              return cmd;
          case Action.withdraw:
              if (cmd.amount > this.balance) {
                  cmd.success = false;
                  return cmd;
              } 
              this.balance -= cmd.amount;
              cmd.success = true;
              return cmd;
      }
    }
  }