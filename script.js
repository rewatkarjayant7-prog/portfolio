// Wait for DOM content to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.classList.add('shadow-lg');
            navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.98)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.classList.remove('shadow-lg');
            navbar.style.backgroundColor = 'rgba(18, 18, 18, 0.95)';
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                const navbarToggler = document.querySelector('.navbar-toggler');
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (window.getComputedStyle(navbarToggler).display !== 'none' && navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }

                // Smooth scroll
                const offsetTop = targetElement.offsetTop - 70; // Adjust for sticky header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Fade-in animation on scroll
    const fadeElems = document.querySelectorAll('.fade-in');
    
    // Initial check on page load
    checkFade();

    window.addEventListener('scroll', checkFade);

    function checkFade() {
        const triggerBottom = window.innerHeight / 5 * 4;

        fadeElems.forEach(elem => {
            const elemTop = elem.getBoundingClientRect().top;

            if (elemTop < triggerBottom) {
                elem.classList.add('visible');
            }
        });
    }

    // Active link highlighting (Handled by Bootstrap ScrollSpy, but adding custom logic if needed)
    // Bootstrap's ScrollSpy is initialized in the HTML body tag.
});
