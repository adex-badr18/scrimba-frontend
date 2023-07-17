const imgs = [
    "images/hip1.jpg",
    "images/hip2.jpg",
    "images/hip3.jpg"
]

const containerEl = document.getElementById("container");

function render(images) {
    let output = ""
    for (let i = 0; i < images.length; i++) {
        output += `
            <img class="team-img" src="${images[i]}">
        `
    }
    
    containerEl.innerHTML = output
}

