let count = 0;
let countEl = document.getElementById("count-el");
let saveEl = document.getElementById("save-el");

function increment() {
    count += 1;
    countEl.textContent = count;
}

function decrement() {
    count -= 1;
    if (count < 0) count = 0
    countEl.textContent = count;
}

function save() {
    let countStr = count + " - ";

    if (count === 0) countStr = ""
    saveEl.textContent += countStr;

    // Re-initialize count
    count = 0;
    countEl.textContent = count;
}