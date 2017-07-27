$(document).ready(function(){
  function createProfileElements(profile) {
    var $img = $("<img>", {class:"owner-avatar", src:profile.avatar_url});
    var $h2 = $("<h2>", {class:"listContent",text: profile.username});
    var $h4 = $("<h4>", {class:"owner-name",text: profile.name});
    var $div = $("<div>", {class:"owner-box"});
    $div.append($img).append($h2).append($h4);
    return $div;
  }

  function renderProfile(profileData) {
    $('.profile').empty()
    var $profile = createProfileElements(profileData)
    $('.profile').append($profile)
  }

  function loadProfile(){
    $.ajax({
      url: `/api/owner/profile/${id}`
    }).done(function(profile){
      renderProfile(profile[0]);
    });
  }
  function createStatusElement(status) {
    var $p = $('<span>', {class: 'rendered', text: status});
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

//edit profile
  $(".edit").on('click', function(){
    $('.owner-box').slideToggle('fast');
    $('#statusBox').slideToggle('fast');
    $('.new-status').slideToggle('fast');
    $('.edit-profile').slideToggle('fast');
    $('.back').slideToggle('fast');
    $('.seperator').slideToggle('fast');    
    $('.edit').hide();
  });

  $(".back").on('click', function(event){
    $('.owner-box').slideToggle('fast');
    $('#statusBox').slideToggle('fast');
    $('.new-status').slideToggle('fast');
    $('.edit-profile').slideToggle('fast');
    $('.back').hide();
    $('.seperator').slideToggle('fast');        
    $('.edit').slideToggle('fast');
  });


  loadProfile();

  $('.edit-form').on('submit', function(event) {
    event.preventDefault();
    $.ajax({
      method: 'POST',
      url: `/api/owner/profile/${id}`,
      data: $(this).serialize()
    }).done(function(){
      loadProfile();
      $('.edit-form .input').val('');
      $('.edit-profile').slideToggle();
      $('.owner-box').slideToggle();
      $('#statusBox').slideToggle();
      $('.new-status').slideToggle();
      $('.back').hide();
      $('.edit').slideToggle();
    })
  })

//post/render status
  $(".new-status textarea").on("input change keyup", function(event){
    var length = $(this).val().length;
    var remaining = 100 - length;
    var $counter = $(this).parent().children('.counter');
    if (remaining < 0) {
      $counter.addClass('changeRed');
    } else {
      $counter.removeClass('changeRed');
    }
    $counter.text(remaining);    
  });



  $('.status-form').on('submit', function(event){
    event.preventDefault();
    var $counter = $(".new-status textarea").parent().children('.counter');
    var $inputLength = $('.status-form textarea').val().length;
    if($inputLength === 0) {
      alert('Hey bud, your status can\'t be empty(Ծ‸ Ծ)')
      return;
    } else if($inputLength > 100) {
      alert('Whoa there friendo, your status is over 100 characters ◔_◔');
      return;
    } else {
      $.ajax({
        method: 'POST',
        url: '/api/owner/:id',
        data: $(this).serialize()
      }).done(function(){
        loadStatus();
        $('.status-form textarea').val('');
        $counter.text(100);         
      });
    }
  });

  loadStatus();

})