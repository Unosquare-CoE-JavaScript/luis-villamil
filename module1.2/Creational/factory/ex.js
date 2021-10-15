/* 
    * It's basically a static method like a constructor but it's more expressive.
    * There can be multiple factories inside a single factory class
    * We can have also a hierarchie of factories (Abstract Factory)
*/
class Person {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

class PersonFactory {
    static id = 0;
    createPerson(name) {
        console.log(this)
        return new Person(
            PersonFactory.id++,
            name
        )
    }
}

