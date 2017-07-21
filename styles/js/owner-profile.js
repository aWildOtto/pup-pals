$(document).ready(function(){

  $(".new-status textarea").on("input", function(event){
    var length = $(this).val().length;
    var remaining = 100 - length;
    var $counter = $(this).parent().children('.counter');
    $counter.text(remaining);
    if (remaining < 0) {
      $counter.addClass('changeRed');
    } else {
      $counter.removeClass('changeRed');
    }
  });

  $('.status-form').on('submit', function(event){
    event.preventDefault();
    var $inputLength = $('.status-form textarea').val().length;
    if($inputLength === 0) {
      alert('Hey bud, your status can\'t be empty(Ծ‸ Ծ)')
      return;
    }else if($inputLength > 140) {
      alert('Whoa there friendo, your tweet is over 140 characters ◔_◔');
      return;
    } else {
      $.ajax({
        method: 'POST',
        url: '/owner/:id',
        data: $(this).serialize()
      }).done(function(){
        $('.status-form textarea').val('');
      });
    }
  })
})