const colorsContainer = document.getElementById('colors-container');
const hexContainer = document.getElementById('hex-container');
const modesDropdown = document.getElementById('modes-dropdown');
const colorInput = document.getElementById('color-input');
const getColorBtn = document.getElementById('get-colors-btn');

document.addEventListener('click', (e) => {
    if (e.target.id === 'get-colors-btn') {
        const seedColor = colorInput.value.substring(1);
        const schemeMode = modesDropdown.value;

        colorsContainer.innerHTML = '';
        hexContainer.innerHTML = '';

        // Fetch color schemes from the color API
        fetch(`https://www.thecolorapi.com/scheme?hex=${seedColor}&mode=${schemeMode}&count=5`)
            .then(res => res.json())
            .then(data => {
                const hexValues = data.colors.map(color => color.hex.value);

                hexValues.forEach(hexValue => {
                    const colorPlaceholder = document.createElement('div');
                    const hexPlaceholder = document.createElement('div');

                    // Set colorPlaceholder properties
                    colorPlaceholder.id = hexValue;
                    colorPlaceholder.className = hexValue;
                    colorPlaceholder.style.backgroundColor = hexValue;
                    colorPlaceholder.style.height = '25.875em';
                    colorPlaceholder.style.width = '6.875em';
                    colorPlaceholder.setAttribute('data-hex', hexValue);

                    colorsContainer.style.display = 'flex';
                    colorsContainer.append(colorPlaceholder);

                    // Set colorPlaceholder properties
                    hexPlaceholder.textContent = hexValue;
                    hexPlaceholder.className = hexValue;
                    hexPlaceholder.style.backgroundColor = '#FFFFFF';
                    hexPlaceholder.style.textAlign = 'center';
                    hexPlaceholder.style.height = '2.875em';
                    hexPlaceholder.style.width = '6.875em';
                    hexPlaceholder.setAttribute('data-hex', hexValue);

                    hexContainer.style.display = 'flex';
                    hexContainer.append(hexPlaceholder);
                })
            })
    }
})

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
    // const seedColor = colorInput.value.substring(1);
    // const schemeMode = modesDropdown.value;

    // colorsContainer.innerHTML = '';
    // hexContainer.innerHTML = '';

    // // Fetch color schemes from the color API
    // fetch(`https://www.thecolorapi.com/scheme?hex=${seedColor}&mode=${schemeMode}&count=5`)
    //     .then(res => res.json())
    //     .then(data => {
    //         const hexValues = data.colors.map(color => color.hex.value);

    //         hexValues.forEach(hexValue => {
    //             const colorPlaceholder = document.createElement('div');
    //             const hexPlaceholder = document.createElement('div');

    //             // Set colorPlaceholder properties
    //             colorPlaceholder.id = hexValue;
    //             colorPlaceholder.className = hexValue;
    //             colorPlaceholder.style.backgroundColor = hexValue;
    //             colorPlaceholder.style.height = '25.875em';
    //             colorPlaceholder.style.width = '6.875em';
    //             colorPlaceholder.setAttribute('data-hex', hexValue);

    //             colorsContainer.style.display = 'flex';
    //             colorsContainer.append(colorPlaceholder);

    //             // Set colorPlaceholder properties
    //             hexPlaceholder.textContent = hexValue;
    //             hexPlaceholder.className = hexValue;
    //             hexPlaceholder.style.backgroundColor = '#FFFFFF';
    //             hexPlaceholder.style.textAlign = 'center';
    //             hexPlaceholder.style.height = '2.875em';
    //             hexPlaceholder.style.width = '6.875em';
    //             hexPlaceholder.setAttribute('data-hex', hexValue);

    //             hexContainer.style.display = 'flex';
    //             hexContainer.append(hexPlaceholder);
    //         })
    //     })
});