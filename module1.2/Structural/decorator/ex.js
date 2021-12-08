/* 
  * It attaches addtional reponsibilities to objects without modifying those objects or inheriting from them.
  * They are generally composable with each other.
*/
class Bird
{
  constructor(age=0)
  {
    this.age = age;
  }

  fly()
  {
    return this.age < 10 ? 'flying' : 'too old';
  }
}

class Lizard
{
  constructor(age=0)
  {
    this.age = age;
  }

  crawl()
  {
    return this.age > 1 ? 'crawling' : 'too young';
  }
}

class Dragon
{
    constructor(age = 0) {
		this.bird = new Bird();
		this.lizard = new Lizard();
		this._age = age;
	}

	set age(value) {
		this._age = this.bird.age = this.lizard.age = value;
	}

	get age() {
		return this._age;
	}

	fly() {
		return this.bird.fly();
	}
	crawl() {
		return this.lizard.crawl();
	}
}