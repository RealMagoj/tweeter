const createTweetElement = function(tweet) {
  const $tweet = $(`
    <article class="tweet">
      <header>
        <div class="user">
          <span><img class="user-icon" src="${tweet.user.avatars}"/></span>
          <span class="name">${tweet.user.name}</span>
        </div>
        <div>
          <span class="handle">${tweet.user.handle}</span>
        </div>
      </header>
      <p class="tweet-body">${escape(tweet.content.text)}</p>
      <hr/>
      <footer>
        <div class="date">${timeago.format(tweet.created_at)}</div>
        <div>
          <span><i class="fas fa-flag"></i></span>
          <span><i class="fas fa-retweet"></i></span>
          <span><i class="fas fa-heart"></i></span>
        </div>
      </footer>
    </article>
  `);
  return $tweet;
};

const renderTweets = function(tweets) {
  $('#tweets-container').empty();
  for (const tweet of tweets) {
    let $tweet = createTweetElement(tweet);
    $('#tweets-container').append($tweet);
  }
}

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

$(document).ready(()=> {
  const loadTweets = function() {
    $.get('/tweets').then(function(res) {
      renderTweets(res);
    });
  }
  const loadError = function(error) {
    if ($("#error-message").is(":hidden")) {
      $("#error-message").html(error).slideDown("slow");
    } else {
      $("#error-message").hide();
    }
  }
  loadTweets();
  $('#tweet-form').submit(function(evt) {
    evt.preventDefault();
    $("#error-message").hide();
    const tweetLength = $(this).find('textarea').val().length;
    let error;
    if (tweetLength === 0) {
      error = 'TWEET ERROR, CAN NOT BE BLANK!';
      loadError(error);
    } else if (tweetLength > 140) {
      error = 'TWEET ERROR, CAN NOT BE LONGER THAN 140 CHARACTERS!';
      loadError(error);
    } else{
      const data = $(this).serialize();
      $.post('/tweets', data).then(function() {
        loadTweets();
        $('#tweet-text').val('');
        $('output[name="counter"]').val(140);
      });
    }
  });
});