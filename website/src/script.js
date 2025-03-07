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
        }
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
    // Установка языка документа
    document.documentElement.lang = currentLanguage;
    
    // Обновление заголовка страницы и метатегов в зависимости от языка
    if (currentLanguage === 'ru') {
        document.title = "ASINGULARITY AI | Децентрализованная ИИ-экосистема";
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', 'Революционная децентрализованная экосистема, объединяющая передовые технологии ИИ, Крипто, NFT и Web3 на блокчейне TON');
        }
    } else {
        document.title = "ASINGULARITY AI | Decentralized AI Ecosystem";
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', 'Building a revolutionary ecosystem that combines AI, Crypto, NFT, and Web3 technologies on TON blockchain');
        }
    }
    
    // Находим все элементы с атрибутом data-i18n
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        
        // Поддержка вложенных ключей (например: "current_stage_highlights.0")
        let translationValue = translations[currentLanguage];
        if (translationValue) {
            const keyParts = key.split('.');
            try {
                // Проходим по частям ключа, получая вложенные значения
                for (const part of keyParts) {
                    translationValue = translationValue[part];
                    // Если на каком-то этапе значение не определено, прерываем цикл
                    if (translationValue === undefined) break;
                }
            } catch (error) {
                console.warn(`Translation error for key: ${key}`, error);
                translationValue = undefined;
            }
        }
        
        // Если удалось получить значение перевода
        if (translationValue !== undefined) {
            const tagName = element.tagName.toUpperCase();
            
            // Обработка разных типов элементов
            if (tagName === 'INPUT') {
                if (element.type === 'text' || element.type === 'email' || element.type === 'search') {
                    element.setAttribute('placeholder', translationValue);
                } else {
                    element.value = translationValue;
                }
            } else if (tagName === 'META') {
                element.setAttribute('content', translationValue);
            } else if (tagName === 'A') {
                if (element.hasAttribute('title')) {
                    element.setAttribute('title', translationValue);
                }
                // Если у ссылки нет дочерних элементов, обновляем текст
                if (element.childElementCount === 0) {
                    element.innerHTML = translationValue; // Используем innerHTML для поддержки HTML в переводах
                }
            } else if (tagName === 'IMG' || tagName === 'IFRAME') {
                element.setAttribute('alt', translationValue);
            } else {
                // Обрабатываем элементы с data-text атрибутом для glitch-эффекта
                if (element.hasAttribute('data-text')) {
                    element.setAttribute('data-text', translationValue);
                }
                
                // Устанавливаем содержимое HTML, чтобы поддерживать теги в переводах
                element.innerHTML = translationValue;
            }
        }
    });
    
    // Добавляем glitch-эффект при смене языка
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