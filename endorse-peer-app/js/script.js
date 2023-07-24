import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-dd256-default-rtdb.firebaseio.com/"
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const endorsementListInDB = ref(database, "endorsementList");

const textareaEl = document.getElementById("endorsement-textarea");
const publishButton = document.getElementById("publish-btn");
const endorsementChatListEl = document.getElementById("endorsement-list-el");
const endorsementInfoEl = document.getElementById('endorsement-info')

publishButton.addEventListener("click", () => {
    if (textareaEl.value !== "") {
        let endorsement = textareaEl.value;

        push(endorsementListInDB, endorsement);
        clearTextarea();
    } else {
        showErrorMessage();
        
        setTimeout(removeErrorMessageEl, 5000);
    }
})

onValue(endorsementListInDB, (snapshot) => {
    if (snapshot.exists()) {
        let endorsementArray = Object.values(snapshot.val());

        // clearEndorsementChatList();

        endorsementArray.forEach((currentEndorsement) => {
            // appendEndorsementToChatList(currentEndorsement);
        })
    } else {
        endorsementChatListEl.innerHTML = `No endorsements posted yet`
    }
})

function showErrorMessage() {
    createErrorMessageElement();
}

function createErrorMessageElement() {
    let errorMessageElement = document.createElement('span');
    errorMessageElement.id = 'error-message-el';
    errorMessageElement.textContent = 'Write endorsement in the text field above 👆';

    endorsementInfoEl.parentNode.insertBefore(errorMessageElement, endorsementInfoEl.nextSibling);
}

function removeErrorMessageEl() {
    const errorMessageEl = document.getElementById("error-message-el");
    errorMessageEl.remove();
    
}

function clearTextarea() {
    textareaEl.value = "";
}

function clearEndorsementChatList() {
    endorsementChatListEl.innerHTML = '';
}

function appendEndorsementToChatList(endorsement) {
    let endorsementEl = document.createElement("div");
    endorsementEl.textContent = endorsement;
    endorsementEl.className = "posted-endorsement-el"

    endorsementChatListEl.prepend(endorsementEl);
}