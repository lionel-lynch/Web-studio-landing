;(function() { // данный модуль отвечает за управление бургер меню

    const burgerBtn = document.querySelector('.header__burger-btn');
    const burgerMenu = document.querySelector('.burger-menu');
    const burgerMenuClose = document.querySelector('.burger-menu__close');
    const burgerMenuDropdownItem = document.querySelector('.burger-menu__item--dropdown'); // элемент бургер меню, имющий подэлементы

    burgerBtn.addEventListener('click', (evt) => {
        evt.currentTarget.classList.toggle('burger-btn--active');
        burgerMenu.classList.toggle('burger-menu--hidden');
    });

    burgerMenuClose.addEventListener('click', () => {
        burgerMenu.classList.add('burger-menu--hidden');
        burgerBtn.classList.remove('burger-btn--active');
    });

    // по клику на элемент меню, имеющий подэлементы - показываем их
    burgerMenuDropdownItem.addEventListener('click', (evt) => {
        evt.currentTarget.classList.toggle('burger-menu__item--opened');
    });

})()