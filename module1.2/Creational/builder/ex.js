/* 
    * Helps separate the constructions of other objects when they get too complicated (perform several steps).
    * We can also create multiple sub-builders that cooperate.
    * Tipically have a fluent interface which mean we can chain multiple methods into a single statement. 
*/
class Code {
    constructor(className = '') {
        this.className = className;
        this.fields = [];
    }

    toString() {
        let classDeclaration = [];
        classDeclaration.push(`class ${this.className} {\n`);
        if (this.fields.length) {
            classDeclaration.push(`  constructor(${this.fields.join(', ')}) {\n`);
            for (let field of this.fields) {
                classDeclaration.push(`    this.${field} = ${field}; \n`);
            }
            classDeclaration.push(`  }\n`);
        }
        classDeclaration.push(`}`);
        return classDeclaration.join('');
    }
}

class CodeBuilder {
    constructor(className) {
        this.code = new Code(className);
    }

    addField(fieldName) {
        this.code.fields.push(fieldName);
        return this;
    }

    toString() {
        return this.code.toString();
    }
}


let cb = new CodeBuilder('Person');
cb.addField('name').addField('age');
console.log(cb.toString());
