import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-dd256-default-rtdb.firebaseio.com/"
}

const addBtn = document.getElementById("add-button");
const inputField = document.getElementById("input-field");

addBtn.addEventListener("click", () => {
    let inputValue = inputField.value;
    console.log(inputValue);
});