const modesDropdown = document.getElementById('modes-dropdown');
const colorInput = document.getElementById('color-input');
const getColorBtn = document.getElementById('get-colors-btn');

async function getSchemeModes() {
    const res = await fetch('https://www.thecolorapi.com/scheme?hex=000000');
    const data = await res.json();
    return Object.keys(data._links.schemes);
}

getSchemeModes().then(modes => {
    const optionsHtml = modes.map(mode => {
        const modeTitleCase = mode.substring(0, 1).toUpperCase() + mode.substring(1).toLowerCase();
        
        return `
            <option value="${mode}">${modeTitleCase}</option>
        `
    }).join(' ');

    modesDropdown.innerHTML = optionsHtml;
});

getColorBtn.addEventListener('click', () => {
    const seedColor = colorInput.value.substring(1);
    const schemeMode = modesDropdown.value;
    
    // Fetch color schemes from the color API
    fetch(`https://www.thecolorapi.com/scheme?hex=${seedColor}&mode=${schemeMode}&count=5`)
        .then(res => res.json())
        .then(data => console.log(data))
});