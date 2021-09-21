// TODO: define polyfill for `Object.is(..)`

if (!Object.is || true) {
	Object.is = function ObjectIs(p1, p2) {
        if (isNegativeZero(p1) || isNegativeZero(p2)) {
            return isNegativeZero(p1) && isNegativeZero(p2)
        } else if (Number.isNaN(p1) && Number.isNaN(p2)) {
            return true;
        } else if (p1 === p2) {
            return true;
        }
        return false

        function isNegativeZero(x) {
            return x === 0 && (1 / x) === -Infinity;
        }
     };
}

// tests:
console.log(Object.is(42,42) === true);
console.log(Object.is("foo","foo") === true);
console.log(Object.is(false,false) === true);
console.log(Object.is(null,null) === true);
console.log(Object.is(undefined,undefined) === true);
console.log(Object.is(NaN,NaN) === true);
console.log(Object.is(-0,-0) === true);
console.log(Object.is(0,0) === true);

console.log(Object.is(-0,0) === false);
console.log(Object.is(0,-0) === false);
console.log(Object.is(0,NaN) === false);
console.log(Object.is(NaN,0) === false);
console.log(Object.is(42,"42") === false);
console.log(Object.is("42",42) === false);
console.log(Object.is("foo","bar") === false);
console.log(Object.is(false,true) === false);
console.log(Object.is(null,undefined) === false);
console.log(Object.is(undefined,null) === false);
