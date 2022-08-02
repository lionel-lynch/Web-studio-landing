;(function() {

    window.addEventListener('load', function() {
        const apiDomain = 'https://jsonplaceholder.typicode.com'; // домен для запросов (используем фейковый домен для демонстрации)

        // поля формы с данными
        let nameInp = document.querySelector('.feedback-form__input--name');
        let emailInp = document.querySelector('.feedback-form__input--email');
        let phoneInp = document.querySelector('.feedback-form__input--phone');
        let msgInp = document.querySelector('.feedback-form__input--proj');

        let emailErrTxt = document.querySelector('.feedback-form__error--email'); // блок с текстом, уведомляющим об ошибочном вводе email
        let phoneErrTxt = document.querySelector('.feedback-form__error--phone'); // блок с текстом, уведомляющим об отсутствии ввода телефона

        let submitBtn = document.querySelector('.feedback-form__submit-btn');  // кнопка отправки и ее данные
        let submitBtnPreloader = document.querySelector('.submit-btn-loader'); // прелоадер для кнопки
        let submitBtnTxt = submitBtn.querySelector('.submit-btn-txt');         // текст в кнопке отправляющей форму

        // классы, которые будем переключать у элементов
        let modalHideClass = 'info-modal--hidden';
        let preloaderHiddenClass = 'submit-btn-loader--hidden';
        let infoModal; // сюда получаем модалку для вывода инфы о результате отправки

        // валидация полей: селекта и поля для ввода телефона
        function checkErrState() {
            let errState = false;
            const emailReg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

            // если в поле с телефоном ничего ввели не полный телефон (ввести можно только цифры, стоит маска)
            if (phoneInp.value.length < 18) {
                phoneErrTxt.style.display = 'block';
                errState = true;
            } else {
                phoneErrTxt.style.display = 'none'; // в противном случае прячем подсказку об ошибке
            }

            // если email не ввели или он не подходит под паттерн
            if (emailInp.value.trim() === '' || !emailReg.test(emailInp.value.trim())) {
                emailErrTxt.style.display = 'block';
                errState = true;
            } else {
                emailErrTxt.style.display = 'none'; // в противном случае прячем подсказку об ошибке
            }

            return errState;
        }

        // сбрасывает введенные данные в форме
        function resetForm() {
            phoneInp.value = '';
            emailInp.value = '';
            nameInp.value = '';
            msgInp.value = '';
        }

        // выводит модалку, после того как модалка спрятана выполняет действие из параметра
        function showModal(text, action) {
            infoModal.classList.remove(modalHideClass);
            submitBtnPreloader.classList.add(preloaderHiddenClass); // убираем прелоадер с кнопки
            submitBtnTxt.style.display = ''; // возвращаем текст на кнопку (снимаем значение атрибута style, выставленное ранее)

            infoModal.textContent = text; // выводим текст в модалку

            setTimeout(() => {
                infoModal.classList.add(modalHideClass);
                action();
            }, 3000);
        }

        // валидация формы и ее отправка
        async function submit(evt) {
            evt.preventDefault();

            if (checkErrState()) {
                return;
            }

            // делаем кнопку некликабельной и ставим прелоадер
            submitBtn.setAttribute('disabled', 'disabled');
            submitBtnTxt.style.display = 'none';
            submitBtnPreloader.classList.remove(preloaderHiddenClass);

            // формируем объект с данными для отправки на сервер
            let dataToSend = new FormData();
            dataToSend.append('name', nameInp.value);
            dataToSend.append('phone', phoneInp.value);
            dataToSend.append('email', emailInp.value);
            dataToSend.append('message', msgInp.value);
            dataToSend.append('source', 'Разработка интернет-магазина');

            try {
                // отправляем данные - в данном случае для демонстрации делаем заглушку запроса
                // просто отправляем моковый пост на jsonplaceholder
                let response = await fetch(`${apiDomain}/posts`, {
                    method: 'POST',
                    body: JSON.stringify({
                        title: 'foo',
                        body: 'bar',
                        userId: 1,
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                });

                let json = await response.json();
                let resultMsg = ''; // текст сообщение о результате запроса

                if (json.title == 'foo') { // здесь по смыслу такая строка кода: "если запрос прошел успешно"
                    infoModal = document.querySelector('.success-modal');
                    resultMsg = 'Заявка отправлена';
                    resetForm();
                } else {
                    infoModal = document.querySelector('.error-modal');
                    resultMsg = 'Ошибка: данные не отправлены';
                }

                showModal(resultMsg, () => submitBtn.removeAttribute('disabled', 'disabled'));
            } catch (err) {
                console.log(err);
                infoModal = document.querySelector('.error-modal');
                showModal('Ошибка: данные не отправлены', () => submitBtn.removeAttribute('disabled', 'disabled'));
            }
        }

        // ----------------------
        submitBtn.addEventListener('click', (evt) => submit(evt));

    });

})()