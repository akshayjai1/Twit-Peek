
function onLoadFunction() {
  console.log('hi');
  fetch('http://localhost:7890/1.1/statuses/user_timeline.json?count=30&screen_name=makeschool').then(res=>res.json()).then(tweets=> {
    console.log(tweets);
    renderTweets(tweets);
  });
}
window.onload = onLoadFunction;

function renderTweets(tweets){
  const tweetHtmlArray = tweets.map(tweet => {
    return `<div class="userName">${tweet.user.name}</div><div class="userTweet">${tweet.text}</div><br /><br />`;
  });
  const tweetHTML = tweetHtmlArray.join(' ')
  // return tweetHTML;
  console.log(tweetHTML);
  document.getElementsByClassName('twit-col-1')[0].innerHTML = tweetHTML;
  // return `<div>t`;
}