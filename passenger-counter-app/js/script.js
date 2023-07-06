let count = 0;
let countEl = document.getElementById("count-el");

function increment() {
    count += 1;
    countEl.textContent = count;
}