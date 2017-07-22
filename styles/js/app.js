
/* Theme Name: Cubana - Multipurpose
   Author:Harry
   Author e-mail: harrynworld@gmail.com
   Version: 1.0.0
   Created:February 2015
   File Description:Main JS file of the template
*/


/* ------------------------------------------------------------------------------
 This is jquery module for main app
 ------------------------------------------------------------------------------ */
//var $ = jQuery.noConflict(); //Relinquish jQuery's control of the $ variable. 

/* Global constants */

/*global jQuery */
jQuery(function ($) {
    'use strict';

    /**
     * Contact Form Application
     */
    var ContactFormApp = {
        $contactForm: $("#ajax-form"),
        $contactFormBtn: $("#send"),
        $contactFormName: $("#name2"),
        $contactFormEmail: $("#email2"),
        $contactFormMessage: $("#message2"),
        $confirmMessage: $("#ajaxsuccess"),
        $errorMessages: $(".error"),
        $errorName: $("#err-name"),
        $errorEmail: $("#err-emailvld"),
        $errorMessage: $("#err-message"),
        $errorForm: $("#err-form"),
        $errorTimeout: $("#err-timedout"),
        $errorState: $("#err-state"),

        //Validate Contact Us Data
        validate: function () {
            var error = false; // we will set this true if the form isn't valid

            var name = this.$contactFormName.val(); // get the value of the input field
            if(name == "" || name == " " || name == "Name") {
                this.$errorName.show(500);
                this.$errorName.delay(4000);
                this.$errorName.animate({
                    height: 'toggle'  
                }, 500, function() {
                    // Animation complete.
                }); 
                error = true; // change the error state to true
            }

            var email_compare = /^([a-z0-9_.-]+)@([da-z.-]+).([a-z.]{2,6})$/; // Syntax to compare against input
            var email = this.$contactFormEmail.val().toLowerCase(); // get the value of the input field

            if (email == "" || email == " " || email == "E-mail") { // check if the field is empty
                this.$contactFormEmail.fadeIn('slow'); // error - empty
                error = true;
            }
            else if (!email_compare.test(email)) { // if it's not empty check the format against our email_compare variable
                this.$errorEmail.show(500);
                this.$errorEmail.delay(4000);
                this.$errorEmail.animate({
                    height: 'toggle'  
                }, 500, function() {
                    // Animation complete.
                });         
                error = true;
            }

            var message = this.$contactFormMessage.val(); // get the value of the input field
            
            if(message == "" || message == " " || message == "Message") {              
                this.$errorMessage.show(500);
                this.$errorMessage.delay(4000);
                this.$errorMessage.animate({
                    height: 'toggle'  
                }, 500, function() {
                    // Animation complete.
                });            
                error = true; // change the error state to true
            }

            if(error == true) {
                this.$errorForm.show(500);
                this.$errorForm.delay(4000);
                this.$errorForm.animate({
                    height: 'toggle'  
                }, 500, function() {
                    // Animation complete.
                }); 
            }

            return error;
        },
        //contact form submit handler
        contactFormSubmit: function (obj) {
            this.$errorMessages.fadeOut('slow'); // reset the error messages (hides them)

            if(this.validate() == false) {

                var data_string = $('#ajax-form').serialize(); // Collect data from form

                var $this = this;
                $.ajax({
                    type: "POST",
                    url: $this.$contactForm.attr('action'),
                    data: data_string,
                    timeout: 6000,
                    error: function(request,error) {
                        if (error == "timeout") {
                            $this.$errorTimeout.slideDown('slow');
                        }
                        else {
                            $this.$errorState.slideDown('slow');
                            $this.$errorState.html('An error occurred: ' + error + '');
                        }
                    },
                    success: function() {
                        $this.$confirmMessage.show(500);
                        $this.$confirmMessage.delay(4000);
                        $this.$confirmMessage.animate({
                            height: 'toggle'  
                            }, 500, function() {
                        });    
                        
                        $this.$contactFormName.val('');
                        $this.$contactFormEmail.val('');
                        $this.$contactFormMessage.val('');
                    }
                });
            }
            return false;
        },
        bindEvents: function () {
            //binding submit event
            this.$contactFormBtn.on('click', this.contactFormSubmit.bind(this));
        },
        init: function () {
            //initializing the contact form
            console.log('Contact form is initialized');
            this.bindEvents();
            return this;
        }
    };

    /**
        Main application module
    */
    var App = {
        $options: {},
        $backToTop: $(".back-to-top"),
        $nav: $("nav"),
        $counterProject: $("#counter-pro"),
        $counterClient: $('#counter-client'),
        $counterWork: $('#counter-works'),
        $counterAward: $('#counter-award'),
        $loader: $(".loader"),
        $animationload: $(".animationload"),
        $navbarLink: $('.navbar-nav a'),
        $testiSlider: $("#testi-carousel"),
        $homeSlider: $("#main-home-carousel"),

        bindEvents: function () {
            //binding events
            $(window).on('scroll', this.scroll.bind(this));
            $(document).on('ready', this.docReady.bind(this));
        },
        //window scroll event
        scroll: function (event) {
            if ($(window).scrollTop() > 100) {
                this.$backToTop.fadeIn();
            } else {
                this.$backToTop.fadeOut();
            }

            if ($(window).scrollTop() > 80) {
                this.$nav.addClass('small');
            } else {
                this.$nav.removeClass('small'); 
            }
        },
        //document ready event
        docReady: function () {
            //contat form
            ContactFormApp.init();

            this.$counterProject.counterUp({
                delay: 50,
                time: 10000
            });

            this.$counterClient.counterUp({
                delay: 50,
                time: 5000
            });

            this.$counterWork.counterUp({
                delay: 50,
                time: 7000
            });

            this.$counterAward.counterUp({
                delay: 50,
                time: 12000
            });


            this.$loader.delay(300).fadeOut();
            this.$animationload.delay(600).fadeOut("slow");

            this.$backToTop.click(function(){
                $("html, body").animate({ scrollTop: 0 }, 1000);
                return false;
            }); 


            $(window).stellar({
                horizontalScrolling: false,
                responsive: true,
                scrollProperty: 'scroll',
                parallaxElements: false,
                horizontalOffset: 0,
                verticalOffset: 0
            });

            if(this.$testiSlider.length > 0) {
                this.$testiSlider.owlCarousel({
                    // Most important owl features
                    items: 1,
                    itemsCustom: false,
                    itemsDesktop: [1199, 1],
                    itemsDesktopSmall: [980, 1],
                    itemsTablet: [768, 1],
                    itemsTabletSmall: false,
                    itemsMobile: [479, 1],
                    singleItem: false,
                    startDragging: true,
                    autoPlay: true
                });
            }

            if(this.$homeSlider.length > 0) {
                this.$homeSlider.owlCarousel({
                    // Most important owl features
                    paginationSpeed: 1000,
                    pagination: false,
                    navigation: false,
                    singleItem: true,
                    slideSpeed: 600,
                    autoPlay: 5000
                });
            }

        },
        init: function (_options) {
            $.extend(this.$options, _options);
            this.bindEvents();
        }
    };

    //Initializing the app
    App.init({});

});


//Magnific Popup
$('.show-image').magnificPopup({type: 'image'});
// Easy pi-chart
$( document ).ready(function() {
    $('#mySkill1').circliful();
    $('#mySkill2').circliful();
    $('#mySkill3').circliful();
    $('#mySkill4').circliful();

});
//Typed
// $(".element").each(function(){
//     var $this = $(this);
//     $this.typed({
//     strings: $this.attr('data-elements').split(','),
//     typeSpeed: 100, // typing speed
//     backDelay: 3000 // pause before backspacing
//     });
// });

/* --------------------------------------------
    Video Script 
    -------------------------------------------- */
    $(".player").mb_YTPlayer();
