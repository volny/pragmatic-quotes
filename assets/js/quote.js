(function($) {

  /*
   * FUNCTIONS
   */

  function getHash() {
    return location.hash.match(/^#?(.*)$/)[1];
  }

  function writeHash(id) {
    var hash = getHash()
    var url = window.location.href
    if (hash === "") {
      $(location).attr('href', url + "#" + id)
    } else {
      var baseUrl = url.slice(0, url.lastIndexOf('#'))
      $(location).attr('href', baseUrl + "#" + id)
    }
  }

  function closeHeader() {
    $('#inner').css({'padding': '0 2rem'}).css({maxHeight: 0});
  }

  function openHeader(computedPadding) {
    function getVal(string) {
      return parseInt(string.match(/\d+/))
    }
    var padding = getVal(computedPadding);
    var titleHeight = getVal($('#titleTarget').css('height'));
    var titleMargin = getVal($('#titleTarget').css('marginBottom'));
    var bodyHeight = getVal($('#bodyTarget').css('height'));

    $('#inner')
      .css({'padding': padding.toString() + 'px 2rem'})
      .css({'maxHeight': (padding*2 + titleHeight + titleMargin + bodyHeight).toString() + 'px'});
  }

  function makeTweet(title, body, hash) {
    var tweet = title + ' - ' + body.slice(0, -1);
    var link = 'https://volny.co/pragmatic/#' + hash;
    return tweet.length > 280
      ? tweet.slice(0, tweet.lastIndexOf(' ', 276 - link.length)) + '...' + ' ' + link
      : tweet + ' ' + link
  }

  function makeTwitterLink(tweet) {
    // https://dev.twitter.com/web/tweet-button/web-intent
    var twitterURL = "https://twitter.com/intent/tweet";
    var query = "?text=";
    return twitterURL + query + encodeURIComponent(tweet);
  }

  function updateTwitterButton(title, body) {
    var href= makeTwitterLink(makeTweet(title, body, getHash()));
    $('#tweetLink').attr('href', href);
  }

  function injectNew(data, id) {
    var _id;
    if (id === "") {
      _id = Math.floor(Math.random() * data.length);
      writeHash(_id)
    } else {
      _id = id
    }
    var quote = data[_id];
    $('#titleTarget').text(quote.title);
    $('#bodyTarget').text(quote.body);

    updateTwitterButton(quote.title, quote.body);
  }

  /*
   * DATA
   */

  $.getJSON('assets/data.json', function(json) {
    var data = json.data;
    var id = getHash()

    injectNew(data, id);

    /*
     * EVENTS
     */

    $('#nextButton').click(function(event) {
      event.preventDefault();

      // gotta get computed style now before closing the header
      var computedPadding = $('.inner').css('paddingTop');

      closeHeader();
      setTimeout(function() {
        injectNew(data, "");
        openHeader(computedPadding);
      }, 1000)
    });
  });
})(jQuery)
