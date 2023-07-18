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
    const feet = num * 3.281;
    const meter = num / 3.281;
    return [feet, meter];
}

function volumeConversion(num) {
    const gallon = num * 0.264;
    const liter = num / 0.264;
    return [gallon, liter];
}

function massConversion(num) {
    const pound = num * 2.204;
    const kilo = num / 2.204;
    return [pound, kilo];
}

