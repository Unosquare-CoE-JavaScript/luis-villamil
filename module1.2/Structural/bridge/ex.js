class Shape
{
  constructor(name, renderer)
  {
    this.name = name;
    this.renderer = renderer;
  }
  
  toString() {
      return `Drawing ${this.name} ${this.renderer.whatToRenderAs}`;
  }

}

class Triangle extends Shape
{
  constructor(renderer)
  {
    super('triangle', renderer);
  }
}

class Square extends Shape
{
  constructor(renderer)
  {
    super('square', renderer);
  }
}

class VectorRenderer
{
  get whatToRenderAs() {
    return "as lines";
  }
}

class RasterRenderer
{
  get whatToRenderAs() {
    return "as pixels";
  }
}