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

    console.log(postObj);
    clearForm();
});

function clearForm() {
    document.getElementById('post-title').value = '';
    document.getElementById('post-body').value = '';
}

window.onscroll = () => {
    if (window.scrollY > 20) {
        header.className = 'header';
    } else {
        header.classList.remove('header');
    }
}