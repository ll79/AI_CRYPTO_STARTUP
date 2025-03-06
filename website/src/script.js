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
        aiText.classList.remove('random-glitch');
        singularityText.classList.remove('random-glitch');
        highlightedLetters.forEach(el => {
            el.classList.remove('random-glitch');
        });
        
        // Remove any previously created elements
        const oldElements = document.querySelectorAll('.logo-ai, .logo-singularity');
        oldElements.forEach(el => el.remove());
        
        // Animation sequence
        
        // Step 1: Add glitch effect to the logo text
        setTimeout(() => {
            logoText.classList.add('glitch-text');
        }, 1000);
        
        // Step 2: Highlight and glitch the AI letters in the logo
        setTimeout(() => {
            highlightedLetters.forEach(el => {
                el.style.color = 'var(--accent-color)';
                el.style.textShadow = '0 0 10px var(--accent-color)';
                el.classList.add('random-glitch');
            });
            
            // Show and glitch the AI text in subtitle
            aiText.style.opacity = '1';
            aiText.classList.add('random-glitch');
        }, 2000);
        
        // Step 3: Show SINGULARITY text with glitch effect
        setTimeout(() => {
            singularityText.style.opacity = '1';
            singularityText.classList.add('random-glitch');
        }, 3000);
        
        // Step 4: Hold the glitch effect for a moment
        setTimeout(() => {
            // Keep the glitch effect active for a while
        }, 4000);
        
        // Step 5: Reset animation
        setTimeout(() => {
            logoText.classList.remove('glitch-text');
            highlightedLetters.forEach(el => {
                el.classList.remove('random-glitch');
                el.style.color = 'var(--secondary-color)';
                el.style.textShadow = 'none';
            });
            
            aiText.classList.remove('random-glitch');
            singularityText.classList.remove('random-glitch');
            
            // Keep the subtitle visible
            aiText.style.opacity = '1';
            singularityText.style.opacity = '1';
        }, 6000);
    }
    
    // Run animation on page load
    setTimeout(animateLogo, 1000);
    
    // Repeat animation every 15 seconds
    setInterval(animateLogo, 15000);

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

// Timeline animation
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
            }, 300 * index);
        });
    }
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