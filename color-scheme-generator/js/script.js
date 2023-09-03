const colorCanvas = document.getElementById('color-canvas');
const colorsContainer = document.getElementById('colors-container');
const hexContainer = document.getElementById('hex-container');
const modesDropdown = document.getElementById('modes-dropdown');
const colorInput = document.getElementById('color-input');
const getColorBtn = document.getElementById('get-colors-btn');
const selectBtn = document.getElementById('select-btn');
const modesSelect = document.getElementById('modes-select');
const selectedValue = document.getElementById('selected-value');
const optionsList = document.querySelectorAll('.modes-dropdown li');

document.addEventListener('click', (e) => {
    console.log(e.target)
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
    } else if (e.target.dataset.hex) {
        navigator.clipboard.writeText(e.target.dataset.hex).then(() => {
            const copiedEl = document.createElement('span');
            copiedEl.textContent = `Color (${e.target.dataset.hex}) Copied`;
            colorCanvas.prepend(copiedEl);
            colorCanvas.style.border = `5px solid ${e.target.dataset.hex}`;

            setTimeout(() => {
                copiedEl.remove();
            }, 5000);
        });
    } else if (e.target.id === 'select-btn') {
        // add/remove active class on the container element
        modesSelect.classList.toggle('active');

        // update the aria-expanded attribute based on the current state
        selectBtn.setAttribute(
            'aria-expanded',
            selectBtn.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
    } else if (e.target.dataset.mode) {
        // Click Events
        if (e.type === 'click' && e.clientX !== 0 && e.clientY !== 0) {
            selectedValue.textContent = e.target.dataset.mode;
            modesSelect.classList.remove('active');
        }

        // Key Events
        if (e.key === 'Enter') {
            selectedValue.textContent = e.target.dataset.mode;
            modesSelect.classList.remove('active');
        }
    }
})

async function getSchemeModes() {
    const res = await fetch('https://www.thecolorapi.com/scheme?hex=000000');
    const data = await res.json();
    return Object.keys(data._links.schemes);
}

getSchemeModes().then(modes => {
    const optionsHtml = modes.map((mode, i) => {
        const modeTitleCase = mode.substring(0, 1).toUpperCase() + mode.substring(1).toLowerCase();

        return `
            <li role="option" data-mode=${mode}>
                <input type="radio" id="${mode}-${i}" name="color-mode" />
                <label for="${mode}-${i}">${modeTitleCase}</label>
            </li>
        `
    }).join(' ');

    modesDropdown.innerHTML = optionsHtml;
});