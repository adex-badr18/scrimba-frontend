import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-dd256-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const addBtn = document.getElementById("add-button");
const inputFieldEl = document.getElementById("input-field");
const shoppingListEl = document.getElementById("shopping-list");

addBtn.addEventListener("click", () => {
    let inputValue = inputFieldEl.value;
    push(shoppingListInDB, inputValue);

    inputFieldEl.value = "";

    shoppingListEl.innerHTML += `
        <li>
            ${inputValue}
        </li>
    `
});