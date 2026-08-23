'use strict';

function multiply(y, x) {
    console.log(y * x);
}

multiply(3, 3);
multiply(4, 4);
multiply(5, 5);

//////

function getMultiplier() {
    return function (y, x) {
        console.log(y * x);
    };
}

const theMultiplier = getMultiplier();
theMultiplier(3, 3);
theMultiplier(4, 4);
theMultiplier(5, 5);

//////

function getBetterMultiplier(y){
    return function (x){
        console.log(y * x);
    };
}

const multiplyByFive = getBetterMultiplier(5);
multiplyByFive(2);

const multiplyBySix = getBetterMultiplier(6);
multiplyBySix(2);

///////

const letters = ['a', 'B', 'c'];

function ourEvery(array, callback){
    for (let i = 0; i < array.length; i++){
        if (!callback(array[i]))
            return false;
    }
    return true;
}

/*function checkUpper (letter){
    letter === letter.toUpperCase();
}*/

console.log(ourEvery(letters, (letter) => letter === letter.toUpperCase()));

console.log(ourEvery(letters, (letter) => letter === letter.toLowerCase()));

function ourSome(array, callback){
    for (let i = 0; i < array.length; i++){
        if (callback(array[i]))
            return true;
    }
    return false;
}

console.log(ourSome(letters, (letter) => letter === letter.toUpperCase()));

console.log(ourSome(letters, (letter) => letter === letter.toLowerCase()));

//////

console.log(letters.every((letter) => letter === letter.toUpperCase()));

console.log(letters.every((letter) => letter === letter.toLowerCase()));

console.log(letters.some((letter) => letter === letter.toUpperCase()));

console.log(letters.some((letter) => letter === letter.toLowerCase()));
