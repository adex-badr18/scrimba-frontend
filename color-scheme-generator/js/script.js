const modesDropdown = document.getElementById('modes-dropdown');
const colorInput = document.getElementById('color-input');

async function getSchemeModes() {
    const res = await fetch('https://www.thecolorapi.com/scheme?hex=000000');
    const data = await res.json();
    return Object.keys(data._links.schemes);
}

getSchemeModes().then(modes => {
    console.log(modes);

    const optionsHtml = modes.map(mode => {
        mode = mode.substring(0, 1).toUpperCase() + mode.substring(1).toLowerCase();
        return `
            <option value="${mode}">${mode}</option>
        `
    }).join(' ');

    modesDropdown.innerHTML = optionsHtml;
});
