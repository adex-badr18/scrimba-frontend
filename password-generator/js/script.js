const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];

let buttonEl = document.querySelector("#btn-generate-paasword");
let passwordOneEl = document.querySelector("#password-1");
let passwordTwoEl = document.querySelector("#password-2");

function generatePasswords() {
    let password = "";

    for (i = 0; i < 2; i++) {
        password = "";
        for (j = 0; j < 15; j++) {
            let randomNumber = Math.floor(Math.random() * characters.length);
            password += characters[randomNumber];
        }
        
        if (i === 0) {
            passwordOneEl.textContent = password;
        } else {
            passwordTwoEl.textContent = password;
        }
        
    }
}

generatePasswords();