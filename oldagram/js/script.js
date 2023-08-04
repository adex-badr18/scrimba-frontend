const posts = [
    {
        name: "Vincent van Gogh",
        username: "vincey1853",
        location: "Zundert, Netherlands",
        avatar: "images/avatar-vangogh.jpg",
        post: "images/post-vangogh.jpg",
        comment: "just took a few mushrooms lol",
        likes: 21
    },
    {
        name: "Gustave Courbet",
        username: "gus1819",
        location: "Ornans, France",
        avatar: "images/avatar-courbet.jpg",
        post: "images/post-courbet.jpg",
        comment: "i'm feelin a bit stressed tbh",
        likes: 4
    },
    {
        name: "Joseph Ducreux",
        username: "jd1735",
        location: "Paris, France",
        avatar: "images/avatar-ducreux.jpg",
        post: "images/post-ducreux.jpg",
        comment: "gm friends! which coin are YOU stacking up today?? post below and WAGMI!",
        likes: 152
    }
];
const postContainer = document.getElementById("post-container");

function renderPostMarkup(postObj) {
    const postEl = document.createElement('div');
    postEl.className = "user-post-wrapper";

    // userInfoWrapper markup
    const userInfoWrapper = document.createElement('div');
    userInfoWrapper.className = "user-info-wrapper wrapper";

    const userAvatarImg = document.createElement('img');
    userAvatarImg.className = "user-avatar";
    userAvatarImg.setAttribute('src', `${postObj.avatar}`);
    userAvatarImg.setAttribute('alt', 'User avatar in a post');

    const nameLocationBox = document.createElement('div');
    nameLocationBox.className = 'name-location-box';

    const nameEl = document.createElement('h3');
    nameEl.className = 'name';
    nameEl.textContent = `${postObj.name}`;

    const locationEl = document.createElement('p');
    locationEl.className = 'location';
    locationEl.textContent = `${postObj.location}`;

    // postImageWrapper markup
    const postImageWrapper = document.createElement('div');
    postImageWrapper.className = 'post-image-wrapper';

    const postImage = document.createElement('img');
    postImage.className = 'post-img';
    postImage.setAttribute('src', `${postObj.post}`);
    postImage.setAttribute('alt', 'Posted image');

    // IconsWrapper markup
    const iconsWrapper = document.createElement('div');
    iconsWrapper.className = 'icons-wrapper wrapper';

    const heartIcon = document.createElement('img');
    heartIcon.className = 'social-icon';
    heartIcon.setAttribute('src', './images/icon-heart.png');
    heartIcon.setAttribute('alt', 'Heart icon, represents like button');

    const commentIcon = document.createElement('img');
    commentIcon.className = 'social-icon';
    commentIcon.setAttribute('src', './images/icon-comment.png');
    commentIcon.setAttribute('alt', 'Comment icon');

    const dmIcon = document.createElement('img');
    dmIcon.className = 'social-icon';
    dmIcon.setAttribute('src', './images/icon-dm.png');
    dmIcon.setAttribute('alt', 'Share icon');

    // Likes count wrapper markup
    const likesCountWrapper = document.createElement('div');
    likesCountWrapper.className = 'likes-count-wrapper wrapper';

    const likesCountEl = document.createElement('p');
    likesCountEl.className = 'bold-text';
    likesCountEl.textContent = `${postObj.likes} likes`;

    // Comments wrapper markup
    const commentWrapper = document.createElement('div');
    commentWrapper.className = 'comments-wrapper wrapper';

    const commentEl = document.createElement('p');
    commentEl.className = 'comment';
    const usernameEl = document.createElement('span');
    usernameEl.className = 'comment-username bold-text';
    usernameEl.textContent = `${postObj.username}`;
    const commentText = document.createTextNode(` ${posts[1].comment}`);

    // Append child elements inside parent elements
    nameLocationBox.append(nameEl, locationEl);
    userInfoWrapper.append(userAvatarImg, nameLocationBox);

    postImageWrapper.append(postImage);

    iconsWrapper.append(heartIcon, commentIcon, dmIcon);

    likesCountWrapper.append(likesCountEl);

    commentWrapper.append(usernameEl, commentText);

    postEl.append(userInfoWrapper, postImageWrapper, iconsWrapper, likesCountWrapper, commentWrapper);

    postContainer.append(postEl);
}

posts.forEach(post => {
    renderPostMarkup(post);
})