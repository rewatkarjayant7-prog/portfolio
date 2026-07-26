document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. SCROLL REVEAL & SKILL BARS ANIMATION
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // If it is a skills card, trigger the progress bars inside it
                const skillFills = entry.target.querySelectorAll('.skill-bar-fill');
                if (skillFills.length > 0) {
                    skillFills.forEach(bar => {
                        bar.style.width = bar.getAttribute('data-percent');
                    });
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // ==========================================
    // 2. CUSTOM CURSOR WITH LERP INTERPOLATION
    // ==========================================
    const cursorDot = document.getElementById('custom-cursor-dot');
    const cursorCircle = document.getElementById('custom-cursor-circle');
    
    let mouseX = 0, mouseY = 0; // Current mouse position
    let circleX = 0, circleY = 0; // Lagging circle position
    const lerpFactor = 0.15; // Animation inertia factor

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Immediate positioning for the inner dot
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
    });

    // LERP loop for smooth circle movement
    function animateCursorCircle() {
        circleX += (mouseX - circleX) * lerpFactor;
        circleY += (mouseY - circleY) * lerpFactor;
        
        cursorCircle.style.left = `${circleX}px`;
        cursorCircle.style.top = `${circleY}px`;
        
        requestAnimationFrame(animateCursorCircle);
    }
    animateCursorCircle();

    // Trigger cursor scaling & colors on interactive hovers
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .glow-card, .tech-badge, .filter-btn');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-hover');
        });
    });

    // ==========================================
    // 3. GLOWING SPOTLIGHT CARD EFFECT
    // ==========================================
    const glowCards = document.querySelectorAll('.glow-card');
    
    glowCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // ==========================================
    // 4. 3D CARD TILT EFFECT (PROJECT CARDS)
    // ==========================================
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x coordinate within the element
            const y = e.clientY - rect.top;  // y coordinate within the element
            
            // Calculate rotational values based on cursor offset from card center
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Max rotation is 8 degrees
            const rotateX = ((centerY - y) / centerY) * 8;
            const rotateY = ((x - centerX) / centerX) * 8;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
        });
    });

    // ==========================================
    // 5. TYPEWRITER ANIMATION SEQUENCE
    // ==========================================
    const words = [
        "Backend Development.",
        "Full Stack Development.",
        "Database Optimization.",
        "REST API Architectures.",
        "AI-powered Solutions."
    ];
    
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingElement = document.getElementById('typing-keyword');
    let typingSpeed = 100;

    function typeEffect() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            // Delete characters
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Delete faster
        } else {
            // Write characters
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        // Handle states transition
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typingSpeed = 1800; // Pause at complete word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 400; // Pause before typing next word
        }

        setTimeout(typeEffect, typingSpeed);
    }
    
    if (typingElement) {
        typeEffect();
    }

    // ==========================================
    // 6. DYNAMIC FILTER CONTROLS (PROJECTS & SKILLS)
    // ==========================================
    
    // Skill filters
    const skillFilters = document.querySelectorAll('[data-skill-cat]');
    const skillCards = document.querySelectorAll('.skills-card');
    
    skillFilters.forEach(filter => {
        filter.addEventListener('click', (e) => {
            // Check if it's a category button (not card category itself)
            if (e.target.classList.contains('filter-btn')) {
                // Toggle active class on filters
                document.querySelectorAll('[data-skill-cat].filter-btn').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                
                const selectedCat = e.target.getAttribute('data-skill-cat');
                
                skillCards.forEach(card => {
                    const cardCat = card.getAttribute('data-skill-cat');
                    if (selectedCat === 'all' || cardCat === selectedCat) {
                        card.style.display = 'block';
                        // Force width animation trigger for visible cards
                        const bars = card.querySelectorAll('.skill-bar-fill');
                        bars.forEach(bar => {
                            bar.style.width = bar.getAttribute('data-percent');
                        });
                    } else {
                        card.style.display = 'none';
                    }
                });
            }
        });
    });

    // Project filters
    const projectFilters = document.querySelectorAll('[data-project-cat].filter-btn');
    const projectWrappers = document.querySelectorAll('.project-card-wrapper');
    
    projectFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            // Toggle active classes
            projectFilters.forEach(btn => btn.classList.remove('active'));
            filter.classList.add('active');
            
            const selectedCat = filter.getAttribute('data-project-cat');
            
            projectWrappers.forEach(card => {
                const cardCat = card.getAttribute('data-project-cat');
                if (selectedCat === 'all' || cardCat === selectedCat) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Close mobile nav when clicking links
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.getElementById('navbarNav');
    const bsCollapse = new bootstrap.Collapse(navbarCollapse, {toggle: false});
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 992 && navbarCollapse.classList.contains('show')) {
                bsCollapse.hide();
            }
        });
    });

    // Navbar Scrolled Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ==========================================
    // 7. CANVAS PARTICLES NETWORK BACKGROUND
    // ==========================================
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    
    let particlesArray = [];
    let particleCount = 60;
    
    // Particle class definition
    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
        
        update() {
            // Bounce on boundaries
            if (this.x > canvas.width || this.x < 0) {
                this.directionX = -this.directionX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.directionY = -this.directionY;
            }
            
            // Move particle
            this.x += this.directionX;
            this.y += this.directionY;
            
            this.draw();
        }
    }
    
    // Initialize particle array
    function initParticles() {
        particlesArray = [];
        // Adaptive particle count based on screen size
        if (window.innerWidth < 768) {
            particleCount = 30;
        } else {
            particleCount = 70;
        }
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        for (let i = 0; i < particleCount; i++) {
            let size = (Math.random() * 2) + 0.8;
            let x = Math.random() * (canvas.width - size * 2) + size;
            let y = Math.random() * (canvas.height - size * 2) + size;
            
            // Very slow motion speed
            let directionX = (Math.random() * 0.4) - 0.2;
            let directionY = (Math.random() * 0.4) - 0.2;
            
            // Color is a subtle slate grey/blue
            let color = 'rgba(148, 163, 184, 0.25)';
            
            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }
    
    // Connect particles close to each other with a fine line
    function connectParticles() {
        let maxDistance = (canvas.width / 8) * (canvas.height / 8);
        if (maxDistance > 18000) maxDistance = 18000; // Cap distance
        
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
                             + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                
                if (distance < maxDistance) {
                    let alpha = 1 - (distance / maxDistance);
                    // Subtle purple/blue gradient link color
                    ctx.strokeStyle = `rgba(37, 99, 235, ${alpha * 0.12})`;
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    // Animation loop
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        connectParticles();
        requestAnimationFrame(animateParticles);
    }
    
    // Resize listener
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });
    
    // Start canvas animations
    initParticles();
    animateParticles();

    // ==========================================
    // 8. FUNCTIONAL CONTACT FORM HANDLER (EmailJS / Web3Forms)
    // ==========================================
    // Configure your active email provider credentials below:
    const EMAILJS_PUBLIC_KEY = 'YOUR_EMAILJS_PUBLIC_KEY'; // E.g., 'xxxxxxxxx'
    const EMAILJS_SERVICE_ID = 'YOUR_EMAILJS_SERVICE_ID'; // E.g., 'service_xxxxxxx'
    const EMAILJS_TEMPLATE_ID = 'YOUR_EMAILJS_TEMPLATE_ID'; // E.g., 'template_xxxxxxx'

    const WEB3FORMS_ACCESS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY'; // E.g., 'xxxxxxx-xxxx-xxxx-xxxx-xxxxxxx'

    const contactForm = document.getElementById('contact-form');
    const contactStatus = document.getElementById('contact-form-status');
    const submitBtn = document.getElementById('form-submit-btn');

    if (contactForm && contactStatus && submitBtn) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // 1. Perform HTML validation check
            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            // Disable button and update text to loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            // Clear prior status styling
            contactStatus.style.display = 'none';
            contactStatus.className = 'mt-3 p-3 rounded';

            // 2. Identify active provider
            const hasEmailJS = (EMAILJS_PUBLIC_KEY !== 'YOUR_EMAILJS_PUBLIC_KEY' && EMAILJS_PUBLIC_KEY.trim() !== '');
            const hasWeb3Forms = (WEB3FORMS_ACCESS_KEY !== 'YOUR_WEB3FORMS_ACCESS_KEY' && WEB3FORMS_ACCESS_KEY.trim() !== '');

            if (!hasEmailJS && !hasWeb3Forms) {
                // Inform user to supply credentials
                contactStatus.textContent = 'Please configure your EmailJS or Web3Forms credentials at the top of script.js.';
                contactStatus.classList.add('status-error');
                contactStatus.style.display = 'block';
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
                console.warn('No mail setup found. Set EMAILJS or WEB3FORMS credentials in script.js.');
                return;
            }

            // 3. Dispatch using active service
            if (hasEmailJS) {
                // Initialize EmailJS with Public Key
                emailjs.init(EMAILJS_PUBLIC_KEY);

                // Send form directly using EmailJS
                emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, contactForm)
                .then(() => {
                    contactStatus.textContent = '✅ Your message has been sent successfully.';
                    contactStatus.classList.add('status-success');
                    contactStatus.style.display = 'block';
                    contactForm.reset();
                })
                .catch(error => {
                    console.error('EmailJS Error Details:', error);
                    contactStatus.textContent = `Failed to send message: ${error.text || error.message || 'Unknown EmailJS error'}. Please try again later.`;
                    contactStatus.classList.add('status-error');
                    contactStatus.style.display = 'block';
                })
                .finally(() => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Message';
                });

            } else if (hasWeb3Forms) {
                const formData = new FormData(contactForm);
                formData.append("access_key", WEB3FORMS_ACCESS_KEY);
                formData.append("subject", `New Contact: ${formData.get("subject")}`);
                formData.append("from_name", formData.get("name"));

                fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                .then(async response => {
                    const data = await response.json();
                    if (response.ok && data.success) {
                        contactStatus.textContent = '✅ Your message has been sent successfully.';
                        contactStatus.classList.add('status-success');
                        contactStatus.style.display = 'block';
                        contactForm.reset();
                    } else {
                        throw new Error(data.message || 'Web3Forms server error');
                    }
                })
                .catch(error => {
                    console.error('Web3Forms Error Details:', error);
                    contactStatus.textContent = `Failed to send message: ${error.message}. Please try again later.`;
                    contactStatus.classList.add('status-error');
                    contactStatus.style.display = 'block';
                })
                .finally(() => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Message';
                });
            }
        });
    }
});

