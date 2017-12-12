$(function() { // wait for document ready
    

    $("body").css("opacity", "1");

     /*REVIEWS NAV*/
    var revBoxStyle = getComputedStyle(document.querySelector('.reviews__box'))
    var revBoxBorderTop = parseInt(revBoxStyle.borderTopWidth) //WITHOUT PX
    //HEIGHT INCLUDING JUST BOTTOM_BORDER
    var revBoxHeight = document.querySelector('.reviews__box').offsetHeight - revBoxBorderTop;
    var comments = document.querySelectorAll('.reviews__box__comment')
    //optimal Height of several comments scroll
    var comOptHeight = [];
    //optimal Height of one comment scroll
    var comHeight = [] ;
    //counter for several comments scroll
    var comOptIndex = -1;
    //counter for one comment scroll
    var comIndex = -1;
    //make connection between one and multiply comments scroll
    var breakpoints = {};
    var invertBreakpoints = {};
    
    var trueBoxHeight = $('.reviews__box')[0].scrollHeight;
    var boxHeight = $('.reviews__box').height();
    var scrollLeft = trueBoxHeight - boxHeight;
    //comment is still scrolling if true
    var isPlaying = false;
    var isPaused = false;
    var scrolledFromStart = false;
    var afterMultiplyReviewsScroll = false;
    // var afterSingleReviewScroll = false;
    //after scroll from start to end
    var afterSuperScroll = false;


    /*E-mail AJAX SEND*/
    $("form").submit(function() { 
        var th = $(this);
        $.ajax({
            type: "POST",
            url: "../mail.php", 
            data: th.serialize()
        }).done(function() {
            alert("Thank you!");
            setTimeout(function() {
                // Done Functions
                th.trigger("reset");
            }, 1000);
        });
        return false;
    });

    
    /*STOP RESIZING ON PHONES*/
    var $window_height = $(window).height();
    if($(window).width() <= 768) {
        $('.intro.fullscreen').css({ 'min-height' : $window_height + 'px!important', 'max-height': $window_height + 'px!important', 'height': $window_height + 'px!important'});
    }
    // STOP RESIZING ON PHONES
    //  resize();

     /*HIGHLIGHT NAV ITEMS WHEN SCROLLING*/
    $(window).scroll(function() {
        var $window_top = $(window).scrollTop();
        var $intro_top = $('section#intro').offset().top
        var $about_top = $('section#about').offset().top
        var $galery_top = $('section#galery').offset().top
        var $galery_offset_top = $galery_top - ($galery_top - $about_top) * 0.3
        var $reviews_top = $('section#reviews').offset().top
        var $reviews_offset_top = $reviews_top - ($reviews_top - $galery_top) * 0.3
        var $contacts_top = $('section#contact').offset().top
        var $contacts_ofsset_top = $contacts_top - ($contacts_top - $reviews_top) * 0.3

       if($window_top >= $intro_top && $window_top < $about_top * 0.7) {
            $('.header__nav__item a').removeClass('active')
            $('.header__nav__item a:first').addClass('active')
        }
        else  if($window_top >=  $about_top * 0.7 && $window_top < $galery_offset_top) {
            $('.header__nav__item a').removeClass('active')
            $('.header__nav__item a:eq( 1 )').addClass('active')
        }
        else  if($window_top >= $galery_offset_top && $window_top < $reviews_offset_top) {
            $('.header__nav__item a').removeClass('active')
            $('.header__nav__item a:eq( 2 )').addClass('active')
        }
        else  if($window_top  >= $reviews_offset_top && $window_top < $contacts_ofsset_top) {
            $('.header__nav__item a').removeClass('active')
            $('.header__nav__item a:eq( 3 )').addClass('active')
        }
         else  if($window_top  >=$contacts_ofsset_top) {
            $('.header__nav__item a').removeClass('active')
            $('.header__nav__item a:eq( 4 )').addClass('active')
        }
         /*HIGHLIGHT NAV ITEMS WHEN SCROLLING END*/

   
            /*ABOUT CONTENT SHOW*/
    $introHeight = $('.intro').outerHeight();
    // $aboutHeight = $('.about').outerHeight();
    if ($(window).scrollTop() >  $introHeight * 0.65 && $(document).width()>768){
        $('.about__content').show(700)
    }
    else
        $('.about__content').hide(700)

    if( $(document).width() < 768)
        $('.about.fullscreen').css('height', 'auto')
        /*ABOUT CONTENT SHOW END*/



    })
     /*SMOOTH SCROLL TO ANCHOR*/
    $(".header__nav,.btn-wrapper").on("click", "a", function(event) { //отменяем стандартную обработку нажатия по ссылке     
        event.preventDefault(); //забираем идентификатор бока с атрибута href    
        var id = $(this).attr('href'), //узнаем высоту от начала страницы до блока на который ссылается якорь
            top = $(id).offset().top;
        var top0 = $('#intro').offset().top
           //анимируем переход на расстояние - top за 1500 мс
        $('body,html').animate({ scrollTop: top - top0 }, 1500);
    });
        $("#my-menu").on("click", "a", function(event) { //отменяем стандартную обработку нажатия по ссылке     
        event.preventDefault(); //забираем идентификатор бока с атрибута href    
        var id = $(this).attr('href'), //узнаем высоту от начала страницы до блока на который ссылается якорь
            top = $(id).offset().top;
        var top0 = $('#intro').offset().top
           //анимируем переход на расстояние - top за 1500 мс
        $('body,html').animate({ scrollTop: top - top0 }, 1500);
        // alert(top)
        // alert(top0)
    });
     /*SMOOTH SCROLL TO ANCHOR END*/

     /*REVIEWS NAV*/
    //for Navigating next and previous comments bunch
    
    function makeReviewsNawGrid(){
        var totalsumOpt = 0
        var j = 0;
        //for bunch of comments scroll
        var sumOpt = 0;
        //for 1 comment scroll
        var sum = 0;
       
        for ( var i = 0; i < comments.length; i++ ) {
            sumOpt += comments[i].offsetHeight;
            sum += comments[i].offsetHeight;
            comHeight[i] =  sum
            invertBreakpoints[i] = j;
            if (sumOpt > revBoxHeight) {
                breakpoints[j] = i; 
                //STARTS WITH LAST NOT PLACED COMMENT
                totalsumOpt += (sumOpt - comments[i].offsetHeight);
                comOptHeight[j] = totalsumOpt
                sumOpt = comments[i].offsetHeight;
                console.log(i + ' 2 '+ sumOpt)
                j++
            } 
        }
       }
    pseudoScroll();
    setTimeout(function(){$('.play,.backward,.forward,.fast-forward,.fast-backward').prop('disabled', false)}, 4999)
    setTimeout(makeReviewsNawGrid, 5000)

     function pseudoScroll() {   $('.reviews__box').css('overflow', 'auto')
        var scrollWidth = document.querySelector('.reviews__box').offsetWidth - document.querySelector('.reviews__box').clientWidth
       $('.reviews__box__comment__text').css('margin-right', scrollWidth )
       $('.reviews__box').css('overflow', 'hidden')
    }

    function nextComment() {
        // console.log('scrollTop: ' +  $('.reviews__box').scrollTop())
        // console.log('trueBoxHeight: ' +   trueBoxHeight)
        // console.log('boxHeight: ' +  boxHeight)
        // // console.log(comHeight[comIndex])
        // console.log('scrollL: ' + scrollLeft)
         if((!afterMultiplyReviewsScroll) || comIndex == -1) {
             comIndex++
             comOptIndex = invertBreakpoints[comIndex]
         }
         if(  comIndex == breakpoints[comOptHeight.length - 1] - 1) {
            comIndex = -1;
            $('.reviews__box').animate({scrollTop: 0}, 1750)
            afterSuperScroll = false;
         }


        
        $('.reviews__box').animate({scrollTop:comHeight[comIndex]}, 500)
         console.log("comOptIndex: " + comOptIndex)
        console.log("comIndex: " + comIndex)
        afterMultiplyReviewsScroll = false
        // afterSingleReviewScroll = true
    }
    function nextComments() {
        if(isPlaying) {      
            $('.reviews__box').finish()
                    }

        else if(comOptIndex < comOptHeight.length - 1 && !isPlaying) {

            comOptIndex++
            comIndex = breakpoints[comOptIndex]
        }
        else {
            comOptIndex = -1;
            comIndex = -1;
             $('.reviews__box').animate({scrollTop: 0}, 1750)
        }
        if(!isPlaying)
        $('.reviews__box').animate({scrollTop:comOptHeight[comOptIndex]}, 1000)
        // alert(comOptHeight[comOptIndex])
      
        console.log("comOptIndex: " + comOptIndex)
        console.log("comIndex: " + comIndex)
        isPlaying = false;
        afterMultiplyReviewsScroll = true
        // afterSingleReviewScroll = false
    }

   function prevComment(){
        comIndex--
        if(afterMultiplyReviewsScroll)
            comIndex--
        if(comIndex  >= 0) {
        comOptIndex = invertBreakpoints[comIndex]
        $('.reviews__box').animate({scrollTop:comHeight[comIndex]}, 800)
          console.log("comOptIndex: " + comOptIndex)
        console.log("comIndex: " + comIndex)
        }

        else if(comIndex == -1) {
            $('.reviews__box').animate({scrollTop: 0 }, 800)
            
        }
        else {
            ( $('.reviews__box').animate({scrollTop: comOptHeight[comOptHeight.length - 1]}, 1750))
            comIndex = breakpoints[comOptHeight.length - 1] - 2
            afterSuperScroll = true;

            //TODO
             // comOptIndex = breakpoints[comOptHeight.length - 2]
            // alert(comIndex)


        }      
        afterMultiplyReviewsScroll = false
        // afterSingleReviewScroll = true
        // console.log("afterSingleReviewScroll: " + afterSingleReviewScroll)
    }

      function prevComments(){
        comOptIndex--
        if(comOptIndex  >= 0) {
         
        comIndex = breakpoints[comOptIndex]

        $('.reviews__box').animate({scrollTop:comOptHeight[comOptIndex]}, 1000)
          console.log("comOptIndex: " + comOptIndex)
        console.log("comIndex: " + comIndex)
         // console.log('afterSingleReviewScroll: ' + afterSingleReviewScroll)
        }
        else if(comOptIndex == -1) {
            $('.reviews__box').animate({scrollTop: 0 }, 1000)
            comIndex = -1
            comOptIndex = -1
            afterSuperScroll = true;
             console.log("comOptIndex: " + comOptIndex)
        console.log("comIndex: " + comIndex)
          console.log("afterSuperScroll: " + afterSuperScroll)
        }
        else {
            ( $('.reviews__box').animate({scrollTop: comOptHeight[comOptHeight.length - 1]}, 1750))
            comOptIndex = comOptHeight.length - 1
            comIndex = breakpoints[comOptHeight.length - 2]
        }      
         afterMultiplyReviewsScroll = true
        // afterSingleReviewScroll = false

    }

    $('.button.forward').on('click', function() { nextComment() })
    $('.button.fast-forward').on('click', function() { nextComments() })
    $('.button.backward').on('click', function() { prevComment() })
    $('.button.fast-backward').on('click', function() { prevComments() })
    $('.button.play').on('click', function(){
        play()
         if ( isPlaying )
             $(this).html("<i class='fa fa-pause' aria-hidden='true'></i>")
        // else
        //      $(this).html("<i class='fa fa-play' aria-hidden='true'></i>")
    });

    function play() {

        if(isPlaying) {
            isPaused = true;
            isPlaying = false;
        }

        else if(isPaused) {
              isPaused = false;
            isPlaying = true;
        }

        if (!isPaused) {
        comOptIndex++
        comIndex = breakpoints[comOptIndex]
        }

        // alert(comments.length)
        var speed = (comHeight[comIndex - 1] -  comHeight[comIndex - 2]) * 30
        if (!speed)
            speed = comHeight[comIndex - 1] * 30
       
        if(!isPlaying) {
        $('.reviews__box').animate({scrollTop:comOptHeight[comOptIndex]}, speed, 'linear')
        }
        else {
            $('.reviews__box').stop();
        }
        isPlaying =  true;
        // alert(comOptHeight[comOptIndex])
         console.log('speed ' + speed)
        console.log("comOptIndex: " + comOptIndex)
        console.log("comIndex: " + comIndex)
        setTimeout(function(){isPlaying = false;}, speed)
        // afterSingleReviewScroll = false
    }

  
    function resetReviewsNav() {
    comOptHeight = [];
    comHeight = [];
    breakpoints = {};
    invertBreakpoints = {};
    comOptIndex = -1;
    comIndex = -1;
    scrolledFromStart = false;
    afterMultiplyReviewsScroll = false;
    // afterSingleReviewScroll = false;

     var revBoxHeight = document.querySelector('.reviews__box').offsetHeight - revBoxBorderTop;
    var comments = document.querySelectorAll('.reviews__box__comment');
    makeReviewsNawGrid()
    }

     /*INIT FULLCALENDAR*/
    $('#calendar').fullCalendar({
        googleCalendarApiKey: 'AIzaSyAmckkTJxLGZoqR_ajjKaRtYnaX4oCVX8Y',
        events: {
            googleCalendarId: '1kpbrqup8i1upe1s26gnqaddi4@group.calendar.google.com'
        },
        firstDay: 1,
        height: 600,
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'οюнь', 'οюль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        monthNamesShort: ['Янв.', 'Фев.', 'Март', 'Апр.', 'Май', 'οюнь', 'οюль', 'Авг.', 'Сент.', 'Окт.', 'Ноя.', 'Дек.'],
        dayNames: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
        dayNamesShort: ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"],
        buttonText: {
            prev: "◀",
            next: "▶",
            prevYear: "&nbsp;&lt;&lt;&nbsp;",
            nextYear: "&nbsp;&gt;&gt;&nbsp;",
            today: "Сегодня",
            month: "Месяц",
            week: "Неделя",
            day: "День"
        },
        textColor: 'black',
        color: 'black'
    });
    $('.intro__calendar').hide()
    $('.open-calendar-button').on('click', function() {

        $('.shadow').toggleClass('modal_shadow')
        $('.intro__calendar').css('z-index', '6').fadeToggle('slow')
      
      if ($('.shadow').hasClass('modal_shadow') ){
            $('.shadow').on('click', function() {
                if ($(event.target).closest(".intro_calendar").length) return;
                $('.shadow').removeClass('modal_shadow');
                $('.intro__calendar').fadeOut('slow');
            });
        };

    });
     /*INIT FULLCALENDAR END*/

  $("#my-menu").mmenu({

    onClick:
    {
        preventDefault: true
    },
    navbar: 
    {
    titleLink: "anchor"
    },

extensions  : ["listview-large", "fx-panels-slide-up", "fx-listitems-drop", "border-offset", "pagedim-black" ],

    "offCanvas": {
                  "position": "right"
               }
 

    /*INIT MOBILE MENU*/
      });
      var mmenu_API = $("#my-menu").data( "mmenu" );
      
      $(".hamburger--emphatic").click(function() {
        mmenu_API.open();
        $(this).addClass('is-active')
      });

 mmenu_API.bind( "close:start", function( $panel ) {
         $(".hamburger--emphatic").removeClass('is-active')
      });
 $('#my-menu .button').click(function(){mmenu_API.close()})
     /*INIT MOBILE MENU END*/

     /*INIT REVIEW ADDING*/
$(".add_review").on('click', function(){
    var $name = $('.reviews__new-review .name').val();
    var $review = $('.reviews__new-review__text').val();

    addReview($name, $review)

})
   $('.reviews__new-review__text, .reviews__new-review .name ').focus( function(){
        $(this).css('border', 'none')
     })
function addReview($name, $review) {
    if ($name.length >=1  && $review.length >=1) {

        $newComment =  $(".reviews__box__comment:first").clone().prependTo('.reviews__box')
        $('.reviews__box__comment__text__wrapper:first').removeClass('green').removeClass('red').removeClass('gray')
        $newComment.children('.reviews__box__comment__name').html($name);
        $newComment.find('.reviews__box__comment__text').html($review);
        
        $('.reviews__box__comment__text__wrapper:first').addClass($('.reviews option:selected').val())


        $('.reviews__new-review .name').val('')
        $('.reviews__new-review__text').val('')
   }
    if($name.length < 1)      
        $('.reviews__new-review .name').css('border', '2px solid #db594f')
    if($review.length < 1)
        $('.reviews__new-review__text').css('border', '2px solid #db594f') 
}

    /*SHOW MORE REVIEWS BUTTON HANDLER*/
    // $('.button.show-review').click(function(){
    //     $('.reviews__box').toggleClass('shown_all')
    //     if($('.reviews__box').hasClass('shown_all')){
    //         if ($(window).height() > $(window).width() || $(window).width() <= 768) {
    //              $(this).css('top', '66%').html("Выключить скролл")
    //         }
    //         else
    //         $(this).css('top', '66%').html("Свернуть")
    //     }
         
    //     else {
    //          if ($(window).height() > $(window).width() || $(window).width() <= 768) {
    //              $(this).css('top', '50%').html("Включить скролл")
    //         }
    //         else
    //             $(this).css('top', '50%').html("Показать еще")
    //     }     
    // })
        /*SHOW MORE REVIEWS BUTTON HANDLER END*/

     /*INIT REVIEW ADDING END*/
    
       /*ON RESIZE FUNCTION*/
    function resize() {
        /*GALLERY IMG AFTER RESIZE*/
        galleryItemImgAfterResize();
        pseudoScroll();
       
         if($(window).width() <= 768 && $(window).width() > 480 )
             $('.header__logo,.header__contacts').unwrap('.header-left').addClass('unwrapped')
         else if($(window).width() > 768 && $('.header__logo,.header__contacts').hasClass('unwrapped'))
              $('.header__logo,.header__contacts').wrapAll("<div class='header-left'></div>").removeClass('unwrapped')
        
         if ($(window).width() <= 480)
            $('.footer__phone,.footer__mail').wrapAll("<div class='footer__item,footer__left'></div>")


    //REVIEWS NAV 
   
    }

    /*DO WHEN RESIZING FINISH*/
    var resizeId;
    function resizeReview() {

    $('.reviews__box').animate({scrollTop:0}, 1000)
    clearTimeout(resizeId);
    $('.play,.pause,.backward,.forward,.fast-forward,.fast-backward').prop('disabled', true)
    resizeId = setTimeout(doneResizing, 3000);

    }
    $(window).on('orientationchange', function() {resizeReview()})
    $(window).resize(function() {
        if( !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ) {
            resizeReview()
};
    });
 
 
    function doneResizing(){
    $('.play,.pause,.backward,.forward,.fast-forward,.fast-backward').prop('disabled', false)
    resetReviewsNav()
    }
    /*DO WHEN RESIZING FINISH END*/

    /*GALLERY IMG AFTER RESIZE*/
      function galleryItemImgAfterResize() {
        var $galery__item__img__height =  $('.galery__item a img').height() + 'px';
        // alert($galery__item__img__height)
        $('.a-after').css('height', $galery__item__img__height)
        } 

    $(window).on('resize', function(){
        
       resize();
    })



});