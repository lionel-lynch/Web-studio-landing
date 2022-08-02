;(function() {

    // логика по скроллингу страницы из главной навигации и из бургер меню
    window.addEventListener('load', () => {
        // элементы которые будут осуществлять скролл по странице
        const mainNavList = document.querySelector('.header__nav-list');
        const burgerNavList = document.querySelector('.burger-menu__list');
        const mainNavDropdownItem = document.querySelector('.header__nav-item--dropdown');
        const leaveRequestBtn = document.querySelector('.header-banner__request button');
        const specOfferBtn = document.querySelector('.spec-offer__order button');

        // секции к которым будем скроллить
        const ourSupport = document.querySelector('.our-support');
        const portfolio = document.querySelector('.portfolio');
        const specOffer = document.querySelector('.spec-offer');
        const feedback = document.querySelector('.feedback');

        // будем по значению атрибута, совпадающего с ключом в объекте получать нужную секцию для прокрутки
        const sections = {
            'our-support': ourSupport,
            'portfolio': portfolio,
            'spec-offer': specOffer,
            'feedback': feedback
        };

        // скроллит страницу до указанной в параметре секции
        const scrollPage = (section) => {
            scrollTo({
                behavior: 'smooth',
                top: window.pageYOffset + sections[section].getBoundingClientRect().top
            });
        };

        mainNavList.addEventListener('click', (evt) => {
            const dropdown = evt.target.closest('.header__nav-item--dropdown');

            if (dropdown) { // если кликнули по элементу, содержащему подэлементы - уходим
                return;
            }

            const navListItem = evt.target.closest('.header__nav-item .header-item');

            if (!navListItem) {
                return;
            }

            scrollPage(navListItem.getAttribute('data-section'));
        });

        burgerNavList.addEventListener('click', (evt) => {
            const navListItem = evt.target.closest('.burger-menu__item .item');

            if (!navListItem) {
                return;
            }

            scrollPage(navListItem.getAttribute('data-section'));
        });

        // по клику на элемент меню, имеющий подэлементы - показываем их
        mainNavDropdownItem.addEventListener('click', (evt) => {
            let item = evt.currentTarget;
            item.classList.toggle('header__nav-item--dropdown-open');
        });
        
        leaveRequestBtn.addEventListener('click', () => {
            scrollPage('feedback');
        });

        specOfferBtn.addEventListener('click', () => {
            scrollPage('feedback');
        });
    });

})()