// Функция для переключения языка
document.addEventListener('DOMContentLoaded', function() {
    console.log('Инициализация переключателя языка...');
    
    // Получаем сохраненный язык из localStorage или используем язык браузера
    let currentLanguage = localStorage.getItem('language');
    if (!currentLanguage) {
        const browserLang = navigator.language || navigator.userLanguage;
        currentLanguage = browserLang && browserLang.startsWith('ru') ? 'ru' : 'en';
        localStorage.setItem('language', currentLanguage);
    }
    
    console.log('Текущий язык:', currentLanguage);
    document.documentElement.lang = currentLanguage;
    
    // Находим переключатель языка и кнопки
    const languageSwitcher = document.querySelector('.language-switcher');
    if (!languageSwitcher) {
        console.error('Переключатель языка не найден!');
        return;
    }
    
    const enButton = languageSwitcher.querySelector('button[data-lang="en"]');
    const ruButton = languageSwitcher.querySelector('button[data-lang="ru"]');
    
    if (!enButton || !ruButton) {
        console.error('Кнопки языков не найдены!');
        return;
    }
    
    // Устанавливаем активную кнопку
    updateActiveButton();
    
    // Добавляем обработчики событий для кнопок
    enButton.addEventListener('click', function() {
        if (currentLanguage !== 'en') {
            switchLanguage('en');
        }
    });
    
    ruButton.addEventListener('click', function() {
        if (currentLanguage !== 'ru') {
            switchLanguage('ru');
        }
    });
    
    // Функция для переключения языка
    function switchLanguage(lang) {
        console.log(`Переключение языка на: ${lang}`);
        
        // Сохраняем выбранный язык
        currentLanguage = lang;
        localStorage.setItem('language', lang);
        document.documentElement.lang = lang;
        
        // Обновляем активную кнопку
        updateActiveButton();
        
        // Добавляем эффект глитча
        const activeButton = lang === 'en' ? enButton : ruButton;
        activeButton.classList.add('active-glitch');
        setTimeout(() => {
            activeButton.classList.remove('active-glitch');
        }, 500);
        
        // Обновляем контент
        updatePageContent();
    }
    
    // Функция для обновления активной кнопки
    function updateActiveButton() {
        if (currentLanguage === 'en') {
            enButton.classList.add('active');
            ruButton.classList.remove('active');
        } else {
            ruButton.classList.add('active');
            enButton.classList.remove('active');
        }
    }
    
    // Функция для обновления контента страницы
    function updatePageContent() {
        try {
            // Обновляем заголовок и мета-описание
            updateMetaElements();
            
            // Обновляем все элементы с атрибутом data-i18n
            updateTranslatedElements();
            
            console.log('Обновление контента завершено');
        } catch (error) {
            console.error('Ошибка при обновлении контента:', error);
        }
    }
    
    // Функция для обновления мета-элементов
    function updateMetaElements() {
        const titleElement = document.querySelector('title');
        if (titleElement && titleElement.hasAttribute('data-i18n')) {
            const key = titleElement.getAttribute('data-i18n');
            if (translations[currentLanguage] && translations[currentLanguage][key]) {
                titleElement.textContent = translations[currentLanguage][key];
            }
        }
        
        const descriptionElement = document.querySelector('meta[name="description"]');
        if (descriptionElement && descriptionElement.hasAttribute('data-i18n')) {
            const key = descriptionElement.getAttribute('data-i18n');
            if (translations[currentLanguage] && translations[currentLanguage][key]) {
                descriptionElement.setAttribute('content', translations[currentLanguage][key]);
            }
        }
    }
    
    // Функция для обновления всех элементов с атрибутом data-i18n
    function updateTranslatedElements() {
        const elements = document.querySelectorAll('[data-i18n]');
        console.log(`Найдено ${elements.length} элементов с атрибутом data-i18n`);
        
        elements.forEach(element => {
            // Пропускаем мета-элементы
            if (element.tagName === 'TITLE' || (element.tagName === 'META' && element.getAttribute('name') === 'description')) {
                return;
            }
            
            const key = element.getAttribute('data-i18n');
            if (!key) return;
            
            if (translations[currentLanguage] && translations[currentLanguage][key]) {
                const translatedText = translations[currentLanguage][key];
                
                // Обновляем атрибут data-text для элементов с глитч-эффектом
                if (element.hasAttribute('data-text')) {
                    element.setAttribute('data-text', translatedText);
                }
                
                // Обновляем содержимое элемента
                if (element.hasAttribute('data-html-content')) {
                    element.innerHTML = translatedText;
                } else {
                    element.textContent = translatedText;
                }
                
                // Добавляем класс для анимации
                element.classList.add('temp-glitch');
                setTimeout(() => {
                    element.classList.remove('temp-glitch');
                }, 300);
            }
        });
    }
    
    // Инициализируем контент при загрузке страницы
    updatePageContent();
}); 