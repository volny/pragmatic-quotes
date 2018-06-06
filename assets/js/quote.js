(function($) {

  /*
   * FUNCTIONS
   */

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
    //.css({'padding': padding.toString() + 'px 2rem'})
      .css({'padding': padding.toString() + 'px 2rem'})
      .css({'maxHeight': (padding*2 + titleHeight + titleMargin + bodyHeight).toString() + 'px'});
  }


  function makeTweet(title, body, hash) {
    var tweet = title + ' - ' + body.slice(0, -1);
    var link = 'https://volny.co/pragmatic#' + hash;
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
    // TODO use actual hash
    var href= makeTwitterLink(makeTweet(title, body, '1'));
    $('#tweetButton').click(function() {
      console.log(href)
      // TODO this better be a modal
      window.open(href, '_blank');
    })
  }

  function injectNew(data) {
    var randomIndex = Math.floor(Math.random() * data.length);
    var quote = data[randomIndex];
    $('#titleTarget').text(quote.title);
    $('#bodyTarget').text(quote.body);

    updateTwitterButton(quote.title, quote.body);
  }

  /*
   * DATA
   */

  $.getJSON('assets/data.json', function(json) {
    var data = json.data;
    injectNew(data);
  })

  /*
   * EVENTS
   */

  $('#nextButton').click(function(event) {
    event.preventDefault();

    // gotta get computed style now before closing the header
    var computedPadding = $('.inner').css('paddingTop');

    closeHeader();
    setTimeout(function() {
      // injectNew(data);
      openHeader(computedPadding);
    }, 1000)
  });


  // $('#tweetButton').click(function() {
  //   console.log('tweet')
  // })

  /*
   * TWITTER
   */

  // twitter intent code (https://dev.twitter.com/web/intents)
  (function() {
    if (window.__twitterIntentHandler) return;
    var intentRegex = /twitter\.com\/intent\/(\w+)/,
        windowOptions = 'scrollbars=yes,resizable=yes,toolbar=no,location=yes',
        width = 550,
        height = 253,
        winHeight = screen.height,
        winWidth = screen.width;

    function handleIntent(e) {
      e = e || window.event;
      var target = e.target || e.srcElement,
          m, left, top;

      while (target && target.nodeName.toLowerCase() !== 'a') {
        target = target.parentNode;
      }

      if (target && target.nodeName.toLowerCase() === 'a' && target.href) {
        m = target.href.match(intentRegex);
        if (m) {
          left = Math.round((winWidth / 2) - (width / 2));
          top = 0;

          if (winHeight > height) {
            top = Math.round((winHeight / 2) - (height / 2));
          }

          window.open(target.href, 'intent', windowOptions + ',width=' + width +
                                             ',height=' + height + ',left=' + left + ',top=' + top);
          e.returnValue = false;
          e.preventDefault && e.preventDefault();
        }
      }
    }

    if (document.addEventListener) {
      document.addEventListener('click', handleIntent, false);
    } else if (document.attachEvent) {
      document.attachEvent('onclick', handleIntent);
    }
    window.__twitterIntentHandler = true;
  }());

})(jQuery)
