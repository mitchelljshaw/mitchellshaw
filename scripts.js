// Javascript for Mitchell Shaw Portfolio

document.addEventListener('DOMContentLoaded', function() {  // Mobile navigation toggle
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarCollapse = document.getElementById('navbarResponsive');
    
    navbarToggle.addEventListener('click', function() {
        navbarCollapse.classList.toggle('show');
        this.setAttribute('aria-expanded', this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {  // Close mobile menu when clicking a link
        link.addEventListener('click', () => {
            navbarCollapse.classList.remove('show');
            navbarToggle.setAttribute('aria-expanded', 'false');
        });
    });
    
    window.addEventListener('scroll', function() {     // Navbar scroll effect
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    AOS.init({   // Initialize AOS (Animate On Scroll)
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
    
    document.getElementById('year').textContent = new Date().getFullYear();     // Update copyright year
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {     // Smooth scrolling for anchor links
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    const skillBars = document.querySelectorAll('.skill-level');     // Animate skill bars on scroll
    const skillsSection = document.querySelector('.skills');
    
    const animateSkills = () => {
        if (isElementInViewport(skillsSection)) {
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
            window.removeEventListener('scroll', animateSkills);
        }
    };
    
    window.addEventListener('scroll', animateSkills);
    
    function isElementInViewport(el) {  // Checker (if element is in viewport)
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
});
