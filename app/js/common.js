$(function() { // wait for document ready
    // init
    var controller = new ScrollMagic.Controller({
        globalSceneOptions: {
            triggerHook: 'onLeave'
        }
    });

    // get all slides
    var slides = document.querySelectorAll("section.panel");

    // create scene for every slide
    for (var i = 0; i < slides.length; i++) {
        new ScrollMagic.Scene({
                triggerElement: slides[i]
            })
            .setPin(slides[i])
            .addIndicators() // add indicators (requires plugin)
            .addTo(controller);
    }



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

            $('.galery').css('backgroundImage', 'url(img/' + $fotorama_id + '/1.jpg)')
            $('.galery__nav__items button').removeClass("studio wedding outdoors children pregnant")
            $('.galery__price').removeClass("studio wedding outdoors children pregnant")
            $('.galery__nav__items button').addClass($fotorama_id)
            $('.galery__price').addClass($fotorama_id)

        }


    })



});