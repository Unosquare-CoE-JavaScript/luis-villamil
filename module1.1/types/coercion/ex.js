// TODO: write the validation functions
function isValidName(name) {
    if (typeof name !== 'string') {
        return false;
    } else if (name.trim().length >= 3 ) {
        return true;
    } else {
        return false;
    }
}

function hoursAttended(attended, length) {
    if (!isValidStringOrNumber(attended) || !(isValidStringOrNumber(length))) {
        return false;
    }
    const attendedNumber = Number(attended);
    const lengthNumber = Number(length);

    if (attendedNumber < 0 && lengthNumber < 0) {
        return false;
    } else if (!isWholeNumber(attendedNumber) || !isWholeNumber(lengthNumber)) {
        return false;
    } else if (attendedNumber > lengthNumber) {
        return false;
    }

    return true;

    function isValidStringOrNumber(x) {
        if (typeof x === 'string' && !Number.isNaN(Number(x)) && x.trim().length !== 0) {
            return true;
        } else if(typeof x === 'number') {
            return true;
        }
        return false;
    }

    // After the explanation video, I realized this could be replaced by Number.isInteger()
    function isWholeNumber(x) { 
        return x % 1 === 0;
    }
}

// tests:
console.log(isValidName("Frank") === true);
console.log(hoursAttended(6,10) === true);
console.log(hoursAttended(6,"10") === true);
console.log(hoursAttended("6",10) === true);
console.log(hoursAttended("6","10") === true);

console.log(isValidName(false) === false);
console.log(isValidName(null) === false);
console.log(isValidName(undefined) === false);
console.log(isValidName("") === false);
console.log(isValidName("  \t\n") === false);
console.log(isValidName("X") === false);
console.log(hoursAttended("",6) === false);
console.log(hoursAttended(6,"") === false);
console.log(hoursAttended("","") === false);
console.log(hoursAttended("foo",6) === false);
console.log(hoursAttended(6,"foo") === false);
console.log(hoursAttended("foo","bar") === false);
console.log(hoursAttended(null,null) === false);
console.log(hoursAttended(null,undefined) === false);
console.log(hoursAttended(undefined,null) === false);
console.log(hoursAttended(undefined,undefined) === false);
console.log(hoursAttended(false,false) === false);
console.log(hoursAttended(false,true) === false);
console.log(hoursAttended(true,false) === false);
console.log(hoursAttended(true,true) === false);
console.log(hoursAttended(10,6) === false);
console.log(hoursAttended(10,"6") === false);
console.log(hoursAttended("10",6) === false);
console.log(hoursAttended("10","6") === false);
console.log(hoursAttended(6,10.1) === false);
console.log(hoursAttended(6.1,10) === false);
console.log(hoursAttended(6,"10.1") === false);
console.log(hoursAttended("6.1",10) === false);
console.log(hoursAttended("6.1","10.1") === false);
