/* 
  * Converts the external interface into an interface compatible with the system.
*/
class Square
{
  constructor(side)
  {
    this.side = side;
  }
}

function area(rectangle)
{
  return rectangle._width * rectangle._height;
}

class SquareToRectangleAdapter {
    constructor(square) {
        this._width = square.side;
        this._height = square.side;
    }
}

// build an adapter called SquareToRectangleAdapter
// s.t. we could call
//
// let sq = new Square(123);
// area(new SquareToRectangleAdapter(sq));