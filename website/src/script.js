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
        // Step 1: Highlight the A, I letters
        setTimeout(() => {
            const aElements = logoText.querySelectorAll('.highlight');
            aElements.forEach(el => {
                el.style.color = 'var(--accent-color)';
                el.style.textShadow = '0 0 10px var(--accent-color)';
            });
        }, 1000);
        
        // Step 2: Move the A, I letters up
        setTimeout(() => {
            const aElements = logoText.querySelectorAll('.highlight');
            aElements.forEach(el => {
                el.style.transform = 'translateY(-15px)';
                el.style.transition = 'transform 0.5s ease';
            });
        }, 2000);
        
        // Step 3: Show AI text
        setTimeout(() => {
            aiText.style.opacity = '1';
            aiText.style.transition = 'opacity 0.5s ease';
        }, 2500);
        
        // Step 4: Show SINGULARITY text
        setTimeout(() => {
            singularityText.style.opacity = '1';
            singularityText.style.transition = 'opacity 0.5s ease';
        }, 3000);
        
        // Step 5: Reset animation
        setTimeout(() => {
            const aElements = logoText.querySelectorAll('.highlight');
            aElements.forEach(el => {
                el.style.color = 'var(--secondary-color)';
                el.style.textShadow = 'none';
                el.style.transform = 'translateY(0)';
            });
            aiText.style.opacity = '0';
            singularityText.style.opacity = '0';
        }, 6000);
    }
    
    // Run animation on page load
    setTimeout(animateLogo, 1000);
    
    // Repeat animation every 8 seconds
    setInterval(animateLogo, 8000);

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

    // Ecosystem cards animation on scroll
    const ecosystemCards = document.querySelectorAll('.ecosystem-card');
    
    function checkEcosystemInView() {
        ecosystemCards.forEach((card, index) => {
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
    
    window.addEventListener('scroll', checkEcosystemInView);
    checkEcosystemInView(); // Check on page load

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
}); 