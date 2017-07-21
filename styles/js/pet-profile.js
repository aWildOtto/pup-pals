
$(document).ready(function(){

   console.log('running')


  $(".new-status textarea").on("input", function(event){
    var length = $(this).val().length;
    var remaining = 140 - length;
    var $counter = $(this).parent().children('.counter');
    $counter.text(remaining);
    if (remaining < 0) {
      $counter.addClass('changeRed');
    } else {
      $counter.removeClass('changeRed');
    }
  });

  function createStatusesElements(statuses) {
    var $section = $('<section>')
    statuses.forEach((status) => {
      var $timeSpan = $('<span>', {class: 'status-time', text: moment(status.created_at).format("YYYY-MM-DD HH:mm")})
      var $textSpan = $('<span>', {class: 'status-text',text: status.content});
      var $div = $('<div>')
      $div.append($timeSpan).append($textSpan)
      $section.prepend($div)
    })
    return $section;
  }

  function renderStatuses(statusesData){
    $('.statuses').empty();
    var $newStatuses = createStatusesElements(statusesData)
    $('.statuses').prepend($newStatuses);
  }

  function loadStatuses(){
    $.ajax({
      url: `/api/pet/${id}`
    }).done(function(statuses){
      renderStatuses(statuses);
    })
  }

  $('.status-form').on('submit', function(event){
    event.preventDefault();
    var $inputLength = $('.status-form textarea').val().length;
    if($inputLength === 0) {
      alert('Hey bud, your status can\'t be empty(Ծ‸ Ծ)')
      return;
    } else if($inputLength > 140) {
      alert('Whoa there friendo, your status is over 140 characters ◔_◔');
      return;
    } else {
      $.ajax({
        method: 'POST',
        url: `/api/pet/${id}`,
        data: $(this).serialize()
      }).done(function(){
        $('.status-form textarea').val('');
        loadStatuses();
      });
    }
  });

  loadStatuses();

})