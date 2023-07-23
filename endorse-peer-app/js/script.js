import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-dd256-default-rtdb.firebaseio.com/"
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const endorsementListInDB = ref(database, "endorsementList");

const textareaEl = document.getElementById("endorsement-text");
const publishButton = document.getElementById("publish-btn");
const errorMessageEl = document.getElementById("error-message-el");
const endorsementChatListEl = document.getElementById("endorsement-list-el");

publishButton.addEventListener("click", () => {
    if (textareaEl.value !== "") {
        let endorsement = textareaEl.value;

        push(endorsementListInDB, endorsement);

        appendEndorsementToChatList(endorsement);
        clearTextarea();
    } else {
        showErrorMessage();
        setTimeout(clearErrorMessage, 5000);
    }
})

onValue(endorsementListInDB, (snapshot) => {
    if (snapshot.exists()) {
        let endorsementArray = Object.values(snapshot.val());

        endorsementArray.forEach((currentEndorsement) => {
            appendEndorsementToChatList(currentEndorsement);
        })
    } else {
        endorsementChatListEl.innerHTML = `No endorsements posted yet`
    }
})

function showErrorMessage() {
    errorMessageEl.textContent = "Write endorsement in the text field above 👆";
}

function clearErrorMessage() {
    errorMessageEl.textContent = "";
}

function clearTextarea() {
    textareaEl.value = "";
}

function appendEndorsementToChatList(endorsement) {
    let endorsementEl = document.createElement("div");
    endorsementEl.textContent = endorsement;
    endorsementEl.className = "posted-endorsement-el"

    endorsementChatListEl.prepend(endorsementEl);
}