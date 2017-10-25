$(function() { // wait for document ready
    // init


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

      
});