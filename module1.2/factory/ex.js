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

