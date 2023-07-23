const textareaEl = document.getElementById("endorsement-text");
const publishButton = document.getElementById("publish-btn");
const errorMessageEl = document.getElementById("error-message-el");
const endorsementChatListEl = document.getElementById("endorsement-list-el");

publishButton.addEventListener("click", () => {
    if (textareaEl.value !== "") {
        appendEndorsementToChatList();
    } else {
        showErrorMessage();
        setTimeout(clearErrorMessage, 5000);
    }
})

function showErrorMessage() {
    errorMessageEl.textContent = "Write endorsement in the text field above 👆";
}

function clearErrorMessage() {
    errorMessageEl.textContent = "";
}

function appendEndorsementToChatList() {
    let endorsement = textareaEl.value;

    let endorsementEl = document.createElement("div");
    endorsementEl.textContent = endorsement;
    endorsementEl.className = "posted-endorsement-el"

    endorsementChatListEl.append(endorsementEl);
}