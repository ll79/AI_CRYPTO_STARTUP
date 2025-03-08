/**
 * Mobile specific functions for AI SINGULARITY website
 * This file contains all functionality that is specific to mobile devices
 */

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация всех мобильных функций
    if (window.innerWidth <= 768) {
        initSmoothScrolling();
        initMobileGlitchEffects();
        initMobileRoadmap();
        initScrollIndicator();
        initPhaseDetailToggle();
        initTimelinePhases();

        // Отслеживаем изменение размера окна
        window.addEventListener('resize', function() {
            if (window.innerWidth <= 768) {
                initSmoothScrolling();
                initMobileGlitchEffects();
                initMobileRoadmap();
                initScrollIndicator();
                initTimelinePhases();
            }
        });
    }
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