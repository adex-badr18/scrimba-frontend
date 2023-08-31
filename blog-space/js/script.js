const postsContainer = document.getElementById('posts-container');
const header = document.querySelector('header');

fetch('https://apis.scrimba.com/jsonplaceholder/posts', { method: 'GET' })
    .then(res => res.json())
    .then(data => {
        const postsArray = data.slice(0, 5);

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
    });

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();

    const postTitle = document.getElementById('post-title').value;
    const postBody = document.getElementById('post-body').value;

    const postObj = {
        title: postTitle,
        body: postBody
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
    .then(data => postsContainer.prepend(createPostElement(data.title, data.body)))

    clearForm();
});

function clearForm() {
    document.getElementById('post-title').value = '';
    document.getElementById('post-body').value = '';
}

function createPostElement(title, body) {
    const postTitleEl = document.createElement('h2');
    postTitleEl.className = 'post-title';
    postTitleEl.textContent = title;

    const postBodyEl = document.createElement('p');
    postBodyEl.className = 'post-body';
    postBodyEl.textContent = body;

    const divider = document.createElement('div');
    divider.className = 'divider';

    const postContainer = document.createElement('div');
    postContainer.className = 'post';
    postContainer.append(postTitleEl, postBodyEl, divider);

    return postContainer;
}

window.onscroll = () => {
    if (window.scrollY > 20) {
        header.className = 'header';
    } else {
        header.classList.remove('header');
    }
}