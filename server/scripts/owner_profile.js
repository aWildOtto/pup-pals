$(document).ready(function(){
  $('.status-form').on('submit', function(event){
    event.preventDefault();
    var $inputLength = $('.status-form textarea').val().length;
    if($inputlength === 0) {
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