/* 
  * Allows clients to trear individual objects and compositions of objects uniformly
*/
class SingleValue
{
  constructor(value)
  {
    this.values = [value];
  }
}

class ManyValues
{
    // ensure there's a push(value) method
    constructor() {
      this.values = [];
    }
    
    push(value) {
        this.values.push(value);
    }
}

let sum = function(containers)
{
  return containers.reduce((x, y) => { 
      return x + y.values.reduce((xa, ya) => ya + xa) }
      , 0)
};