const makeSchoolTweetUrl = 'http://localhost:7890/1.1/statuses/user_timeline.json?count=30&screen_name=makeschool';
const newsYComTweetUrl = 'http://localhost:7890/1.1/statuses/user_timeline.json?count=30&screen_name=newsycombinator';
const yComTweetUrl = 'http://localhost:7890/1.1/statuses/user_timeline.json?count=30&screen_name=ycombinator';
const selfTweetUrl = 'http://localhost:7890/1.1/statuses/user_timeline.json?count=30';

const userAccounts = [
  {
    columnName: document.getElementById('makeSchoolCol'),
    tweetUrl: makeSchoolTweetUrl,
    visible: true,
  },
  {
    columnName: document.getElementById('newsYComCol'),
    tweetUrl: newsYComTweetUrl,
    visible: true,
  },
  {
    columnName: document.getElementById('yComCol'),
    tweetUrl: yComTweetUrl,
    visible: true,
  },
  {
    columnName: document.getElementById('selfCol'),
    tweetUrl: selfTweetUrl,
    visible: false,
  }
]
function loadTweets() {
  console.log('inside window.onload function');
  userAccounts.filter(account=>account.visible).forEach(account => {
    getTweets(account.tweetUrl, account.columnName);
  });
}
function getTweets(url, columnName) {
  fetch(url).then(res=>res.json()).then(tweets=> {
    console.log(tweets);
    renderTweets(tweets, columnName);
  });
}
window.onload = loadTweets;

function renderTweets(tweets, columnName){
  const tweetHtmlArray = tweets.map(tweet => {
    return `<div class="userName">${tweet.user.name}</div><div class="userTweet">${tweet.text}</div><div class="create_at_date">${tweet.user.created_at}</div><a href="https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}">Link to tweet</a><br /><br />`;
  });
  const tweetHTML = tweetHtmlArray.join(' ')
  console.log(tweetHTML);
  if(columnName){
    columnName.innerHTML = tweetHTML;
  }
}