async function getSchemeModes() {
    const res = await fetch('https://www.thecolorapi.com/scheme?hex=000000');
    const data = await res.json();
    return Object.keys(data._links.schemes);
}

getSchemeModes().then(modes => {
    console.log(modes);
});
