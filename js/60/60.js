'use strict';

function trackDosage(medicationName, initialDosage) {

    const pin = 1234;

    return {
        getInstructions() {
            return `Take ${initialDosage}mg of ${medicationName}`;
        },

        adjustDosage(doctorPin, newDosage) {
            if (doctorPin === pin && newDosage > 0){
                initialDosage = newDosage;
            } else {
                console.log('Error You have no access');
            }
        }
    };
}

const Donald = trackDosage('Aspirin', 50);

console.log(Donald.getInstructions());

Donald.adjustDosage(1234, 100);
console.log(Donald.getInstructions());

Donald.adjustDosage(123, 100);

Donald.adjustDosage(1234, -10);

//console.log(initialDosage);