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

const postEl = document.createElement('div');
postEl.className = "user-post-wrapper";

// userInfoWrapper markup
const userInfoWrapper = document.createElement('div');
userInfoWrapper.className = "user-info-wrapper wrapper";

const userAvatarImg = document.createElement('img');
userAvatarImg.className = "user-avatar";
userAvatarImg.setAttribute('src', `${posts[0].avatar}`);
userAvatarImg.setAttribute('alt', 'User avatar in a post');

const nameLocationBox = document.createElement('div');
nameLocationBox.className = 'name-location-box';

const nameEl = document.createElement('h3');
nameEl.textContent = `${posts[0].name}`;

const locationEl = document.createElement('p');
locationEl.textContent = `${posts[0].location}`;

// postImageWrapper markup
const postImageWrapper = document.createElement('div');
postImageWrapper.className = 'post-image-wrapper';

const postImage = document.createElement('img');
postImage.className = 'post-img';
postImage.setAttribute('src', `${posts[0].post}`);
postImage.setAttribute('alt', 'Posted image');


nameLocationBox.append(nameEl, locationEl);
userInfoWrapper.append(userAvatarImg, nameLocationBox);



