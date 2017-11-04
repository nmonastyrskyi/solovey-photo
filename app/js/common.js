$(function() { // wait for document ready
    // init
     resize();
     
    $(".header__nav, .btn-wrapper").on("click", "a", function(event) { //отменяем стандартную обработку нажатия по ссылке     
        event.preventDefault(); //забираем идентификатор бока с атрибута href    
        var id = $(this).attr('href'), //узнаем высоту от начала страницы до блока на который ссылается якорь
            top = $(id).offset().top;
        // alert(id)
        // alert(top)
        // if(id=='#intro')
        //   top = 0;

        //анимируем переход на расстояние - top за 1500 мс
        $('body,html').animate({ scrollTop: top }, 1500);
    });




    $('.galery__nav__items').on('click', function() {
        $(this).siblings('li').removeClass('active');
        $(this).addClass('active')
        var $fotorama_id = $(this).attr('id')
        $('.fotorama').slideUp(1000)
        $('.fotorama.' + $fotorama_id).slideDown(1000).removeClass('hidden')
        if ($("#" + $fotorama_id).hasClass('active')) {

            $('.blur_img').css('backgroundImage', 'url(img/' + $fotorama_id + '/1.jpg)')
            $('.galery__nav__items button').removeClass("studio wedding outdoors children pregnant")
            $('.galery__price').removeClass("studio wedding outdoors children pregnant")
            $('.galery__nav__items button').addClass($fotorama_id)
            $('.galery__price').addClass($fotorama_id)

        }


    })

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