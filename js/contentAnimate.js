;(function() {

    window.addEventListener('load', () => {

        // ---- анимация контента ----
        const contactFormArrow = document.querySelector('.feedback__arrow img');

        function animOnScroll(elem, className) {
            const animItemHeight = elem.offsetHeight;
            const animItemOffset = elem.getBoundingClientRect().top + window.pageYOffset;
            const animStart = 100;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;

            if (animItemHeight > window.innerHeight){
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }

            // если элемент попал во viewport
            if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)){
                elem.classList.add(className); // добавить ему класс с анимацией
            } else {
                elem.classList.remove(className); // в противном случае убрать класс с анимацией
            }
        }

        window.addEventListener('scroll', () => {
            animOnScroll(contactFormArrow, 'feedback__arrow--slide');
        });

        animOnScroll(contactFormArrow, 'feedback__arrow--slide');

    });
    
})()