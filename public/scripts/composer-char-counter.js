$(document).ready(function() {
  $('.new-tweet').on('input', '#tweet-text', function(e) {
    $(this).closest('.new-tweet').find('.counter');
    const counter = $(this).closest('.new-tweet').find('.counter');
    const current_length = $(this).val().length;
    $(counter).html(140 - current_length);
    if ($(counter).val() < 0) {
      $(counter).addClass('red');
    } else {
      $(counter).removeClass('red');
    }
  });
});