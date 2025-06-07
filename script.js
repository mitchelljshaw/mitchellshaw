document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Nav
    function createMobileMenu() {
        const navbar = document.querySelector('.navbar .container');
        const navList = document.querySelector('.navbar-nav');
        
        // Hamburger Button
        const hamburger = document.createElement('button');
        hamburger.className = 'mobile-menu-toggle';
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        hamburger.setAttribute('aria-label', 'Toggle mobile menu');
        navbar.appendChild(hamburger);
        
        // Mobile Menu
        hamburger.addEventListener('click', function() {
            navList.classList.toggle('mobile-menu-active');
            const icon = hamburger.querySelector('i');
            icon.className = navList.classList.contains('mobile-menu-active') 
                ? 'fas fa-times' : 'fas fa-bars';
        });
        
        // Close when navLinks or clicking outside
        document.addEventListener('click', function(e) {
            if (!navbar.contains(e.target) || e.target.classList.contains('nav-link')) {
                navList.classList.remove('mobile-menu-active');
                hamburger.querySelector('i').className = 'fas fa-bars';
            }
        });
    }
    
    // Smooth Scrolling
    function initSmoothScrolling() {
        document.addEventListener('click', function(e) {
            if (e.target.matches('a[href^="#"]')) {
                e.preventDefault();
                const targetId = e.target.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    window.scrollTo({
                        top: targetSection.offsetTop - navbarHeight - 20,
                        behavior: 'smooth'
                    });
                }
            }
        });
    }
    
    // Scroll Effects
    function initScrollEffects() {
        const navbar = document.querySelector('.navbar');
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset;
            
            navbar.classList.toggle('navbar-scrolled', scrollTop > 50);
            
            const scrollPosition = scrollTop + 100;
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
                    });
                }
            });
        });
    }
    
    // Scroll Animations
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        // Observe elements for animation
        document.querySelectorAll('.skill-category, .timeline-item, .education-card, .contact-item')
            .forEach(element => {
                element.classList.add('animate-on-scroll');
                observer.observe(element);
            });
    }
    
    // Typing Animation Hero
    function initTypingAnimation() {
        const heroSubtitle = document.querySelector('.hero-subtitle');
        if (!heroSubtitle) return;
        
        const titles = ['Junior Developer', 'Problem Solver', 'Team Player', 'Tech Enthusiast'];
        let currentTitle = 0;
        let currentChar = 0;
        let isDeleting = false;
        
        function typeTitle() {
            const current = titles[currentTitle];
            
            if (isDeleting) {
                heroSubtitle.textContent = current.substring(0, currentChar - 1);
                currentChar--;
            } else {
                heroSubtitle.textContent = current.substring(0, currentChar + 1);
                currentChar++;
            }
            
            let typeSpeed = isDeleting ? 50 : 100;
            
            if (!isDeleting && currentChar === current.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && currentChar === 0) {
                isDeleting = false;
                currentTitle = (currentTitle + 1) % titles.length;
                typeSpeed = 500;
            }
            
            setTimeout(typeTitle, typeSpeed);
        }
        
        setTimeout(typeTitle, 1000);
    }
    
    // Contact Copy 
    function initContactEnhancements() {
        document.addEventListener('click', function(e) {
            const contactLink = e.target.closest('.contact-item a');
            if (contactLink && (contactLink.href.startsWith('tel:') || contactLink.href.startsWith('mailto:'))) {
                navigator.clipboard.writeText(contactLink.textContent).then(() => {
                    const originalText = contactLink.textContent;
                    contactLink.style.color = '#48bb78';
                    contactLink.textContent = 'Copied!';
                    
                    setTimeout(() => {
                        contactLink.textContent = originalText;
                        contactLink.style.color = '';
                    }, 1500);
                });
            }
        });
    }
    
    // Functions
    createMobileMenu();
    initSmoothScrolling();
    initScrollEffects();
    initScrollAnimations();
    initTypingAnimation();
    initContactEnhancements();
    
    // Skill Tags Animation
    document.querySelectorAll('.skill-tag').forEach((tag, index) => {
        tag.style.animationDelay = `${index * 0.1}s`;
        tag.classList.add('skill-tag-animate');
    });
    
    // Styles
    const styles = document.createElement('style');
    styles.textContent = `
        /* Mobile Menu Styles */
        .mobile-menu-toggle {
            display: none;
            background: none;
            border: none;
            color: var(--light);
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.5rem;
        }
        
        @media (max-width: 768px) {
            .mobile-menu-toggle { display: block; }
            .navbar-nav {
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: rgba(26, 32, 44, 0.98);
                flex-direction: column;
                padding: 1rem;
                transform: translateY(-100%);
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }
            .navbar-nav.mobile-menu-active {
                transform: translateY(0);
                opacity: 1;
                visibility: visible;
            }
            .nav-link {
                padding: 1rem;
                border-bottom: 1px solid rgba(255,255,255,0.1);
            }
        }
        
        /* Scroll Animations */
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        .animate-on-scroll.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Active Navigation */
        .nav-link.active {
            background-color: rgba(66, 153, 225, 0.3);
            color: var(--accent);
        }
        
        /* Navbar Scrolled State */
        .navbar-scrolled {
            background: rgba(26, 32, 44, 0.98);
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        /* Skill Tag Animation */
        .skill-tag-animate {
            animation: slideInUp 0.6s ease forwards;
        }
        
        @keyframes slideInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(styles);
});

// Utility - Smooth scroll 
if (!CSS?.supports('scroll-behavior', 'smooth')) {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/smoothscroll/1.4.10/SmoothScroll.min.js';
    document.head.appendChild(script);
}

console.log(`Thanks for visiting my Portfolio :)!
`);
