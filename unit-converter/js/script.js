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

convertBtn.addEventListener("click", () => {
    value = Number(numberInput.value);
    render(value);
})

function lengthConversion(num) {
    const feet = (num * 3.281).toFixed(3);
    const meter = (num / 3.281).toFixed(3);
    return [feet, meter];
}

function volumeConversion(num) {
    const gallon = (num * 0.264).toFixed(3);
    const liter = (num / 0.264).toFixed(3);
    return [gallon, liter];
}

function massConversion(num) {
    const pound = (num * 2.204).toFixed(3);
    const kilo = (num / 2.204).toFixed(3);
    return [pound, kilo];
}

function render(num) {
    lengthOutputEl.textContent = `${value} meters = ${lengthConversion(num)[0]} feet | ${num} feet = ${lengthConversion(num)[1]} meters`;

    volumeOutputEl.textContent = `${value} meters = ${volumeConversion(num)[0]} feet | ${num} feet = ${volumeConversion(num)[1]} meters`;

    
}