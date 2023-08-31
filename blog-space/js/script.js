const postsContainer = document.getElementById('posts-container');

fetch('https://apis.scrimba.com/jsonplaceholder/posts', {method: 'GET'})
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