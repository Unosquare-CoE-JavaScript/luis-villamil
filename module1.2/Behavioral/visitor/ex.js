/* 
  * Allows non-intrusive addition of functionality to hierarchies.
*/
class Integer
{
  constructor(value)
  {
    this.value = value;
  }
  accept(visitor)
  {
    visitor.visitValue(this);
  }
}

class BinaryExpression
{
  constructor(lhs, rhs)
  {
    this.lhs = lhs;
    this.rhs = rhs;
  }
}

class AdditionExpression extends BinaryExpression
{
  constructor(lhs, rhs) {
    super(lhs, rhs);
  }
  accept(visitor) {
    visitor.visitAddition(this);
  }
}

class MultiplicationExpression extends BinaryExpression
{
  constructor(lhs, rhs) {
    super(lhs, rhs);
  }
  accept(visitor) {
    visitor.visitMultiplication(this);
  }
}

class ExpressionPrinter
{
  constructor()
  {
    this.buffer = [];
  }

  visitValue({ value })
  {
    this.buffer.push(value);
  }

  visitAddition(ae)
  {
    this.buffer.push('(');
    ae.lhs.accept(this);
    this.buffer.push('+');
    ae.rhs.accept(this);
    this.buffer.push(')');
  }

  visitMultiplication(me)
  {
    me.lhs.accept(this);
    this.buffer.push('*');
    me.rhs.accept(this);
  }

  toString()
  {
    return this.buffer.join('');
  }
}

let simple = new MultiplicationExpression(
    new AdditionExpression(
        new Integer(2), new Integer(3)
    ),
    new Integer(4)
)
let ep = new ExpressionPrinter();
ep.visitMultiplication(simple);
console.log(ep.toString())