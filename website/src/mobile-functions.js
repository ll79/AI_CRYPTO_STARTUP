/**
 * Mobile specific functions for AI SINGULARITY website
 * This file contains all functionality that is specific to mobile devices
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - initializing mobile functions');
    
    // Инициализация всех мобильных функций
    if (window.innerWidth <= 768) {
        // Исправляем таймлайн немедленно
        setTimeout(fixMobileTimeline, 100);
        
        // Остальные функции
        initSmoothScrolling();
        initMobileGlitchEffects();
        initMobileRoadmap();
        initScrollIndicator();
        initPhaseDetailToggle();
        initTimelinePhases();

        // Отслеживаем изменение размера окна
        window.addEventListener('resize', function() {
            if (window.innerWidth <= 768) {
                setTimeout(fixMobileTimeline, 100);
                initSmoothScrolling();
                initMobileGlitchEffects();
                initMobileRoadmap();
                initScrollIndicator();
                initTimelinePhases();
            }
        });
    }
    
    // Добавляем обработчик для задержки при загрузке страницы
    window.addEventListener('load', function() {
        console.log('Window loaded - fixing mobile timeline again');
        if (window.innerWidth <= 768) {
            setTimeout(fixMobileTimeline, 500);
        }
    });
});

// Функция для стильной прокрутки с паузами на блоках для мобильных устройств
function initSmoothScrolling() {
    // Проверяем, является ли устройство мобильным
    if (window.innerWidth <= 768) {
        const sections = document.querySelectorAll('.section');
        let isScrolling = false;
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', () => {
            if (!isScrolling) {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                // Проверяем, какая секция сейчас в видимости
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.offsetHeight;
                    
                    // Проверяем, входит ли секция в видимую область
                    if (scrollTop >= sectionTop - 100 && scrollTop < sectionTop + sectionHeight - 100) {
                        if (Math.abs(scrollTop - lastScrollTop) > 50) {
                            // Добавляем глитч-эффект при прокрутке
                            section.classList.add('temp-glitch');
                            
                            // Приостанавливаем прокрутку на короткое время, но не перемещаем страницу
                            isScrolling = true;
                            
                            // Не используем scrollTo, чтобы не перебрасывать пользователя
                            // Просто добавляем небольшую паузу и эффект
                            setTimeout(() => {
                                section.classList.remove('temp-glitch');
                                isScrolling = false;
                                lastScrollTop = scrollTop;
                            }, 800);
                        }
                    }
                });
            }
        });
    }
}

// Добавляем эффекты глитча при прокрутке для мобильных устройств
function initMobileGlitchEffects() {
    if (window.innerWidth <= 768) {
        const cards = document.querySelectorAll('.feature-card, .ecosystem-card, .timeline-content, .type-item');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Добавляем случайную задержку для каждого элемента
                    // Уменьшаем вероятность появления глитча для более тонкого эффекта
                    if (Math.random() > 0.6) { // Только 40% шанс появления глитча
                        setTimeout(() => {
                            entry.target.classList.add('temp-glitch');
                            setTimeout(() => {
                                entry.target.classList.remove('temp-glitch');
                            }, 300); // Уменьшаем длительность эффекта
                        }, Math.random() * 200);
                    }
                }
            });
        }, {
            threshold: 0.4, // Увеличиваем порог для более точного срабатывания
            rootMargin: '0px 0px -10% 0px'
        });
        
        cards.forEach(card => {
            observer.observe(card);
        });
    }
}

// Функция для правильного отображения и разворачивания блоков роадмапа на мобильных устройствах
function initMobileRoadmap() {
    if (window.innerWidth <= 768) {
        const roadmapCards = document.querySelectorAll('.roadmap-card');
        
        roadmapCards.forEach(card => {
            // Проверяем, есть ли уже индикатор разворачивания
            if (!card.querySelector('.expand-indicator')) {
                // Создаем индикатор разворачивания
                const expandIndicator = document.createElement('div');
                expandIndicator.className = 'expand-indicator';
                
                // Добавляем иконку "плюс"
                const plusIcon = document.createElement('span');
                plusIcon.innerHTML = '+';
                plusIcon.style.fontSize = '24px';
                plusIcon.style.fontWeight = 'bold';
                plusIcon.style.display = 'block';
                plusIcon.style.textAlign = 'center';
                plusIcon.style.lineHeight = '30px';
                
                expandIndicator.appendChild(plusIcon);
                card.appendChild(expandIndicator);
                
                // Добавляем обработчик событий для разворачивания/сворачивания
                card.addEventListener('click', function(e) {
                    // Если клик был по индикатору или по карточке (но не по ссылке внутри)
                    if (e.target.closest('.expand-indicator') || e.target === card || e.target.closest('.roadmap-card') === card) {
                        // Переключаем класс expanded
                        card.classList.toggle('expanded');
                        
                        // Обновляем иконку
                        if (card.classList.contains('expanded')) {
                            plusIcon.innerHTML = '−';
                        } else {
                            plusIcon.innerHTML = '+';
                        }
                        
                        // Добавляем глитч-эффект при разворачивании
                        card.classList.add('temp-glitch');
                        setTimeout(() => {
                            card.classList.remove('temp-glitch');
                        }, 500);
                        
                        // Отменяем всплытие события
                        e.stopPropagation();
                    }
                });
            }
        });
    }
}

// Функция для управления индикатором прокрутки
function initScrollIndicator() {
    if (window.innerWidth <= 768) {
        const scrollIndicator = document.querySelector('.mobile-scroll-indicator');
        if (scrollIndicator) {
            // Скрываем индикатор при прокрутке
            window.addEventListener('scroll', function() {
                if (window.scrollY > 100) {
                    scrollIndicator.classList.add('hidden');
                } else {
                    scrollIndicator.classList.remove('hidden');
                }
            });
            
            // Скрываем индикатор при клике на него
            scrollIndicator.addEventListener('click', function() {
                scrollIndicator.classList.add('hidden');
                // Плавно прокручиваем к следующей секции
                const firstSection = document.querySelector('.section');
                if (firstSection) {
                    window.scrollTo({
                        top: firstSection.offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        }
    }
}

// Добавляем функционал для раскрытия блоков фаз на мобильных устройствах
function initPhaseDetailToggle() {
    if (window.innerWidth <= 768) {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        timelineItems.forEach(item => {
            const content = item.querySelector('.timeline-content');
            const detail = item.querySelector('.timeline-detail');
            
            if (content && detail) {
                content.addEventListener('click', function(e) {
                    // Если клик был на ссылке внутри блока, не раскрываем блок
                    if (e.target.tagName === 'A') {
                        return;
                    }
                    
                    // Переключаем активное состояние для текущего элемента
                    item.classList.toggle('active-mobile');
                    
                    // Закрываем другие элементы
                    timelineItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active-mobile');
                        }
                    });
                    
                    // Скроллим к элементу, если он активирован
                    if (item.classList.contains('active-mobile')) {
                        setTimeout(() => {
                            item.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }, 300);
                    }
                });
            }
        });
    }
}

// Функция для обработки блоков таймлайна (фаз) на мобильных устройствах
function initTimelinePhases() {
    if (window.innerWidth <= 768) {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        timelineItems.forEach(item => {
            const content = item.querySelector('.timeline-content');
            const detail = item.querySelector('.timeline-detail');
            
            if (content && detail) {
                // Добавляем обработчик клика на блок фазы
                content.addEventListener('click', function(e) {
                    // Если клик не по ссылке
                    if (!e.target.closest('a')) {
                        // Закрываем все остальные блоки
                        timelineItems.forEach(otherItem => {
                            if (otherItem !== item && otherItem.classList.contains('active-mobile')) {
                                otherItem.classList.remove('active-mobile');
                            }
                        });
                        
                        // Переключаем активное состояние
                        item.classList.toggle('active-mobile');
                        
                        // Добавляем эффект глитча при переключении
                        content.classList.add('temp-glitch');
                        setTimeout(() => {
                            content.classList.remove('temp-glitch');
                        }, 300);
                        
                        // Если блок активирован, прокручиваем к нему
                        if (item.classList.contains('active-mobile')) {
                            setTimeout(() => {
                                const contentRect = content.getBoundingClientRect();
                                const offset = window.innerHeight * 0.15;
                                
                                window.scrollTo({
                                    top: window.pageYOffset + contentRect.top - offset,
                                    behavior: 'smooth'
                                });
                            }, 100);
                        }
                        
                        // Отменяем всплытие события
                        e.stopPropagation();
                    }
                });
                
                // Добавляем эффект при касании для мобильных
                content.addEventListener('touchstart', function() {
                    content.style.transform = 'scale(0.98)';
                    setTimeout(() => {
                        content.style.transform = 'none';
                    }, 300);
                }, { passive: true });
            }
        });
    }
}

// Фиксирование скролла на мобильных устройствах
function fixMobileScroll() {
    if (window.innerWidth <= 768) {
        const header = document.querySelector('header');
        const headerHeight = header ? header.offsetHeight : 0;
        
        // Обработка прокрутки с учетом фиксированного заголовка
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    
                    // Прокручиваем с учетом высоты заголовка
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Обновляем URL
                    history.pushState(null, null, targetId);
                }
            });
        });
    }
}

// Исправление таймлайна для мобильных устройств
function fixMobileTimeline() {
    if (window.innerWidth <= 768) {
        // Находим таймлайн
        const timeline = document.querySelector('.timeline');
        if (!timeline) return;
        
        // Убираем вертикальную линию
        timeline.style.cssText = `
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            position: relative;
            padding: 0;
            margin: 0 auto;
        `;
        
        // Добавляем стиль для скрытия вертикальной линии
        const timelineStyle = document.createElement('style');
        timelineStyle.innerHTML = `
            @media (max-width: 768px) {
                .timeline::before {
                    display: none !important;
                }
                .timeline-item {
                    width: 90% !important;
                    margin: 15px auto !important;
                    left: 0 !important;
                    right: 0 !important;
                }
            }
        `;
        document.head.appendChild(timelineStyle);
        
        // Обрабатываем элементы таймлайна
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach(item => {
            // Стилизуем элементы
            item.style.cssText = `
                width: 90%;
                margin: 15px auto;
                left: 0;
                right: 0;
                position: relative;
            `;
            
            // Находим контент элемента
            const content = item.querySelector('.timeline-content');
            if (!content) return;
            
            // Стилизуем контент
            content.style.cssText = `
                width: 100%;
                margin: 0 auto;
                left: 0;
                right: 0;
                text-align: left;
                cursor: pointer;
                position: relative;
                z-index: 2;
            `;
            
            // Создаем индикатор для раскрытия/сворачивания, если его еще нет
            let indicator = item.querySelector('.timeline-indicator');
            if (!indicator) {
                indicator = document.createElement('div');
                indicator.className = 'timeline-indicator';
                
                // Определяем текст в зависимости от языка
                const isRussian = document.documentElement.lang === 'ru';
                indicator.textContent = isRussian ? 'Подробнее' : 'Details';
                
                // Добавляем индикатор после контента
                content.appendChild(indicator);
            }
            
            // Находим детальное содержимое
            const detail = item.querySelector('.timeline-detail');
            if (!detail) return;
            
            // Стилизуем детальное содержимое
            detail.style.cssText = `
                max-height: 0;
                opacity: 0;
                overflow: hidden;
                transition: all 0.5s ease;
                visibility: hidden;
                position: relative;
                padding-bottom: 50px;
                width: 100%;
                box-sizing: border-box;
            `;
            
            // Находим содержимое деталей
            const detailContent = item.querySelector('.timeline-detail-content');
            if (detailContent) {
                detailContent.style.cssText = `
                    padding: 15px;
                    position: relative;
                    z-index: 1;
                    width: 100%;
                    box-sizing: border-box;
                `;
            }
            
            // Применяем специальные стили для русского языка
            if (document.documentElement.lang === 'ru') {
                if (detailContent) {
                    // Уменьшаем размер шрифта для русского текста
                    const headings = detailContent.querySelectorAll('h4');
                    headings.forEach(h => {
                        h.style.fontSize = '15px';
                        h.style.lineHeight = '1.3';
                    });
                    
                    const listItems = detailContent.querySelectorAll('li');
                    listItems.forEach(li => {
                        li.style.fontSize = '13px';
                        li.style.lineHeight = '1.3';
                        li.style.marginBottom = '6px';
                    });
                }
            }
            
            // Сбрасываем существующие обработчики перед добавлением нового
            const clonedContent = content.cloneNode(true);
            content.parentNode.replaceChild(clonedContent, content);
            const newContent = item.querySelector('.timeline-content');
            const newIndicator = newContent.querySelector('.timeline-indicator');
            
            // Обработчик клика для раскрытия/сворачивания
            newContent.addEventListener('click', function(event) {
                // Игнорируем клики по ссылкам и т.д.
                if (event.target.tagName === 'A' || event.target.closest('a')) {
                    return;
                }
                
                // Закрываем другие открытые элементы
                timelineItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active-mobile')) {
                        otherItem.classList.remove('active-mobile');
                        
                        // Обновляем индикатор
                        const otherIndicator = otherItem.querySelector('.timeline-indicator');
                        if (otherIndicator) {
                            const isRussian = document.documentElement.lang === 'ru';
                            otherIndicator.textContent = isRussian ? 'Подробнее' : 'Details';
                        }
                        
                        // Скрываем детали
                        const otherDetail = otherItem.querySelector('.timeline-detail');
                        if (otherDetail) {
                            otherDetail.style.maxHeight = '0';
                            otherDetail.style.opacity = '0';
                            otherDetail.style.padding = '0';
                            otherDetail.style.visibility = 'hidden';
                        }
                    }
                });
                
                // Переключаем состояние текущего элемента
                item.classList.toggle('active-mobile');
                
                // Обновляем индикатор
                if (newIndicator) {
                    const isRussian = document.documentElement.lang === 'ru';
                    newIndicator.textContent = item.classList.contains('active-mobile') ? 
                        (isRussian ? 'Свернуть' : 'Collapse') : 
                        (isRussian ? 'Подробнее' : 'Details');
                    
                    // Дополнительные стили для индикатора
                    if (item.classList.contains('active-mobile')) {
                        newIndicator.style.position = 'absolute';
                        newIndicator.style.bottom = '15px';
                        newIndicator.style.left = '0';
                        newIndicator.style.right = '0';
                        newIndicator.style.margin = '0 auto';
                        newIndicator.style.width = 'fit-content';
                        newIndicator.style.zIndex = '10';
                        newIndicator.style.color = 'rgba(255, 87, 34, 0.9)';
                        newIndicator.style.border = '1px solid rgba(255, 87, 34, 0.7)';
                        newIndicator.style.boxShadow = '0 0 10px rgba(255, 87, 34, 0.3)';
                    } else {
                        newIndicator.style.color = 'rgba(0, 217, 255, 0.9)';
                        newIndicator.style.border = '1px solid rgba(0, 217, 255, 0.7)';
                        newIndicator.style.boxShadow = '0 0 10px rgba(0, 217, 255, 0.3)';
                    }
                }
                
                // Показываем/скрываем детали
                if (item.classList.contains('active-mobile')) {
                    // Используем разные значения max-height в зависимости от языка
                    const isRussian = document.documentElement.lang === 'ru';
                    detail.style.maxHeight = isRussian ? '2500px' : '2000px';
                    detail.style.opacity = '1';
                    detail.style.padding = '20px 15px 60px 15px'; // Больше места для кнопки внизу
                    detail.style.visibility = 'visible';
                    
                    // Прокручиваем к элементу для лучшей видимости
                    setTimeout(() => {
                        const rect = item.getBoundingClientRect();
                        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                        
                        window.scrollTo({
                            top: scrollTop + rect.top - 100,
                            behavior: 'smooth'
                        });
                        
                        // Дополнительно улучшаем отображение содержимого деталей
                        enhanceDetailContent(item);
                    }, 100);
                } else {
                    detail.style.maxHeight = '0';
                    detail.style.opacity = '0';
                    detail.style.padding = '0';
                    detail.style.visibility = 'hidden';
                }
                
                // Предотвращаем всплытие события
                event.stopPropagation();
            });
        });
    }
}

// Улучшение отображения содержимого деталей
function enhanceDetailContent(item) {
    if (!item) return;
    
    const detailContent = item.querySelector('.timeline-detail-content');
    if (!detailContent) return;
    
    // Текущий язык
    const isRussian = document.documentElement.lang === 'ru';
    
    // Улучшаем стили для содержимого
    detailContent.style.opacity = '1';
    detailContent.style.visibility = 'visible';
    detailContent.style.display = 'block';
    detailContent.style.width = '100%';
    detailContent.style.boxSizing = 'border-box';
    
    // Улучшаем стили для заголовков
    const headings = detailContent.querySelectorAll('h4');
    headings.forEach(heading => {
        heading.style.color = '#00d9ff';
        heading.style.marginBottom = '10px';
        heading.style.fontSize = isRussian ? '15px' : '16px';
        heading.style.fontWeight = '600';
        heading.style.paddingTop = '10px';
        heading.style.lineHeight = isRussian ? '1.3' : '1.4';
    });
    
    // Улучшаем стили для списков
    const lists = detailContent.querySelectorAll('ul');
    lists.forEach(list => {
        list.style.paddingLeft = '20px';
        list.style.margin = '10px 0 20px 0';
        list.style.width = '100%';
        list.style.boxSizing = 'border-box';
        
        const items = list.querySelectorAll('li');
        items.forEach(li => {
            li.style.color = '#a0a0a0';
            li.style.marginBottom = isRussian ? '6px' : '8px';
            li.style.position = 'relative';
            li.style.paddingLeft = '15px';
            li.style.lineHeight = isRussian ? '1.3' : '1.4';
            li.style.fontSize = isRussian ? '13px' : '14px';
            li.style.width = '100%';
            li.style.boxSizing = 'border-box';
            li.style.textAlign = 'left';
            li.style.wordBreak = isRussian ? 'break-word' : 'normal';
            
            // Добавляем маркер перед элементом списка
            if (!li.querySelector('.list-marker')) {
                const marker = document.createElement('span');
                marker.className = 'list-marker';
                marker.style.position = 'absolute';
                marker.style.left = '0';
                marker.style.top = isRussian ? '2px' : '0';
                marker.style.color = '#00d9ff';
                marker.textContent = '•';
                li.insertBefore(marker, li.firstChild);
            }
        });
    });
    
    // Улучшаем отображение индикатора
    const indicator = item.querySelector('.timeline-indicator');
    if (indicator) {
        indicator.style.position = 'absolute';
        indicator.style.bottom = '15px';
        indicator.style.left = '0';
        indicator.style.right = '0';
        indicator.style.margin = '0 auto';
        indicator.style.width = 'fit-content';
        indicator.style.padding = '5px 15px';
        indicator.style.background = 'rgba(0, 0, 0, 0.8)';
        indicator.style.border = '1px solid rgba(255, 87, 34, 0.7)';
        indicator.style.borderRadius = '20px';
        indicator.style.fontSize = '14px';
        indicator.style.color = 'rgba(255, 87, 34, 0.9)';
        indicator.style.zIndex = '10';
        indicator.style.cursor = 'pointer';
        indicator.style.transition = 'all 0.3s ease';
        indicator.style.textAlign = 'center';
        indicator.style.boxShadow = '0 0 10px rgba(255, 87, 34, 0.3)';
        
        // Обновляем текст
        const isActive = item.classList.contains('active-mobile');
        indicator.textContent = isActive 
            ? (isRussian ? 'Свернуть' : 'Collapse') 
            : (isRussian ? 'Подробнее' : 'Details');
    }
    
    // Обеспечиваем достаточную высоту блока для русского языка
    const detail = item.querySelector('.timeline-detail');
    if (detail && isRussian) {
        detail.style.maxHeight = '2500px';
        detail.style.paddingBottom = '60px';
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    fixMobileScroll();
    fixMobileTimeline();
});

// Повторный вызов при полной загрузке страницы
window.addEventListener('load', function() {
    fixMobileScroll();
    fixMobileTimeline();
    
    // Дополнительно повторяем через небольшую задержку для лучшей совместимости
    setTimeout(fixMobileTimeline, 500);
});

// Вызываем при изменении размера окна
window.addEventListener('resize', function() {
    fixMobileScroll();
    fixMobileTimeline();
});

// Экспортируем функции для использования в других модулях
export { fixMobileScroll, fixMobileTimeline, enhanceDetailContent }; 