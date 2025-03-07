document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Logo animation
    const logoAnimation = document.getElementById('logo-animation');
    const logoText = document.querySelector('.logo-text');
    const aiText = document.querySelector('.ai-text');
    const singularityText = document.querySelector('.singularity-text');
    
    // Initial state
    aiText.style.opacity = '0';
    singularityText.style.opacity = '0';
    
    // Animation function
    function animateLogo() {
        const logoText = document.querySelector('.logo-text');
        const aiText = document.querySelector('.ai-text');
        const singularityText = document.querySelector('.singularity-text');
        const highlightedLetters = logoText.querySelectorAll('.highlight');
        
        // Reset any previous animations
        logoText.classList.remove('glitch-text');
        
        // Add glitch effect
        setTimeout(() => {
            logoText.classList.add('glitch-text');
            
            // Animate highlighted letters
            highlightedLetters.forEach((letter, index) => {
        setTimeout(() => {
                    letter.style.animation = 'logo-highlight-pulse 1.5s infinite';
                }, index * 200);
            });
            
            // Fade in AI and SINGULARITY text
        setTimeout(() => {
            aiText.style.opacity = '1';
                aiText.style.transform = 'translateY(0)';
        
        setTimeout(() => {
            singularityText.style.opacity = '1';
                    singularityText.style.transform = 'translateY(0)';
                }, 300);
            }, 600);
        }, 500);
    }
    
    // Run animation on page load
    animateLogo();
    
    // Language switcher functionality
    const languageSwitcher = document.querySelector('.language-switcher');
    if (languageSwitcher) {
        const languageButtons = languageSwitcher.querySelectorAll('button');
        
        // Set initial active state based on current language
        languageButtons.forEach(button => {
            if (button.getAttribute('data-lang') === currentLanguage) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
            
            // Add click event listener
            button.addEventListener('click', function() {
                const lang = this.getAttribute('data-lang');
                changeLanguage(lang);
                
                // Update active state
                languageButtons.forEach(btn => {
                    if (btn === this) {
                        btn.classList.add('active');
                    } else {
                        btn.classList.remove('active');
                    }
                });
            });
        });
    }
    
    // Initialize language on page load
    updateContent();

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Timeline animation on scroll
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    function checkTimelineInView() {
        timelineItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            const isInView = (
                rect.top >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
            );
            
            if (isInView) {
                item.classList.add('animate');
            }
        });
    }
    
    window.addEventListener('scroll', checkTimelineInView);
    checkTimelineInView(); // Check on page load

    // Feature cards animation on scroll
    const featureCards = document.querySelectorAll('.feature-card');
    
    function checkFeaturesInView() {
        featureCards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            const isInView = (
                rect.top >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
            );
            
            if (isInView) {
                setTimeout(() => {
                    card.classList.add('animate');
                }, index * 100); // Staggered animation
            }
        });
    }
    
    window.addEventListener('scroll', checkFeaturesInView);
    checkFeaturesInView(); // Check on page load

    // Ecosystem cards animation on scroll with improved effects
    const ecosystemCards = document.querySelectorAll('.ecosystem-card');
    
    function checkEcosystemInView() {
        ecosystemCards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            const isInView = (
                rect.top >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) * 1.2
            );
            
            if (isInView) {
                setTimeout(() => {
                    card.classList.add('animate');
                    // Add entrance animation with faster and more intense glitch effect
                    card.style.animation = `card-entrance 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${index * 0.1}s forwards, subtle-glitch 4s infinite steps(1)`;
                }, index * 150); // Increased staggered delay
            }
        });
    }
    
    window.addEventListener('scroll', checkEcosystemInView);
    checkEcosystemInView(); // Check on page load

    // Add hover effect for ecosystem cards
    ecosystemCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add subtle glitch effect on hover
            this.style.animation = 'card-hover-glitch 0.3s steps(1) infinite';
            
            // Dim sibling cards very subtly
            ecosystemCards.forEach(sibling => {
                if (sibling !== this) {
                    sibling.style.filter = 'brightness(0.9) contrast(0.98)';
                    sibling.style.transform = 'scale(0.99)';
                    sibling.style.transition = 'all 1.8s cubic-bezier(0.22, 1, 0.36, 1)';
                }
            });
        });
        
        card.addEventListener('mouseleave', function() {
            // Restore normal animation with subtle glitch
            this.style.animation = 'subtle-glitch 5s infinite steps(1)';
            
            // Restore sibling cards
            ecosystemCards.forEach(sibling => {
                if (sibling !== this) {
                    sibling.style.filter = '';
                    sibling.style.transform = '';
                }
            });
        });
    });

    // NFT distribution chart animation
    const chartSegments = document.querySelectorAll('.chart-segment');
    
    function animateChart() {
        chartSegments.forEach(segment => {
            const percentage = segment.getAttribute('data-percentage');
            segment.style.transition = 'all 1.5s ease';
            segment.style.opacity = '1';
        });
    }
    
    // Intersection Observer for NFT section
    const nftSection = document.getElementById('nft');
    if (nftSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateChart();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(nftSection);
    }

    // Mobile navigation toggle
    const mobileNavToggle = document.createElement('div');
    mobileNavToggle.className = 'mobile-nav-toggle';
    mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('nav').appendChild(mobileNavToggle);
    
    mobileNavToggle.addEventListener('click', function() {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.toggle('active');
        
        if (navLinks.classList.contains('active')) {
            this.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            this.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });

    // Add CSS for mobile navigation
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .mobile-nav-toggle {
                display: block;
                font-size: 1.5rem;
                cursor: pointer;
                z-index: 1001;
            }
            
            .nav-links {
                position: fixed;
                top: 0;
                right: -100%;
                width: 70%;
                height: 100vh;
                background: var(--darker-bg);
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                transition: right 0.3s ease;
                z-index: 1000;
            }
            
            .nav-links.active {
                right: 0;
            }
            
            .nav-links li {
                margin: 20px 0;
            }
        }
        
        @media (min-width: 769px) {
            .mobile-nav-toggle {
                display: none;
            }
        }
        
        .timeline-item, .feature-card, .ecosystem-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .timeline-item.animate, .feature-card.animate, .ecosystem-card.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .chart-segment {
            opacity: 0;
        }
    `;
    document.head.appendChild(style);

    // Add CSS for the new effects
    const additionalStyles = document.createElement('style');
    additionalStyles.textContent = `
        @keyframes card-entrance {
            0% {
                opacity: 0;
                transform: translateY(30px);
                filter: brightness(0.8) blur(3px);
            }
            70% {
                opacity: 0.8;
                transform: translateY(5px);
                filter: brightness(1.1) blur(0);
            }
            85% {
                transform: translateY(-2px);
                filter: brightness(1.2);
            }
            100% {
                opacity: 1;
                transform: translateY(0);
                filter: brightness(1);
            }
        }
        
        @keyframes card-hover-glitch {
            0%, 100% {
                transform: translateY(-5px) scale(1.03);
                filter: brightness(1.2) contrast(1.1);
                box-shadow: 0 0 30px rgba(110, 0, 255, 0.6), 0 0 50px rgba(0, 217, 255, 0.4);
            }
            33% {
                transform: translateY(-6px) scale(1.03) translate(1px, -1px);
                filter: brightness(1.25) contrast(1.15) hue-rotate(5deg);
            }
            66% {
                transform: translateY(-4px) scale(1.03) translate(-1px, 1px);
                filter: brightness(1.15) contrast(1.05) hue-rotate(-5deg);
            }
        }
        
        .random-glitch {
            position: relative;
            animation: random-glitch-anim 0.2s steps(1) forwards !important;
        }
        
        @keyframes random-glitch-anim {
            0%, 100% {
                transform: translate(0);
                filter: brightness(1);
            }
            20% {
                transform: translate(-3px, 2px);
                filter: brightness(1.3) hue-rotate(10deg);
            }
            40% {
                transform: translate(3px, -2px);
                filter: brightness(0.9) hue-rotate(-10deg);
            }
            60% {
                transform: translate(-2px, -2px);
                filter: brightness(1.2) hue-rotate(5deg);
            }
            80% {
                transform: translate(2px, 2px);
                filter: brightness(0.8) hue-rotate(-5deg);
            }
        }
        
        .random-glitch::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(
                transparent 0%,
                rgba(0, 217, 255, 0.2) 50%,
                transparent 100%
            );
            z-index: 2;
            opacity: 0.7;
            pointer-events: none;
        }
    `;
    document.head.appendChild(additionalStyles);

    // Initialize all animations
    initAnimations();
    
    // Add random digital glitches to cards
    initRandomGlitches();

    // Add random glitches to cards
    function addRandomGlitches() {
        const cards = document.querySelectorAll('.cyberpunk-card');
        cards.forEach(card => {
            // Random very subtle glitch effect
            setInterval(() => {
                if (Math.random() > 0.97) { // 3% chance of glitch
                    card.classList.add('random-glitch');
                    setTimeout(() => {
                        card.classList.remove('random-glitch');
                    }, 30 + Math.random() * 70); // Random duration between 30-100ms
                }
            }, 4000 + Math.random() * 6000); // Random interval between 4-10 seconds
        });
        
        // Add scanline flicker effect
        const scanline = document.querySelector('.scanline');
        if (scanline) {
            setInterval(() => {
                if (Math.random() > 0.85) { // 15% chance of flicker
                    scanline.style.opacity = (Math.random() * 0.2) + 0.05;
                    setTimeout(() => {
                        scanline.style.opacity = 0.15;
                    }, 30 + Math.random() * 70); // Random duration between 30-100ms
                }
            }, 3000 + Math.random() * 4000); // Random interval between 3-7 seconds
        }
        
        // Add random glitch overlay flicker
        const glitchOverlay = document.querySelector('.glitch-overlay');
        if (glitchOverlay) {
            setInterval(() => {
                if (Math.random() > 0.9) { // 10% chance of flicker
                    glitchOverlay.style.opacity = (Math.random() * 0.1) + 0.03;
                    setTimeout(() => {
                        glitchOverlay.style.opacity = 0.07;
                    }, 30 + Math.random() * 70); // Random duration between 30-100ms
                }
            }, 4000 + Math.random() * 5000); // Random interval between 4-9 seconds
        }
    }

    // Call the function to add random glitches
    setTimeout(addRandomGlitches, 2000); // Delay to ensure all elements are loaded

    // Initialize visualization
    initVisualization();

    // Функция для инициализации мобильного меню
    initMobileMenu();
    initReadMoreButtons();
    addLogoGlitchEffect();
    
    // Обновляем текст кнопок "Читать далее" при смене языка
    document.querySelectorAll('.language-switcher button').forEach(btn => {
        btn.addEventListener('click', function() {
            setTimeout(() => {
                document.querySelectorAll('.read-more-btn').forEach(btn => {
                    const isExpanded = btn.previousElementSibling.classList.contains('expanded');
                    btn.textContent = isExpanded 
                        ? (document.documentElement.lang === 'ru' ? 'Свернуть' : 'Show less') 
                        : (document.documentElement.lang === 'ru' ? 'Читать далее' : 'Read more');
                });
            }, 300);
        });
    });

    // Добавляем функционал для раскрытия блоков фаз
    initPhaseDetailToggle();

    // Добавляем функционал раскрытия блоков фаз дорожной карты
    const roadmapCards = document.querySelectorAll('.roadmap-card');
    
    roadmapCards.forEach(card => {
        // Добавляем обработчик клика для каждой карточки
        card.addEventListener('click', function() {
            const isExpanded = this.classList.contains('expanded');
            
            // Сначала сворачиваем все карточки
            roadmapCards.forEach(otherCard => {
                otherCard.classList.remove('expanded');
            });
            
            // Разворачиваем только выбранную карточку (если она не была развернута)
            if (!isExpanded) {
                this.classList.add('expanded');
            }
        });
        
        // Добавляем индикатор развертывания
        const expandIndicator = document.createElement('div');
        expandIndicator.className = 'expand-indicator';
        expandIndicator.innerHTML = '<span>+</span>';
        card.appendChild(expandIndicator);
    });
});

// Random digital glitches
function initRandomGlitches() {
    const cards = document.querySelectorAll('.cyberpunk-card');
    
    cards.forEach(card => {
        // Random glitch effect
        setInterval(() => {
            if (Math.random() > 0.95) { // 5% chance of glitch
                card.classList.add('random-glitch');
                setTimeout(() => {
                    card.classList.remove('random-glitch');
                }, 100 + Math.random() * 150); // Random duration between 100-250ms
            }
        }, 2000 + Math.random() * 3000); // Random interval between 2-5 seconds
    });
    
    // Add scanline flicker effect
    const scanline = document.querySelector('.scanline');
    if (scanline) {
        setInterval(() => {
            if (Math.random() > 0.7) { // 30% chance of flicker
                scanline.style.opacity = (Math.random() * 0.5) + 0.1;
                setTimeout(() => {
                    scanline.style.opacity = 0.3;
                }, 50 + Math.random() * 100); // Random duration between 50-150ms
            }
        }, 1000 + Math.random() * 2000); // Random interval between 1-3 seconds
    }
    
    // Add random glitch overlay flicker
    const glitchOverlay = document.querySelector('.glitch-overlay');
    if (glitchOverlay) {
        setInterval(() => {
            if (Math.random() > 0.8) { // 20% chance of flicker
                glitchOverlay.style.opacity = (Math.random() * 0.3) + 0.1;
                setTimeout(() => {
                    glitchOverlay.style.opacity = 0.15;
                }, 50 + Math.random() * 100); // Random duration between 50-150ms
            }
        }, 2000 + Math.random() * 3000); // Random interval between 2-5 seconds
    }
}

// Initialize all animations
function initAnimations() {
    // Check if elements are in view when page loads
    checkTimelineInView();
    checkFeaturesInView();
    checkEcosystemInView();
    animateChart();
    
    // Add scroll event listener for animations
    window.addEventListener('scroll', function() {
        checkTimelineInView();
        checkFeaturesInView();
        checkEcosystemInView();
    });
}

// Timeline animation with enhanced details
function checkTimelineInView() {
    const timeline = document.querySelector('.timeline');
    if (!timeline) return;
    
    const timelinePosition = timeline.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.2;
    
    if (timelinePosition < screenPosition) {
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('animate');
                
                // Add hover event listeners for timeline items
                item.addEventListener('mouseenter', () => {
                    // Add glitch effect to the dot
                    const dot = item.querySelector('.timeline-dot');
                    if (dot) {
                        dot.classList.add('pulse');
                    }
                    
                    // Add glitch effect to the content
                    const content = item.querySelector('.timeline-content');
                    if (content) {
                        content.classList.add('active');
                    }
                    
                    // Show the detail panel
                    const detail = item.querySelector('.timeline-detail');
                    if (detail) {
                        detail.classList.add('active');
                    }
                });
                
                item.addEventListener('mouseleave', () => {
                    // Remove glitch effect from the dot
                    const dot = item.querySelector('.timeline-dot');
                    if (dot) {
                        dot.classList.remove('pulse');
                    }
                    
                    // Remove glitch effect from the content
                    const content = item.querySelector('.timeline-content');
                    if (content) {
                        content.classList.remove('active');
                    }
                    
                    // Hide the detail panel
                    const detail = item.querySelector('.timeline-detail');
                    if (detail) {
                        detail.classList.remove('active');
                    }
                });
            }, 300 * index);
        });
    }
}

// Smoother card animations
function initCardAnimations() {
    // Add smooth hover effects for ecosystem cards
    const ecosystemCards = document.querySelectorAll('.ecosystem-card');
    ecosystemCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Dim sibling cards
            ecosystemCards.forEach(sibling => {
                if (sibling !== card) {
                    sibling.classList.add('dimmed');
                }
            });
        });
        
        card.addEventListener('mouseleave', () => {
            // Restore sibling cards
            ecosystemCards.forEach(sibling => {
                sibling.classList.remove('dimmed');
            });
        });
    });
    
    // Add smooth hover effects for timeline cards
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        const content = item.querySelector('.timeline-content');
        const detail = item.querySelector('.timeline-detail');
        
        if (content && detail) {
            // Add click event for mobile devices
            content.addEventListener('click', (e) => {
                // Toggle active state
                if (window.innerWidth < 768) {
                    e.preventDefault();
                    item.classList.toggle('active-mobile');
                    
                    // Close other items
                    timelineItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active-mobile');
                        }
                    });
                }
            });
        });
    });
}

// Features animation
function checkFeaturesInView() {
    const features = document.querySelector('.features-grid');
    if (!features) return;
    
    const featuresPosition = features.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.2;
    
    if (featuresPosition < screenPosition) {
        const featureCards = document.querySelectorAll('.feature-card');
        featureCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animate');
            }, 200 * index);
        });
    }
}

// Ecosystem cards animation
function checkEcosystemInView() {
    const ecosystem = document.querySelector('.ecosystem-grid');
    if (!ecosystem) return;
    
    const ecosystemPosition = ecosystem.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.2;
    
    if (ecosystemPosition < screenPosition) {
        const ecosystemCards = document.querySelectorAll('.ecosystem-card');
        ecosystemCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animate');
                
                // Add entrance animation with faster and more intense glitch effect
                card.style.animation = `card-entrance 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${index * 0.1}s forwards, subtle-glitch 4s infinite steps(1)`;
            }, 150 * index);
        });
        
        // Add hover effects for ecosystem cards
        ecosystemCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                // Add subtle glitch effect on hover
                this.style.animation = 'card-hover-glitch 0.3s steps(1) infinite';
                
                // Dim sibling cards very subtly
                ecosystemCards.forEach(sibling => {
                    if (sibling !== this) {
                        sibling.style.filter = 'brightness(0.9) contrast(0.98)';
                        sibling.style.transform = 'scale(0.99)';
                        sibling.style.transition = 'all 1.8s cubic-bezier(0.22, 1, 0.36, 1)';
                    }
                });
            });
            
            card.addEventListener('mouseleave', function() {
                // Restore normal animation with subtle glitch
                this.style.animation = 'subtle-glitch 5s infinite steps(1)';
                
                // Restore sibling cards
                ecosystemCards.forEach(sibling => {
                    if (sibling !== this) {
                        sibling.style.filter = '';
                        sibling.style.transform = '';
                    }
                });
            });
        });
    }
}

// Chart animation
function animateChart() {
    const chart = document.querySelector('.distribution-chart');
    if (!chart) return;
    
    const chartPosition = chart.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.2;
    
    if (chartPosition < screenPosition) {
        chart.classList.add('animate');
    }
}

// Mobile navigation toggle
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', function() {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.toggle('active');
        this.classList.toggle('active');
    });
}

// Add CSS for new animations
const cyberpunkStyles = document.createElement('style');
cyberpunkStyles.textContent = `
    @keyframes random-glitch-anim {
        0%, 100% {
            transform: translate(0);
            filter: brightness(1);
        }
        20% {
            transform: translate(-3px, 2px);
            filter: brightness(1.3) hue-rotate(10deg);
        }
        40% {
            transform: translate(3px, -2px);
            filter: brightness(0.9) hue-rotate(-10deg);
        }
        60% {
            transform: translate(-2px, -2px);
            filter: brightness(1.2) hue-rotate(5deg);
        }
        80% {
            transform: translate(2px, 2px);
            filter: brightness(0.8) hue-rotate(-5deg);
        }
    }
    
    .random-glitch {
        position: relative;
        animation: random-glitch-anim 0.2s steps(1) forwards !important;
    }
    
    .random-glitch::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            transparent 0%,
            rgba(0, 217, 255, 0.2) 50%,
            transparent 100%
        );
        z-index: 2;
        opacity: 0.7;
        pointer-events: none;
    }
`;
document.head.appendChild(cyberpunkStyles);

// Add CSS for card animations
const cardAnimationStyles = document.createElement('style');
cardAnimationStyles.textContent = `
    @keyframes card-entrance {
        0% {
            opacity: 0;
            transform: translateY(30px);
            filter: brightness(0.8) blur(3px);
        }
        70% {
            opacity: 0.8;
            transform: translateY(5px);
            filter: brightness(1.1) blur(0);
        }
        85% {
            transform: translateY(-2px);
            filter: brightness(1.2);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
            filter: brightness(1);
        }
    }
    
    @keyframes card-hover-glitch {
        0%, 100% {
            transform: translateY(-5px) scale(1.03);
            filter: brightness(1.2) contrast(1.1);
            box-shadow: 0 0 30px rgba(110, 0, 255, 0.6), 0 0 50px rgba(0, 217, 255, 0.4);
        }
        33% {
            transform: translateY(-6px) scale(1.03) translate(1px, -1px);
            filter: brightness(1.25) contrast(1.15) hue-rotate(5deg);
        }
        66% {
            transform: translateY(-4px) scale(1.03) translate(-1px, 1px);
            filter: brightness(1.15) contrast(1.05) hue-rotate(-5deg);
        }
    }
`;
document.head.appendChild(cardAnimationStyles);

// Initialize visualization
function initVisualization() {
    // Check if visualization exists
    const visualization = document.querySelector('.cyberpunk-visualization');
    if (!visualization) return;
    
    // Add random particles
    const particles = document.querySelector('.visualization-particles');
    if (particles) {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.animationDuration = `${3 + Math.random() * 5}s`;
            particle.style.animationDelay = `${Math.random() * 2}s`;
            particles.appendChild(particle);
        }
    }
    
    // Add hover effects to action buttons
    const actionButtons = document.querySelectorAll('.visualization-btn');
    actionButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            // Add glitch effect on hover
            button.classList.add('random-glitch');
            
            // Remove the class after animation completes
            setTimeout(() => {
                button.classList.remove('random-glitch');
            }, 300);
        });
    });
    
    // Add staggered entrance animation for buttons
    const actionButtonsContainer = document.querySelector('.visualization-action-buttons');
    if (actionButtonsContainer) {
        const buttons = actionButtonsContainer.querySelectorAll('.visualization-btn');
        buttons.forEach((button, index) => {
            button.style.opacity = '0';
            button.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                button.style.transition = 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)';
                button.style.opacity = '1';
                button.style.transform = 'translateY(0)';
            }, 500 + (index * 150));
        });
    }
}

// Функция для инициализации мобильного меню
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li a');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Закрытие меню при клике на ссылку
        navLinksItems.forEach(link => {
            link.addEventListener('click', function() {
                setTimeout(() => {
                    navLinks.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }, 300); // Небольшая задержка для анимации
            });
        });
        
        // Закрытие меню при клике вне меню
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.nav-links') && !event.target.closest('.mobile-menu-toggle')) {
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }
}

// Функция для добавления функционала "Читать далее" в блоках "О проекте"
function initReadMoreButtons() {
    // Добавляем класс и кнопку "Читать далее" к описанию о проекте
    const aboutDescription = document.querySelector('.about-description');
    if (aboutDescription) {
        const readMoreBtn = document.createElement('span');
        readMoreBtn.className = 'read-more-btn';
        readMoreBtn.textContent = document.documentElement.lang === 'ru' ? 'Читать далее' : 'Read more';
        
        aboutDescription.parentNode.insertBefore(readMoreBtn, aboutDescription.nextSibling);
        
        readMoreBtn.addEventListener('click', function() {
            aboutDescription.classList.toggle('expanded');
            this.textContent = aboutDescription.classList.contains('expanded') 
                ? (document.documentElement.lang === 'ru' ? 'Свернуть' : 'Show less') 
                : (document.documentElement.lang === 'ru' ? 'Читать далее' : 'Read more');
        });
    }
    
    // Добавляем такой же функционал к другим информационным блокам
    const infoBlocks = document.querySelectorAll('.timeline-content, .ecosystem-card');
    infoBlocks.forEach(block => {
        const description = block.querySelector('p');
        if (description && description.textContent.length > 100) {
            description.classList.add('about-description');
            
            const readMoreBtn = document.createElement('span');
            readMoreBtn.className = 'read-more-btn';
            readMoreBtn.textContent = document.documentElement.lang === 'ru' ? 'Подробнее' : 'More details';
            
            description.parentNode.insertBefore(readMoreBtn, description.nextSibling);
            
            readMoreBtn.addEventListener('click', function() {
                description.classList.toggle('expanded');
                this.textContent = description.classList.contains('expanded') 
                    ? (document.documentElement.lang === 'ru' ? 'Свернуть' : 'Show less') 
                    : (document.documentElement.lang === 'ru' ? 'Подробнее' : 'More details');
            });
        }
    });
}

// Добавляем глитч-эффект для логотипа
function addLogoGlitchEffect() {
    const logoText = document.querySelector('.logo-text');
    if (logoText) {
        setInterval(() => {
            if (Math.random() > 0.95) { // 5% шанс глитча
                logoText.classList.add('active-glitch');
                setTimeout(() => {
                    logoText.classList.remove('active-glitch');
                }, 500);
            }
        }, 3000);
    }
}

// Улучшенный эффект переключения языка
function updateGlitchEffects() {
    // Обновление атрибутов data-text для элементов с глитч-эффектами при наведении
    document.querySelectorAll('.glitch-hover').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (key && translations[currentLanguage][key]) {
            element.setAttribute('data-text', translations[currentLanguage][key]);
        }
    });
    
    // Обновление атрибутов data-text для элементов с глитч-текстом
    document.querySelectorAll('.glitch-text').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (key && translations[currentLanguage][key]) {
            element.setAttribute('data-text', translations[currentLanguage][key]);
        }
    });

    // Добавляем временный класс glitch к элементам для анимации смены языка
    const glitchElements = document.querySelectorAll('.section-title, h3, .feature-card, .ecosystem-card, .btn');
    
    glitchElements.forEach(element => {
        // Удаляем класс active-glitch, если он уже был
        element.classList.remove('active-glitch');
        
        // Добавляем временно атрибут data-text с текущим содержимым (для глитч-эффекта)
        if (!element.hasAttribute('data-text') && element.innerText) {
            element.setAttribute('data-text', element.innerText);
        }
        
        // Применяем glitch-эффект с задержкой для каждого элемента
        setTimeout(() => {
            element.classList.add('active-glitch');
            
            // Удаляем класс через некоторое время
            setTimeout(() => {
                element.classList.remove('active-glitch');
            }, 800);
        }, Math.random() * 300); // Случайная задержка для каждого элемента
    });
    
    // Добавление сканлайна при смене языка
    const scanline = document.createElement('div');
    scanline.classList.add('scanline');
    scanline.style.opacity = '0.8';
    document.body.appendChild(scanline);
    
    // Удаляем дополнительную сканлайн через некоторое время
    setTimeout(() => {
        if (document.body.contains(scanline)) {
            document.body.removeChild(scanline);
        }
    }, 1000);
    
    // Добавление случайных глитч-эффектов на странице
    for (let i = 0; i < 5; i++) {
        const glitch = document.createElement('div');
        glitch.classList.add('random-glitch');
        glitch.style.top = `${Math.random() * 100}%`;
        glitch.style.left = `${Math.random() * 100}%`;
        glitch.style.width = `${50 + Math.random() * 150}px`;
        glitch.style.height = `${3 + Math.random() * 15}px`;
        document.body.appendChild(glitch);
        
        // Удаляем случайные глитчи через некоторое время
        setTimeout(() => {
            if (document.body.contains(glitch)) {
                document.body.removeChild(glitch);
            }
        }, 800 + Math.random() * 1000);
    }
}

// Расширяем функцию changeLanguage для обновления глитч-эффектов
const originalChangeLanguage = changeLanguage;
changeLanguage = function(lang) {
    originalChangeLanguage(lang);
    updateGlitchEffects();
};

// Обработчик переключения языка
document.addEventListener('DOMContentLoaded', function() {
    const languageSwitcher = document.querySelector('.language-switcher');
    if (languageSwitcher) {
        languageSwitcher.addEventListener('click', function(event) {
            if (event.target.tagName === 'BUTTON') {
                const lang = event.target.getAttribute('data-lang');
                if (lang && lang !== currentLanguage) {
                    changeLanguage(lang);
                    // Добавляем улучшенный эффект переключения
                    updateGlitchEffects();
                }
            }
        });
    }
});

// Update glitch effects on initial load
updateGlitchEffects();

// Function to update content based on selected language
function updateContent() {
    document.documentElement.lang = currentLanguage;
    
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        
        if (key && translations[currentLanguage] && translations[currentLanguage][key]) {
            // Check if this is an HTML element that should preserve its inner HTML structure
            if (element.hasAttribute('data-html-content')) {
                element.innerHTML = translations[currentLanguage][key];
            } else {
                // For normal text content
                element.textContent = translations[currentLanguage][key];
            }
        } else if (key && key.includes('.')) {
            // Handle nested keys like "feature.title"
            const keys = key.split('.');
            let value = translations[currentLanguage];
            
            for (let i = 0; i < keys.length; i++) {
                if (value && value[keys[i]]) {
                    value = value[keys[i]];
                } else {
                    value = null;
                    break;
                }
            }
            
            if (value) {
                if (element.hasAttribute('data-html-content')) {
                    element.innerHTML = value;
                } else {
                    element.textContent = value;
                }
            }
        }
    });
    
    // Специальная обработка для проблемных разделов
    if (currentLanguage === 'en') {
        // Проектные детали
        document.querySelectorAll('[data-i18n="project_details_title"]').forEach(el => {
            el.textContent = 'Project Details';
        });
        document.querySelectorAll('[data-i18n="project_structure_title"]').forEach(el => {
            el.textContent = 'Repository Structure';
        });
        document.querySelectorAll('[data-i18n="project_vision_title"]').forEach(el => {
            el.textContent = 'Future Vision';
        });
        document.querySelectorAll('[data-i18n="project_vision_desc"]').forEach(el => {
            el.textContent = 'Our ambitious goal is to create a fully autonomous, self-improving AI ecosystem on TON blockchain that generates value for all participants.';
        });
        
        // Финансовые перспективы
        document.querySelectorAll('[data-i18n="financial_title"]').forEach(el => {
            el.textContent = 'Financial Prospects';
        });
        document.querySelectorAll('[data-i18n="financial_subtitle"]').forEach(el => {
            el.textContent = 'Ecosystem Monetization';
        });
        document.querySelectorAll('[data-i18n="financial_desc"]').forEach(el => {
            el.textContent = 'The project implements multiple revenue streams to ensure sustainable development and value for all participants.';
        });
        document.querySelectorAll('[data-i18n="revenue_stream1_title"]').forEach(el => {
            el.textContent = 'AI Agents Revenue';
        });
        document.querySelectorAll('[data-i18n="revenue_stream1_desc"]').forEach(el => {
            el.textContent = 'Income from AI agents providing valuable services across different sectors.';
        });
        document.querySelectorAll('[data-i18n="revenue_stream2_title"]').forEach(el => {
            el.textContent = 'DeFi Services';
        });
        document.querySelectorAll('[data-i18n="revenue_stream2_desc"]').forEach(el => {
            el.textContent = 'Fees from decentralized exchange, liquidity provision, and trading services.';
        });
        document.querySelectorAll('[data-i18n="revenue_stream3_title"]').forEach(el => {
            el.textContent = 'DAO Advertising';
        });
        document.querySelectorAll('[data-i18n="revenue_stream3_desc"]').forEach(el => {
            el.textContent = 'Revenue from targeted advertising within the DAO ecosystem.';
        });
        document.querySelectorAll('[data-i18n="revenue_stream4_title"]').forEach(el => {
            el.textContent = 'NFT for GPU Access';
        });
        document.querySelectorAll('[data-i18n="revenue_stream4_desc"]').forEach(el => {
            el.textContent = 'Premium access to distributed GPU computational resources.';
        });
        document.querySelectorAll('[data-i18n="revenue_stream5_title"]').forEach(el => {
            el.textContent = 'Educational Courses';
        });
        document.querySelectorAll('[data-i18n="revenue_stream5_desc"]').forEach(el => {
            el.textContent = 'Income from premium educational content and certification programs.';
        });
        
        // Additional courses
        document.querySelectorAll('.courses-grid .course-card:nth-child(6) h3').forEach(el => {
            el.textContent = translations['en']['course6_title'];
        });
        
        document.querySelectorAll('.courses-grid .course-card:nth-child(6) p').forEach(el => {
            el.textContent = translations['en']['course6_desc'];
        });
        
        document.querySelectorAll('.courses-grid .course-card:nth-child(7) h3').forEach(el => {
            el.textContent = translations['en']['course7_title'];
        });
        
        document.querySelectorAll('.courses-grid .course-card:nth-child(7) p').forEach(el => {
            el.textContent = translations['en']['course7_desc'];
        });
        
        document.querySelectorAll('.courses-grid .course-card:nth-child(8) h3').forEach(el => {
            el.textContent = translations['en']['course8_title'];
        });
        
        document.querySelectorAll('.courses-grid .course-card:nth-child(8) p').forEach(el => {
            el.textContent = translations['en']['course8_desc'];
        });
        
        document.querySelectorAll('.courses-grid .course-card:nth-child(9) h3').forEach(el => {
            el.textContent = translations['en']['course9_title'];
        });
        
        document.querySelectorAll('.courses-grid .course-card:nth-child(9) p').forEach(el => {
            el.textContent = translations['en']['course9_desc'];
        });
    } else if (currentLanguage === 'ru') {
        // Проектные детали
        document.querySelectorAll('[data-i18n="project_details_title"]').forEach(el => {
            el.textContent = 'Детали Проекта';
        });
        document.querySelectorAll('[data-i18n="project_structure_title"]').forEach(el => {
            el.textContent = 'Структура Репозитория';
        });
        document.querySelectorAll('[data-i18n="project_vision_title"]').forEach(el => {
            el.textContent = 'Видение Будущего';
        });
        document.querySelectorAll('[data-i18n="project_vision_desc"]').forEach(el => {
            el.textContent = 'Наша амбициозная цель — создать полностью автономную, самосовершенствующуюся ИИ-экосистему на блокчейне TON, которая генерирует ценность для всех участников.';
        });
        
        // Финансовые перспективы
        document.querySelectorAll('[data-i18n="financial_title"]').forEach(el => {
            el.textContent = 'Финансовые Перспективы';
        });
        document.querySelectorAll('[data-i18n="financial_subtitle"]').forEach(el => {
            el.textContent = 'Монетизация Экосистемы';
        });
        document.querySelectorAll('[data-i18n="financial_desc"]').forEach(el => {
            el.textContent = 'Проект реализует несколько источников дохода для обеспечения устойчивого развития и ценности для всех участников.';
        });
        document.querySelectorAll('[data-i18n="revenue_stream1_title"]').forEach(el => {
            el.textContent = 'Доход от ИИ-агентов';
        });
        document.querySelectorAll('[data-i18n="revenue_stream1_desc"]').forEach(el => {
            el.textContent = 'Прибыль от ИИ-агентов, предоставляющих ценные услуги в различных секторах.';
        });
        document.querySelectorAll('[data-i18n="revenue_stream2_title"]').forEach(el => {
            el.textContent = 'DeFi-сервисы';
        });
        document.querySelectorAll('[data-i18n="revenue_stream2_desc"]').forEach(el => {
            el.textContent = 'Комиссии от децентрализованной биржи, предоставления ликвидности и торговых услуг.';
        });
        document.querySelectorAll('[data-i18n="revenue_stream3_title"]').forEach(el => {
            el.textContent = 'DAO-реклама';
        });
        document.querySelectorAll('[data-i18n="revenue_stream3_desc"]').forEach(el => {
            el.textContent = 'Доход от таргетированной рекламы внутри DAO-экосистемы.';
        });
        document.querySelectorAll('[data-i18n="revenue_stream4_title"]').forEach(el => {
            el.textContent = 'NFT для GPU';
        });
        document.querySelectorAll('[data-i18n="revenue_stream4_desc"]').forEach(el => {
            el.textContent = 'Премиум-доступ к распределенным вычислительным ресурсам GPU.';
        });
        document.querySelectorAll('[data-i18n="revenue_stream5_title"]').forEach(el => {
            el.textContent = 'Образовательные курсы';
        });
        document.querySelectorAll('[data-i18n="revenue_stream5_desc"]').forEach(el => {
            el.textContent = 'Доход от премиум образовательного контента и программ сертификации.';
        });
    }
    
    // Добавляем обработку информации о первой фазе дорожной карты
    if (currentLanguage === 'en') {
        // Phase 1 details - English version
        document.querySelectorAll('.roadmap-card[data-phase="1"] .phase-title').forEach(el => {
            el.textContent = 'Phase 1: Foundation';
        });
        
        document.querySelectorAll('.roadmap-card[data-phase="1"] .phase-subtitle').forEach(el => {
            el.textContent = 'Building the Foundation';
        });
        
        document.querySelectorAll('.roadmap-card[data-phase="1"] .phase-description').forEach(el => {
            el.textContent = 'We are creating a solid technological foundation';
        });
        
        document.querySelectorAll('.roadmap-card[data-phase="1"] .phase-goals-title').forEach(el => {
            el.textContent = 'Key Goals:';
        });
        
        document.querySelectorAll('.roadmap-card[data-phase="1"] .phase-goals li:nth-child(1)').forEach(el => {
            el.textContent = 'Developing educational courses';
        });
        
        document.querySelectorAll('.roadmap-card[data-phase="1"] .phase-goals li:nth-child(2)').forEach(el => {
            el.textContent = 'Forming repository structure';
        });
        
        document.querySelectorAll('.roadmap-card[data-phase="1"] .phase-goals li:nth-child(3)').forEach(el => {
            el.textContent = 'Creating basic AI agent functionality';
        });
        
        document.querySelectorAll('.roadmap-card[data-phase="1"] .phase-tasks-title').forEach(el => {
            el.textContent = 'Current/Planned Tasks:';
        });
        
        document.querySelectorAll('.roadmap-card[data-phase="1"] .phase-tasks li:nth-child(1)').forEach(el => {
            el.textContent = 'NFT reward system';
        });
        
        document.querySelectorAll('.roadmap-card[data-phase="1"] .phase-tasks li:nth-child(2)').forEach(el => {
            el.textContent = 'Preparing TON smart contracts';
        });
        
        document.querySelectorAll('.roadmap-card[data-phase="1"] .phase-tasks li:nth-child(3)').forEach(el => {
            el.textContent = 'Building initial community';
        });
    }
    
    // Current Stage section in English version
    if (currentLanguage === 'en') {
        document.querySelectorAll('.current-stage-content .stage-badge').forEach(el => {
            el.textContent = 'Current Phase';
        });
        
        document.querySelectorAll('.current-stage-content h3').forEach(el => {
            el.textContent = 'Phase 1: Foundation';
        });
        
        document.querySelectorAll('.current-stage-content .current-stage-subtitle').forEach(el => {
            el.textContent = 'We are creating a solid technological foundation';
        });
        
        document.querySelectorAll('.current-stage-content p:first-of-type').forEach(el => {
            el.textContent = 'The current stage is focused on building key infrastructure and forming the community. Join our team and become part of a revolutionary project!';
        });
    }
    
    // Обработка секции Current Phase
    if (currentLanguage === 'en') {
        document.querySelectorAll('[data-i18n="current_phase_title"]').forEach(el => {
            el.textContent = translations['en']['current_phase_title'];
        });
        
        document.querySelectorAll('[data-i18n="current_phase_badge"]').forEach(el => {
            el.textContent = translations['en']['current_phase_badge'];
        });
        
        document.querySelectorAll('[data-i18n="current_phase_subtitle"]').forEach(el => {
            el.textContent = translations['en']['current_phase_subtitle'];
        });
        
        document.querySelectorAll('[data-i18n="current_phase_desc"]').forEach(el => {
            el.textContent = translations['en']['current_phase_desc'];
        });
        
        document.querySelectorAll('[data-i18n="current_phase_highlight1"]').forEach(el => {
            el.textContent = translations['en']['current_phase_highlight1'];
        });
        
        document.querySelectorAll('[data-i18n="current_phase_highlight2"]').forEach(el => {
            el.textContent = translations['en']['current_phase_highlight2'];
        });
        
        document.querySelectorAll('[data-i18n="current_phase_highlight3"]').forEach(el => {
            el.textContent = translations['en']['current_phase_highlight3'];
        });
        
        document.querySelectorAll('[data-i18n="current_phase_highlight4"]').forEach(el => {
            el.textContent = translations['en']['current_phase_highlight4'];
        });
        
        document.querySelectorAll('[data-i18n="current_phase_highlight5"]').forEach(el => {
            el.textContent = translations['en']['current_phase_highlight5'];
        });
        
        document.querySelectorAll('[data-i18n="current_phase_cta_primary"]').forEach(el => {
            el.textContent = translations['en']['current_phase_cta_primary'];
        });
        
        document.querySelectorAll('[data-i18n="current_phase_cta_secondary"]').forEach(el => {
            el.textContent = translations['en']['current_phase_cta_secondary'];
        });
    } else if (currentLanguage === 'ru') {
        document.querySelectorAll('[data-i18n="current_phase_title"]').forEach(el => {
            el.textContent = translations['ru']['current_phase_title'];
        });
        
        document.querySelectorAll('[data-i18n="current_phase_badge"]').forEach(el => {
            el.textContent = translations['ru']['current_phase_badge'];
        });
        
        document.querySelectorAll('[data-i18n="current_phase_subtitle"]').forEach(el => {
            el.textContent = translations['ru']['current_phase_subtitle'];
        });
        
        document.querySelectorAll('[data-i18n="current_phase_desc"]').forEach(el => {
            el.textContent = translations['ru']['current_phase_desc'];
        });
        
        document.querySelectorAll('[data-i18n="current_phase_highlight1"]').forEach(el => {
            el.textContent = translations['ru']['current_phase_highlight1'];
        });
        
        document.querySelectorAll('[data-i18n="current_phase_highlight2"]').forEach(el => {
            el.textContent = translations['ru']['current_phase_highlight2'];
        });
        
        document.querySelectorAll('[data-i18n="current_phase_highlight3"]').forEach(el => {
            el.textContent = translations['ru']['current_phase_highlight3'];
        });
        
        document.querySelectorAll('[data-i18n="current_phase_highlight4"]').forEach(el => {
            el.textContent = translations['ru']['current_phase_highlight4'];
        });
        
        document.querySelectorAll('[data-i18n="current_phase_highlight5"]').forEach(el => {
            el.textContent = translations['ru']['current_phase_highlight5'];
        });
        
        document.querySelectorAll('[data-i18n="current_phase_cta_primary"]').forEach(el => {
            el.textContent = translations['ru']['current_phase_cta_primary'];
        });
        
        document.querySelectorAll('[data-i18n="current_phase_cta_secondary"]').forEach(el => {
            el.textContent = translations['ru']['current_phase_cta_secondary'];
        });
    }
    
    // Educational Courses in English version
    if (currentLanguage === 'en') {
        // First 5 courses
        document.querySelectorAll('.courses-grid .course-card:nth-child(1) h3').forEach(el => {
            el.textContent = translations['en']['course1_title'];
        });
        
        document.querySelectorAll('.courses-grid .course-card:nth-child(1) p').forEach(el => {
            el.textContent = translations['en']['course1_desc'];
        });
        
        document.querySelectorAll('.courses-grid .course-card:nth-child(2) h3').forEach(el => {
            el.textContent = translations['en']['course2_title'];
        });
        
        document.querySelectorAll('.courses-grid .course-card:nth-child(2) p').forEach(el => {
            el.textContent = translations['en']['course2_desc'];
        });
        
        document.querySelectorAll('.courses-grid .course-card:nth-child(3) h3').forEach(el => {
            el.textContent = translations['en']['course3_title'];
        });
        
        document.querySelectorAll('.courses-grid .course-card:nth-child(3) p').forEach(el => {
            el.textContent = translations['en']['course3_desc'];
        });
        
        document.querySelectorAll('.courses-grid .course-card:nth-child(4) h3').forEach(el => {
            el.textContent = translations['en']['course4_title'];
        });
        
        document.querySelectorAll('.courses-grid .course-card:nth-child(4) p').forEach(el => {
            el.textContent = translations['en']['course4_desc'];
        });
        
        document.querySelectorAll('.courses-grid .course-card:nth-child(5) h3').forEach(el => {
            el.textContent = translations['en']['course5_title'];
        });
        
        document.querySelectorAll('.courses-grid .course-card:nth-child(5) p').forEach(el => {
            el.textContent = translations['en']['course5_desc'];
        });
        
        // Additional courses
        document.querySelectorAll('.courses-grid .course-card:nth-child(6) h3').forEach(el => {
            el.textContent = translations['en']['course6_title'];
        });
        
        document.querySelectorAll('.courses-grid .course-card:nth-child(6) p').forEach(el => {
            el.textContent = translations['en']['course6_desc'];
        });
        
        document.querySelectorAll('.courses-grid .course-card:nth-child(7) h3').forEach(el => {
            el.textContent = translations['en']['course7_title'];
        });
        
        document.querySelectorAll('.courses-grid .course-card:nth-child(7) p').forEach(el => {
            el.textContent = translations['en']['course7_desc'];
        });
        
        document.querySelectorAll('.courses-grid .course-card:nth-child(8) h3').forEach(el => {
            el.textContent = translations['en']['course8_title'];
        });
        
        document.querySelectorAll('.courses-grid .course-card:nth-child(8) p').forEach(el => {
            el.textContent = translations['en']['course8_desc'];
        });
        
        document.querySelectorAll('.courses-grid .course-card:nth-child(9) h3').forEach(el => {
            el.textContent = translations['en']['course9_title'];
        });
        
        document.querySelectorAll('.courses-grid .course-card:nth-child(9) p').forEach(el => {
            el.textContent = translations['en']['course9_desc'];
        });
    }
    
    // Обработка фазы 5 в русской версии
    if (currentLanguage === 'ru') {
        // Фаза 5 - русская версия
        document.querySelectorAll('.roadmap-card[data-phase="5"] .phase-title').forEach(el => {
            el.textContent = 'Фаза 5: Революционная экосистема';
        });
        
        document.querySelectorAll('.roadmap-card[data-phase="5"] .phase-subtitle').forEach(el => {
            el.textContent = 'Создание самоподдерживающейся цифровой экономики';
        });
        
        document.querySelectorAll('.roadmap-card[data-phase="5"] .phase-description').forEach(el => {
            el.textContent = 'На этом зрелом этапе мы завершаем экосистему продвинутыми компонентами';
        });
        
        document.querySelectorAll('.roadmap-card[data-phase="5"] .phase-goals-title').forEach(el => {
            el.textContent = 'Ключевые цели:';
        });
        
        document.querySelectorAll('.roadmap-card[data-phase="5"] .phase-goals li:nth-child(1)').forEach(el => {
            el.textContent = 'Разработка самосовершенствующихся ИИ-систем';
        });
        
        document.querySelectorAll('.roadmap-card[data-phase="5"] .phase-goals li:nth-child(2)').forEach(el => {
            el.textContent = 'Создание полностью автономных сетей агентов';
        });
        
        document.querySelectorAll('.roadmap-card[data-phase="5"] .phase-goals li:nth-child(3)').forEach(el => {
            el.textContent = 'Внедрение кросс-чейн совместимости для всех сервисов';
        });
        
        document.querySelectorAll('.roadmap-card[data-phase="5"] .phase-tasks-title').forEach(el => {
            el.textContent = 'Планируемые задачи:';
        });
        
        document.querySelectorAll('.roadmap-card[data-phase="5"] .phase-tasks li:nth-child(1)').forEach(el => {
            el.textContent = 'Запуск DAO Рекламной Биржи';
        });
        
        document.querySelectorAll('.roadmap-card[data-phase="5"] .phase-tasks li:nth-child(2)').forEach(el => {
            el.textContent = 'Разработка ИИ-Launchpool';
        });
        
        document.querySelectorAll('.roadmap-card[data-phase="5"] .phase-tasks li:nth-child(3)').forEach(el => {
            el.textContent = 'Создание комплексного фреймворка AGI';
        });
    }
    
    // Обработка компонентов экосистемы в русской версии
    if (currentLanguage === 'ru') {
        // Обработка карточек экосистемы
        document.querySelectorAll('.ecosystem-card').forEach((card, index) => {
            const cardNumber = index + 1;
            
            // Заголовок карточки
            card.querySelectorAll('.ecosystem-title').forEach(el => {
                el.textContent = translations['ru'][`ecosystem_card${cardNumber}_title`];
            });
            
            // Описание карточки
            card.querySelectorAll('.ecosystem-desc').forEach(el => {
                el.textContent = translations['ru'][`ecosystem_card${cardNumber}_desc`];
            });
            
            // Дополнительная информация
            card.querySelectorAll('.extra-info h4').forEach(el => {
                el.textContent = translations['ru'][`ecosystem_card${cardNumber}_extra_title`];
            });
            
            card.querySelectorAll('.extra-info > p').forEach(el => {
                el.textContent = translations['ru'][`ecosystem_card${cardNumber}_extra_desc`];
            });
            
            // Особенности (до 6 пунктов)
            for (let i = 1; i <= 6; i++) {
                card.querySelectorAll(`.extra-info ul li:nth-child(${i})`).forEach(el => {
                    const key = `ecosystem_card${cardNumber}_feature${i}`;
                    if (translations['ru'][key]) {
                        el.textContent = translations['ru'][key];
                    }
                });
            }
        });
    }
    
    // Обработка раздела NFT в русской версии
    if (currentLanguage === 'ru') {
        document.querySelectorAll('.nft-distribution h4').forEach(el => {
            el.textContent = translations['ru']['nft_distribution_title'];
        });
        
        document.querySelectorAll('.nft-distribution p:nth-child(2)').forEach(el => {
            el.textContent = translations['ru']['nft_distribution_reserve'];
        });
        
        document.querySelectorAll('.nft-distribution p:nth-child(3)').forEach(el => {
            el.textContent = translations['ru']['nft_distribution_community'];
        });
        
        document.querySelectorAll('.profit-sharing h4').forEach(el => {
            el.textContent = translations['ru']['nft_profit_sharing_title'];
        });
        
        document.querySelectorAll('.profit-table th:nth-child(1)').forEach(el => {
            el.textContent = translations['ru']['nft_profit_column1'];
        });
        
        document.querySelectorAll('.profit-table th:nth-child(2)').forEach(el => {
            el.textContent = translations['ru']['nft_profit_column2'];
        });
        
        document.querySelectorAll('.investment-bonus h4').forEach(el => {
            el.textContent = translations['ru']['nft_investment_bonus_title'];
        });
        
        document.querySelectorAll('.investment-bonus p').forEach(el => {
            el.textContent = translations['ru']['nft_investment_bonus_text'];
        });
    }
    
    // Обрабатываем глюк-эффект при смене языка
    document.querySelectorAll('.glitch-text, .glitch-hover').forEach(element => {
        element.classList.add('active-glitch');
        setTimeout(() => {
            element.classList.remove('active-glitch');
        }, 1000);
    });
    
    // Обновляем активное состояние кнопок переключения языка
    document.querySelectorAll('.language-switcher button').forEach(btn => {
        if (btn.getAttribute('data-lang') === currentLanguage) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Добавляем функционал для раскрытия блоков фаз
function initPhaseDetailToggle() {
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