$(function() { // wait for document ready
    // init
     resize();

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



    })
     
    $(".header__nav, #my-menu, .btn-wrapper").on("click", "a", function(event) { //отменяем стандартную обработку нажатия по ссылке     
        event.preventDefault(); //забираем идентификатор бока с атрибута href    
        var id = $(this).attr('href'), //узнаем высоту от начала страницы до блока на который ссылается якорь
            top = $(id).offset().top;
           //анимируем переход на расстояние - top за 1500 мс
        $('body,html').animate({ scrollTop: top }, 1500);
    });

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

  $("#my-menu").mmenu({

    // "extensions": [
    //         "pagedim-black",
    //         "popup"
    //      ],
    //      "autoHeight": true
         // Options
      });
      var mmenu_API = $("#my-menu").data( "mmenu" );
      
      $(".hamburger--emphatic").click(function() {
        mmenu_API.open();
        $(this).toggleClass('is-active')
      });

$("#nav").mmenu().trigger("open.mm").on("opened.mm", function() {
    alert( "The menu has just been opened." );
});

 mmenu_API.bind( "close:start", function( $panel ) {
         $(".hamburger--emphatic").toggleClass('is-active')
      });
 $('#my-menu .button').click(function(){mmenu_API.close()})

 $(window).on("scroll", function() {
    if ($(window).scrollTop() > $(document).height()/4 * 0.6 && $(window).scrollTop() < $(document).height()/4 * 1.4){
        $('.about__content').show(700)
    }
    else
        $('.about__content').hide(700)
 })

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

    $('.button.show-review').click(function(){
        $(this).toggleClass('shown_all')
        if($(this).hasClass('shown_all')){
            $('.reviews__box').css({"overflow-y": "auto", "height": "66%" })
            $(this).css('top', '66%').html("Свернуть")
        }
        else {
            $('.reviews__box').css({"overflow-y": "hidden", "height": "50%" })
            $(this).css('top', '50%').html("Показать еще")
        }

        
    })
    
    function resize() {
         var $galery__item__img__height =  $('.galery__item a img').height() + 'px';
        // alert($galery__item__img__height)
        $('.a-after').css('height', $galery__item__img__height)
    }
    $(window).on('resize', function(){
        
       resize();
    })
});