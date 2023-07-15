const characters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "+", "=", "{", "[", "}", "]", ",", "|", ":", ";", "<", ">", ".", "?",
    "/"];

let buttonEl = document.querySelector("#btn-generate-paasword");
let passwordOneEl = document.querySelector("#password-1");
let passwordTwoEl = document.querySelector("#password-2");

// SET PASSWORD LENGTH
let passwordLength = 0;
document.getElementById("password-length-input").addEventListener("input", (e) => {
    passwordLength = Number(e.target.value);
});

// hide copy icon on page load
let copy1El = document.querySelector("#copy1-el");
let copy2El = document.querySelector("#copy2-el");

window.addEventListener("load", (e) => {
    resetPasswords();
});

// GENERATE PASSWORD ON BUTTON CLICK
let errorMessageEl = document.querySelector("small");

buttonEl.addEventListener("click", displayPasswords);

function generatePassword() {
    let password = "";

    for (i = 0; i < passwordLength; i++) {
        let randomNumber = generateRandomNumber();
        password += characters[randomNumber];
    }

    return password;
}

function generateRandomNumber() {
    return Math.floor(Math.random() * characters.length);
}

function resetPasswords() {
    copy1El.style.visibility = "hidden";
    copy2El.style.visibility = "hidden";
    passwordOneEl.textContent = "";
    passwordTwoEl.textContent = "";
}

function displayPasswords() {
    if (passwordLength > 7 && passwordLength < 16) {
        errorMessageEl.textContent = "";

        passwordOneEl.textContent = generatePassword();
        copy1El.style.visibility = "visible";

        passwordTwoEl.textContent = generatePassword();
        copy2El.style.visibility = "visible";
    } else {
        errorMessageEl.textContent = "Min: 8 characters | Max: 15 characters";
        resetPasswords();

    }

}

// THEME MODE TOGGLING
let themeToggleEl = document.getElementById("toggle-theme-mode");

themeToggleEl.addEventListener("click", (e) => {
    let passwordLengthEl = document.querySelector("#password-length-label-el");
    if (e.target.checked === true) {
        document.getElementById("password-generator").style.backgroundColor = "#ECFDF5";
        document.querySelector("h1").style.color = "#2B283A";
        document.querySelector("span").style.color = "#10B981";
        document.querySelector("p").style.color = "#6B7280";
        document.querySelector("hr").style.border = "1px solid #D5D4D8";
        passwordLengthEl.style.color = "#6B7280";
        passwordLengthEl.style.fontWeight = "700";
    } else {
        document.getElementById("password-generator").style.backgroundColor = "#1F2937";
        document.querySelector("h1").style.color = "#FFFFFF";
        document.querySelector("span").style.color = "#4ADF86";
        document.querySelector("p").style.color = "#D5D4D8";
        document.querySelector("hr").style.border = "1px solid #2F3E53";
        document.querySelector("#password-length-label-el").style.color = "#D5D4D8";
    }
});

// Copy passwords
let copiedEl = document.getElementById("copied-msg");

function clearMessage() {
    copiedEl.textContent = "";
}

let passwordCopy = "";
copy1El.addEventListener("click", (e) => {
    passwordCopy = passwordOneEl.textContent;

    navigator.clipboard.writeText(passwordCopy).then(() => {
        copiedEl.textContent = "Password Copied";
        setTimeout(clearMessage, 5000);
    });
});

copy2El.addEventListener("click", (e) => {
    passwordCopy = passwordTwoEl.textContent;

    navigator.clipboard.writeText(passwordCopy).then(() => {
        copiedEl.textContent = "Password Copied";
        setTimeout(clearMessage, 5000);
    });
});