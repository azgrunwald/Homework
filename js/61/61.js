'use strict';

function createBank(balance) {
    return {
        balance: balance,
        performTransaction(amount) {
            this.balance += amount;
        }
    };
}

const account1 = createBank(5000);
const account2 = createBank(15000);
console.log(account1.balance);
console.log(account2.balance);
account1.performTransaction(2500);
account2.performTransaction(50000);
console.log(account1.balance);
console.log(account2.balance);

function performTransaction2(amount) {
    this.balance += amount;
}

performTransaction2.call(account1, 1500);
performTransaction2.apply(account2, [25000]);
console.log(account1.balance);
console.log(account2.balance);

const depositFiftyInSavings = performTransaction2.bind(account2, 50);
depositFiftyInSavings();
depositFiftyInSavings();
console.log(account2.balance);