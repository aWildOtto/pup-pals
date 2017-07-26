$(document).ready(function () {

  /*  className colors
        
  className: default(transparent), important(red), chill(pink), success(green), info(blue)
        
  */


  /* initialize the external events
  -----------------------------------------------------------------*/

  $('#external-events div.external-event').each(function () {

    // create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
    // it doesn't need to have a start or end
    var eventObject = {
      title: $.trim($(this).text()) // use the element's text as the event title
    };

    // store the Event Object in the DOM element so we can get to it later
    $(this).data('eventObject', eventObject);

    // make the event draggable using jQuery UI
    $(this).draggable({
      zIndex: 999,
      revert: true, // will cause the event to go back to its
      revertDuration: 0 //  original position after the drag
    });

  });
  /* initialize the calendar
  -----------------------------------------------------------------*/
  
  //Load the events from ajax call
  function loadEvents(){
    $.ajax({
      method: 'GET',
      url: '/api/events'
    })
      .done(function(allEvents){
        return $.ajax({
          method: 'GET',
          url: '/api/userEvents'
        }).done(function(rsvped){
          console.log(rsvped);
        allEvents.map(function(event) {
          var year = moment(event.date_time).format("YYYY");
          var month = moment(event.date_time).format("MM") - 1;
          var day = moment(event.date_time).format("D");
          var hour = moment(event.date_time).format("HH"); 
          var min = moment(event.date_time).format("mm");
          var eventClass = 'regular';
          if(rsvped){
            rsvped.forEach(function(rsvped_id){
              if(event.id === rsvped_id.id){
                eventClass = 'rsvped';
              }
            });
          }
          var source = { 
            events: [{
              title: event.title,
              start: new Date(year, month, day, hour, min),
              allDay: false,
              className: eventClass,
              url: `/events/${event.id}`
            }]
          };
          $('#calendar').fullCalendar( 'addEventSource', source );
        });
      }
      )
    });
      
    
  };

  var calendar = $('#calendar').fullCalendar({
    header: {
      left: 'title',
      right: 'prev,next today'
    },
    editable: false,
    firstDay: 0, //  1(Monday) this can be changed to 0(Sunday) for the USA system
    selectable: false,
    defaultView: 'month',

    axisFormat: 'h:mm',
    columnFormat: {
      month: 'ddd', // Mon
      week: 'ddd d', // Mon 7
      day: 'dddd M/d', // Monday 9/7
      agendaDay: 'dddd d'
    },
    titleFormat: {
      month: 'MMMM yyyy', // September 2009
      week: "MMMM yyyy", // September 2009
      day: 'MMMM yyyy' // Tuesday, Sep 8, 2009
    },
    allDaySlot: false,
    selectHelper: true,
    select: function (start, end, allDay) {
      var title = prompt('Event Title:');
      if (title) {
        calendar.fullCalendar('renderEvent', {
            title: title,
            start: start,
            end: end,
            allDay: allDay
          },
          true // make the event "stick"
        );
      }
      calendar.fullCalendar('unselect');
    },
    droppable: false, // this allows things to be dropped onto the calendar !!!
    drop: function (date, allDay) { // this function is called when something is dropped

      // retrieve the dropped element's stored Event Object
      var originalEventObject = $(this).data('eventObject');

      // we need to copy it, so that multiple events don't have a reference to the same object
      var copiedEventObject = $.extend({}, originalEventObject);

      // assign it the date that was reported
      copiedEventObject.start = date;
      copiedEventObject.allDay = allDay;

      // render the event on the calendar
      // the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
      $('#calendar').fullCalendar('renderEvent', copiedEventObject, true);

      // is the "remove after drop" checkbox checked?
      if ($('#drop-remove').is(':checked')) {
        // if so, remove the element from the "Draggable Events" list
        $(this).remove();
      }
    },
  });
  loadEvents();
});