$(document).ready(function () {

  $('.statuses').on('click', 'a.status-delete', function (event) {
    status_id = $(this).data().id
    $.ajax({
      url: `/api/pet/delete/status/${status_id}`,
      method: 'POST'
    }).done(function () {
      loadStatuses()
    });
  });

  //profile update

  $(".edit").on('click', function () {
    $('.puppy-card').slideToggle('fast');
    $('.statuses').slideToggle('fast');
    $('.new-status').slideToggle('fast');
    $('.edit-profile').slideToggle('fast');
    $('.back').slideToggle('fast');
    $('.seperator').slideToggle('fast');
    $('.edit').hide();
  });

  $(".back").on('click', function (event) {
    $('.puppy-card').slideToggle('fast');
    $('.statuses').slideToggle('fast');
    $('.new-status').slideToggle('fast');
    $('.edit-profile').slideToggle('fast');
    $('.seperator').slideToggle('fast');
    $('.back').hide();
    $('.edit').slideToggle('fast');
  });

  function createProfileElements(profile) {

    var sex = (profile.sex == "Male") ? 'Boy' : 'Girl'
    var neutered = (profile.neutered == true) ? 'Neutered' : 'Not Neutered'

    var $div1 = $("<div>", {
      class: "puppy-card"
    })
    var $div2 = $("<div>", {
      class: "puppy-box"
    })

    var $img = $("<img>", {
      class: "pup-pic",
      src: profile.avatar_url
    });
    var $h2 = $("<h2>", {
      class: "listContent",
      text: profile.name
    });

    var $div3 = $("<div>", {
      class: "pup-info"
    })

    var $pBreed = $("<p>", {
      text: profile.breed
    })
    var $pAge = $("<p>", {
      text: `${profile['age']} years old`
    })
    var $pSex = $("<p>", {
      text: `${sex}`
    })
    var $pNeutered = $("<p>", {
      text: `${neutered}`
    })

    $div3.append($pBreed).append($pAge).append($pSex).append($pNeutered)
    $div2.append($img).append($h2).append($div3)
    $div1.append($div2)
    return $div1;
  }

  function renderProfile(profileData) {
    $('.profile').empty()
    var $profile = createProfileElements(profileData)
    $('.profile').append($profile)
  }

  function loadProfile() {
    $.ajax({
      url: `/api/pet/profile/${id}`
    }).done(function (profile) {
      renderProfile(profile[0]);
    });
  }

  loadProfile()

  $('.edit-form').on('submit', function (event) {
    event.preventDefault();
    $.ajax({
      method: 'POST',
      url: `/api/pet/profile/${id}`,
      data: $(this).serialize()
    }).done(function () {
      loadProfile()
      $('.edit-form .input').val('');
      $('.edit-profile').slideToggle();
      $('.puppy-card').slideToggle();
      $('.statuses').slideToggle();
      $('.back').hide();
      $('.edit').slideToggle();
    })
  })

  //status updates

  $(".new-status textarea").on("input", function (event) {
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
    var $section = $('<section>', {class: 'photo-share'});
    statuses.forEach((status) => {
      var $timeSpan = $('<span>', {
        class: 'status-time',
        text: moment(status.created_at).format("ddd MMMM Do YYYY") + " at " + moment(status.created_at).format("h:mm a")
      })
      var $textSpan = $('<span>', {
        class: 'status-text',
        text: status.content
      });
      if (status.media_url) {
        var $img = $('<img>', {
          class: 'status-img',
          src: status.media_url
        })
      }
      var $div = $('<div>', {class:'status'})

      var $infoDiv = $('<div>', {class:'status-information'})
      $infoDiv.append($timeSpan).append($textSpan)
      if ($img){
        var $imgDiv = $('<div>', {class:'status-img-container'})
        $imgDiv.append($img)
        $imgDiv.append($infoDiv)

        $div.append($imgDiv)
      }
      var $a = $('<a>', {class: 'status-delete', "data-id" : status.id});
      var $deleteIcon = $('<i>', {class: 'fa fa-times-circle'});

      $a.append($deleteIcon)

      $infoDiv.prepend($a)
      $section.append($div)
    })
    return $section;
  }

  function renderStatuses(statusesData) {
    $('.statuses').empty();
    var $newStatuses = createStatusesElements(statusesData)
    $('.statuses').prepend($newStatuses);
  }

  function loadStatuses() {
    $.ajax({
      url: `/api/pet/${id}`
    }).done(function (statuses) {
      renderStatuses(statuses);
    })
  }


  function uploadFile(file, signedRequest, url) {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', signedRequest);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          document.getElementsByClassName('preview').src = url;
          document.getElementsByClassName('status-url').value = url;
        } else {
          alert('Could not upload file.');
        }
      }
    };
    xhr.send(file);
  }


  $('.status-form').on('submit', function (event) {
    event.preventDefault();
    if ($('#file-input')[0].files.length) {
      var files = $('#file-input')[0].files;
      var file = files[0];
      $.ajax({
        url: `/s3?file-name=${file.name}&file-type=${file.type}`
      }).done(function (data) {
        var response = JSON.parse(data);
        uploadFile(file, response.signedRequest, response.url);

        var $inputLength = $('.status-form textarea').val().length;
        if ($inputLength === 0) {
          alert('Hey bud, your status can\'t be empty(Ծ‸ Ծ)')
          return;
        } else if ($inputLength > 140) {
          alert('Whoa there friendo, your status is over 140 characters ◔_◔');
          return;
        } else {
          $.ajax({
            method: 'POST',
            url: `/api/pet/${id}`,
            data: {
              content: $('.status-form textarea').val(),
              media_url: response.url
            }
          }).done(function () {
            $('.status-form textarea').val('');
            $('#file-input').val('');
            loadStatuses();
          });
        }
      })
    } else {
      var $inputLength = $('.status-form textarea').val().length;
      if ($inputLength === 0) {
        alert('Hey bud, your status can\'t be empty(Ծ‸ Ծ)')
        return;
      } else if ($inputLength > 140) {
        alert('Whoa there friendo, your status is over 140 characters ◔_◔');
        return;
      } else {
        $.ajax({
          method: 'POST',
          url: `/api/pet/${id}`,
          data: {
            content: $('.status-form textarea').val(),
            media_url: ''
          }
        }).done(function () {
          $('.status-form textarea').val('');
          loadStatuses();
        });
      }
    }
  });

  loadStatuses();

  $(document).on('change', '.btn-file :file', function () {
    var input = $(this),
      label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
    input.trigger('fileselect', [label]);
  });

  $('.btn-file :file').on('fileselect', function (event, label) {

    var input = $(this).parents('.input-group').find(':text'),
      log = label;

    if (input.length) {
      input.val(log);
    } else {
      if (log) alert(log);
    }

  });

  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $('#img-upload').attr('src', e.target.result);
      }

      reader.readAsDataURL(input.files[0]);
    }
  }

  $("#file-input").change(function () {
    readURL(this);
  });
})