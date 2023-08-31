const postsContainer = document.getElementById('posts-container');
const header = document.querySelector('header');
const titleInput = document.getElementById('post-title');
const bodyInput = document.getElementById('post-body');
const postForm = document.getElementById('post-form');

let postsArray = [];

fetch('https://apis.scrimba.com/jsonplaceholder/posts', { method: 'GET' })
    .then(res => res.json())
    .then(data => {
        postsArray = data.slice(0, 5);
        renderPosts();
    });

postForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const postObj = {
        title: titleInput.value,
        body: bodyInput.value
    };

    // Send a new post to the server with fetch API
    fetch('https://apis.scrimba.com/jsonplaceholder/posts', {
        method: 'POST',
        body: JSON.stringify(postObj),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(post => {
            postsArray.unshift(post);
            renderPosts();
        })

    clearForm();
});

function renderPosts() {
    const postsHtml = postsArray.map((post, index) => {
        return `
            <div class="post">
                <h2 class="post-title">${post.title}</h2>
                <p class="post-body">${post.body}</p>
            </div>

            ${index < postsArray.length - 1 ? '<div class="divider"></div>' : ''}
        `
    }).join(' ');

    postsContainer.innerHTML = postsHtml;
}

function clearForm() {
    postForm.reset();
}

window.onscroll = () => {
    if (window.scrollY > 20) {
        header.className = 'header';
    } else {
        header.classList.remove('header');
    }
}