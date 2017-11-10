  jQuery(document).ready(function(){ 



        jQuery("#gallery").unitegallery({
         tiles_type:"nested",
        tiles_nested_optimal_tile_width:300
        }); 

        $("body").css("opacity", "1");
        
        setTimeout(function() {
        document.querySelector('.button-up').style.display='block'
        }, 1000);
 
     $(".button-wrapper").on("click", "a", function(event) { //отменяем стандартную обработку нажатия по ссылке     
        event.preventDefault(); //забираем идентификатор бока с атрибута href    
        var id = $(this).attr('href'), //узнаем высоту от начала страницы до блока на который ссылается якорь
            top = $(id).offset().top;
           //анимируем переход на расстояние - top за 1500 мс
        $('body,html').animate({ scrollTop: top }, 1500);
    });
  
      }); 