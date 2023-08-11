import { tweetsData } from "./data.js";
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

const tweetInput = document.getElementById('tweet-input')

document.addEventListener('click', (e) => {
    if (e.target.dataset.like) {
        handleLikeClick(e.target.dataset.like);
    } else if (e.target.dataset.retweet) {
        handleRetweetClick(e.target.dataset.retweet);
    } else if (e.target.dataset.reply) {
        handleReplyClick(e.target.dataset.reply);
    } else if (e.target.id === 'tweet-btn') {
        handleTweetBtnClick();
    }
});

/*
Challenge:
2. When the Tweet button is clicked, log out an object
   for a new tweet. Make sure you include the text of 
   the tweet (how can you get that?) and a unique 
   identifier using uuidjs.
   
   The handle @Scrimba (or whatever you prefer) and 
   the profile pic scrimbalogo.png can be hard-coded.
*/

function handleTweetBtnClick() {
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
    tweetsData.push(tweetObj);

    render();
}

function handleReplyClick(replyId) {
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

    render();
}

function handleRetweetClick(tweetId) {
    const targetTweetObj = tweetsData.filter(tweet => {
        return tweet.uuid === tweetId;
    })[0];

    if (targetTweetObj.isRetweeted) {
        targetTweetObj.retweets--;
    } else {
        targetTweetObj.retweets++
    }

    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted;

    render();
}

function getFeedHtml() {
    let feedHtml = '';

    tweetsData.forEach(tweet => {
        let likeIconClass = '';
        let retweetedIconClass = '';

        if (tweet.isLiked) {
            likeIconClass = 'liked';
        }

        if (tweet.isRetweeted) {
            retweetedIconClass = 'retweeted';
        }

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
                        <p class="handle">${tweet.handle}</p>
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

render()