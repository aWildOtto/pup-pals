$(document).ready(function(){

//edit profile picture
  $(".edit").on('click', function(event){
    $('.owner-box').slideToggle('fast');
    $('.status').slideToggle('fast');
    $('.new-status').slideToggle('fast');
    $('.edit-profile').slideToggle('fast');
  });





//post/render status
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

  function createStatusElement(status) {
    var $p = $('<p>', {class: 'rendered', text: status});
    return $p;
  }

  function renderStatus(statusData){
    $('.status').empty();
    var $newStatus = createStatusElement(statusData[0].status)
    $('.status').prepend($newStatus);
  }

  function loadStatus(){
    $.ajax({
      url: `/api/owner/${id}`
    }).done(function(status){
      renderStatus(status);
    })
  }

  $('.status-form').on('submit', function(event){
    event.preventDefault();
    var $inputLength = $('.status-form textarea').val().length;
    if($inputLength === 0) {
      alert('Hey bud, your status can\'t be empty(Ծ‸ Ծ)')
      return;
    } else if($inputLength > 140) {
      alert('Whoa there friendo, your status is over 100 characters ◔_◔');
      return;
    } else {
      $.ajax({
        method: 'POST',
        url: '/api/owner/:id',
        data: $(this).serialize()
      }).done(function(){
        $('.status-form textarea').val('');
        loadStatus();
      });
    }
  });

  loadStatus();

})