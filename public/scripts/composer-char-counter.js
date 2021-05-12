$(document).ready(function() {
  $('.new-tweet').on('keydown', '#tweet-text', function(e) {
    $(this).closest('.new-tweet').find('.counter');
    const counter = $(this).closest('.new-tweet').find('.counter');
    if (e.keyCode === 8 && Number(counter.val()) < 140) {
      $(counter).html(Number($(counter).val()) + 1);
    }
    if (e.keyCode !== 8) {
      $(counter).html(Number($(counter).val()) - 1);
    }
    if ($(counter).val() < 0) {
      $(counter).addClass('red');
    } else {
      $(counter).removeClass('red');
    }
  });
  $('.date').html(timeago.format(Date()));
});