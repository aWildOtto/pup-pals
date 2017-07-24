$(document).ready(function(){

//edit profile
  $(".edit").on('click', function(){
    $('.owner-box').slideToggle('fast');
    $('.status').slideToggle('fast');
    $('.new-status').slideToggle('fast');
    $('.edit-profile').slideToggle('fast');
    $('.back').slideToggle('fast');
    $('.edit').hide();
  });

  $(".back").on('click', function(event){
    $('.owner-box').slideToggle('fast');
    $('.status').slideToggle('fast');
    $('.new-status').slideToggle('fast');
    $('.edit-profile').slideToggle('fast');
    $('.back').hide();
    $('.edit').slideToggle('fast');
  });

  function createProfileElements(profile) {
    var $img = $("<img>", {class:"owner-avatar", src:profile.avatar_url});
    var $h2 = $("<h2>", {class:"listContent",text: profile.username});
    var $h4 = $("<h4>", {text: profile.name});
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
      console.log('watch me load')
      console.log(profile[0].name)
    });
  }

  loadProfile()

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
      $('.status').slideToggle();
      $('.new-status').slideToggle();
      $('.back').hide();
      $('.edit').slideToggle();
    })
  })



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