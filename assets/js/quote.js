(function($) {
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


  $('#tweetButton').click(function() {
    console.log('tweet')
  })


})

