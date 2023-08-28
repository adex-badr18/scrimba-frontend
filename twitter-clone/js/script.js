import { tweetsData as initialTweetsData } from "./data.js";
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

let tweetsData = [];

if (localStorage.getItem('tweetsData')) {
    retrieveTweetsFromLocalStorage();
} else {
    localStorage.setItem("tweetsData", JSON.stringify(initialTweetsData));
    tweetsData = initialTweetsData;
}

document.addEventListener('click', (e) => {
    if (e.target.dataset.like) {
        handleLikeClick(e.target.dataset.like);
    } else if (e.target.dataset.retweet) {
        handleRetweetClick(e.target.dataset.retweet);
    } else if (e.target.dataset.reply) {
        handleReplyClick(e.target.dataset.reply);
    } else if (e.target.id === 'tweet-btn') {
        handleTweetBtnClick();
    } else if (e.target.dataset.ellipsis) {
        handleEllipsisClick(e.target.dataset.ellipsis);
    } else if (e.target.dataset.replyBtn) {
        console.log(e.target.className.includes('right'));
        replyTweet(e.target.dataset.replyBtn);
    } else if (!e.target.className.includes('pop-up')) {
        const popupElements = [...document.querySelectorAll('.pop-up-menu')];

        const targetPopups = popupElements.filter(element => {
            return !element.classList.contains('hidden');
        });

        targetPopups.forEach(element => {
            element.classList.add('hidden');
        })
    }
});

function handleTweetBtnClick() {
    const tweetInput = document.getElementById('tweet-input');

    if (tweetInput.value) {
        const tweetObj = {
            handle: `@Scrimba`,
            profilePic: `./images/scrimbalogo.png`,
            likes: 0,
            retweets: 0,
            tweetText: tweetInput.value,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4(),
        }
        tweetsData.unshift(tweetObj);
        storeTweetsInLocalStorage();
        render();

        tweetInput.value = '';
    }
}

function replyTweet(replyId) {
    const replyInput = document.getElementById(`reply-input-${replyId}`);
    const targetTweetObj = tweetsData.filter(tweet => {
        return tweet.uuid === replyId;
    })[0];

    if (replyInput.value) {
        targetTweetObj.replies.unshift({
            handle: `@Scrimba`,
            profilePic: `./images/scrimbalogo.png`,
            tweetText: replyInput.value
        });
    }

    storeTweetsInLocalStorage();
    render();
    toggleReplyView(replyId);
}

function handleReplyClick(replyId) {
    toggleReplyView(replyId);
}

function toggleReplyView(replyId) {
    document.getElementById(`replies-${replyId}`).classList.toggle('hidden');
}

function handleLikeClick(tweetId) {
    const targetTweetObj = tweetsData.filter((tweet) => {
        return tweet.uuid === tweetId;
    })[0];

    if (targetTweetObj.isLiked) {
        targetTweetObj.likes--;
    } else {
        targetTweetObj.likes++;
    }

    targetTweetObj.isLiked = !targetTweetObj.isLiked;

    storeTweetsInLocalStorage();
    render();
}

function handleRetweetClick(tweetId) {
    const targetTweetObj = tweetsData.filter(tweet => {
        return tweet.uuid === tweetId;
    })[0];

    if (targetTweetObj.isRetweeted) {
        targetTweetObj.retweets--;
    } else {
        targetTweetObj.retweets++;
    }

    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted;

    storeTweetsInLocalStorage();
    render();
}

function handleEllipsisClick(id) {
    document.getElementById(`pop-up-menu-${id}`).classList.toggle('hidden');

    document.getElementById(`menu-item-${id}`).addEventListener('click', () => {
        const targetTweetObj = tweetsData.filter(tweet => {
            return tweet.uuid === id;
        })[0];

        tweetsData = tweetsData.filter(tweet => tweet != targetTweetObj);

        storeTweetsInLocalStorage();
        render();
    });
}

function getFeedHtml() {
    let feedHtml = '';

    if (localStorage.getItem('tweetsData')) {
        retrieveTweetsFromLocalStorage();
    }

    tweetsData.forEach(tweet => {
        // let likeIconClass = '';
        // let retweetedIconClass = '';

        // if (tweet.isLiked) {
        //     likeIconClass = 'liked';
        // }
        // ========== OR ==============
        let likeIconClass = tweet.isLiked ? 'liked' : '';
        // ========== OR ==============
        // tweet.isLiked && (likeIconClass = 'liked');

        // if (tweet.isRetweeted) {
        //     retweetedIconClass = 'retweeted';
        // }
        // ========== OR ==============
        let retweetedIconClass = tweet.isRetweeted ? 'retweeted' : '';
        // ========== OR ==============
        // tweet.isRetweeted && (retweetedIconClass = 'retweeted');

        let repliesHtml = '';

        if (tweet.replies.length) {
            tweet.replies.forEach(reply => {
                repliesHtml += `
                    <div class="tweet-reply">
                        <div class="tweet-inner">
                            <img src="./${reply.profilePic}" class="profile-pic">
                            <div>
                                <p class="handle">${reply.handle}</p>
                                <p class="tweet-text">${reply.tweetText}</p>
                            </div>
                        </div>
                    </div>
                `;
            });
        }

        feedHtml += `
            <div class="tweet">
                <div class="tweet-inner">
                    <img src="${tweet.profilePic}" class="profile-pic">
                    <div>
                        <div class="tweet-header">
                            <p class="handle">${tweet.handle}</p>
                            <div class="pop-up">
                                <i class="fa-solid fa-ellipsis-vertical" id="ellipsis-${tweet.uuid}" data-ellipsis="${tweet.uuid}"></i>
                                <div class="pop-up-menu hidden" id="pop-up-menu-${tweet.uuid}">
                                    <div class="menu-item" id="menu-item-${tweet.uuid}">
                                        <i class="fa-regular fa-trash-can menu-icon"></i>
                                        <span class="menu-text">Delete</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <p class="tweet-text">${tweet.tweetText}</p>
                        <div class="tweet-details">
                            <span class="tweet-detail">
                            <i class="fa-regular fa-comment-dots" data-reply="${tweet.uuid}"></i>
                            ${tweet.replies.length}
                            </span>
                            <span class="tweet-detail">
                            <i class="fa-solid fa-heart ${likeIconClass}" data-like="${tweet.uuid}"></i>
                            ${tweet.likes}
                            </span>
                            <span class="tweet-detail">
                            <i class="fa-solid fa-retweet ${retweetedIconClass}" data-retweet="${tweet.uuid}"></i>
                            ${tweet.retweets}
                            </span>
                        </div>   
                    </div>            
                </div>
                <div class="hidden" id="replies-${tweet.uuid}">
                    <div class="reply-input-container">
                        <input class="reply-tweet-input" id="reply-input-${tweet.uuid}" type="text" placeholder="Post your reply!">
                        <div class="reply-btn"><i id="reply-${tweet.uuid}" data-reply-btn="${tweet.uuid}" class="fa-solid fa-arrow-right"></i></div>
                    </div>
                    ${repliesHtml}
                </div> 
            </div>
        `;
    })
    return feedHtml;
}

function render() {
    document.getElementById('feed').innerHTML = getFeedHtml();
}

function storeTweetsInLocalStorage() {
    localStorage.setItem("tweetsData", JSON.stringify(tweetsData));
}

function retrieveTweetsFromLocalStorage() {
    tweetsData = JSON.parse(localStorage.getItem("tweetsData"));
}

render();