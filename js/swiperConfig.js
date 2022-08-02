;(function() {
    new Swiper('.swiper', {
        direction: 'horizontal',
      
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },

        slidesPerView: 'auto',

        watchSlidesProgress: true
      }
    );
})()