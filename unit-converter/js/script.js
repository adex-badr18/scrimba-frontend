const numberInput = document.getElementById("number-input");
const convertBtn = document.getElementById("convert-btn");
const lengthOutputEl = document.getElementById("length-output");
const volumeOutputEl = document.getElementById("volume-output");
const massOutputEl = document.getElementById("kilo-output");

/*
1 meter = 3.281 feet
1 liter = 0.264 gallon
1 kilogram = 2.204 pound
*/

value = Number(numberInput.value);

function lengthConversion(num) {
    const meter = num * 3.281;
    const feet = num / 3.281;
    return [meter, feet];
}

