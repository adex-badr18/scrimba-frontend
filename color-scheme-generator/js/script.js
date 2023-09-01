function getSchemeModes() {
    let modesArray = [];

    fetch('https://www.thecolorapi.com/scheme?hex=000000')
        .then(res => res.json())
        .then(modes => {
            Object.keys(modes._links.schemes).forEach(mode => modesArray.push(mode));
        })
    return modesArray;
}

console.log(getSchemeModes());