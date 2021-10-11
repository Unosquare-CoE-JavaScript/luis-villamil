class ExpressionProcessor
{
  constructor(variables)
  {
    this.variables = variables;
  }

  calculate(expression)
  {
    const re = /\s*(\+|\-)\s*/
    let parts = expression.split(re).map((part) => {
        if (this.variables[part]) {
            return this.variables[part];
        }
        return part;
    });
    if (parts.length === 1) {
        return expression;
    }
    for (let i = 0; i < parts.length; i++) {
        if (parts[i] === '-') {
            if (isNaN(parts[i+1])) {
                return 0;
            }
            const temp = parseInt(parts[i-1]) - parseInt(parts[i+1]);
            parts = parts.slice(i+2, parts.length);
            parts.unshift(temp);
            break;
        }
        if (parts[i] === '+') {
            if (isNaN(parts[i+1])) {
                return 0;
            }
            const temp = parseInt(parts[i-1]) + parseInt(parts[i+1]);
            parts = parts.slice(i+2, parts.length);
            parts.unshift(temp);
            break;
        }
        if (isNaN(parts[i])) {
            return 0;
        }
    }
    
    return this.calculate(parts.join(''));
  }
}

const xp = new ExpressionProcessor({ 'x': 3 });

console.log(xp.calculate("1+2+3"));
console.log(xp.calculate("1+2+xy"));
console.log(xp.calculate("10-2-x"));

