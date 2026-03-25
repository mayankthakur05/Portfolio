/**
 * Interactivity for Mayank Thakur's Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigation Background on Scroll
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenu = document.querySelector('.close-menu');
    const mobileLinks = document.querySelectorAll('.mobile-menu a');

    if (hamburger && mobileMenu && closeMenu) {
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.add('active');
        });

        closeMenu.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });

        // Close menu when a link is clicked
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        });
    }

    // 3. Scroll Reveal Animations (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // Trigger reveal immediately for elements in viewport on load
    setTimeout(() => {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('active');
            }
        });
    }, 100);

    // 4. Update Copyright Year Automatically
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // 5. Active Link Highlighting on Scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links .nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // 6. Typing Effect (Optional Setup if needed for multiple text)
    const typingWrapper = document.querySelector('.typing-text-wrapper');
    const typingText = document.querySelector('.typing-text');
    
    if (typingText) {
        // Simple blinking cursor handled in CSS
        // The text is static, but gives the illusion of being typed
    }

    // 7. Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const currentTheme = localStorage.getItem('theme');
        
        // Apply saved theme
        if (currentTheme === 'light') {
            document.body.classList.add('light-mode');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }

        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            
            if (document.body.classList.contains('light-mode')) {
                localStorage.setItem('theme', 'light');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            } else {
                localStorage.setItem('theme', 'dark');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            }
        });
    }

    // 8. Certification Lightbox Modal
    const certModal = document.getElementById('certModal');
    const certImage = document.getElementById('certImage');
    const certCaption = document.getElementById('certCaption');
    const certClose = document.querySelector('.cert-close');
    const certItems = document.querySelectorAll('.cert-card');

    if (certModal && certItems.length > 0) {
        certItems.forEach(item => {
            item.addEventListener('click', () => {
                const imgSrc = item.getAttribute('data-cert-img');
                const title = item.querySelector('h3').textContent;
                
                if (imgSrc) {
                    certModal.style.display = 'block';
                    certImage.src = imgSrc;
                    certCaption.textContent = title;
                    document.body.style.overflow = 'hidden'; // Prevent background scroll
                }
            });
        });

        const closeModal = () => {
            certModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scroll
        };

        if (certClose) {
            certClose.addEventListener('click', closeModal);
        }

        // Close on outside click
        window.addEventListener('click', (e) => {
            if (e.target === certModal) {
                closeModal();
            }
        });
        
        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && certModal.style.display === 'block') {
                closeModal();
            }
        });
    }

    // 11. Resume Modal Logic
    const resumeModal = document.getElementById('resumeModal');
    const resumeBtns = document.querySelectorAll('.open-resume-btn');
    const resumeClose = document.querySelector('.resume-close');

    if (resumeModal && resumeBtns.length > 0) {
        resumeBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                resumeModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        });

        const closeResumeModal = () => {
            resumeModal.style.display = 'none';
            document.body.style.overflow = 'auto'; 
        };

        if (resumeClose) {
            resumeClose.addEventListener('click', closeResumeModal);
        }

        window.addEventListener('click', (e) => {
            if (e.target === resumeModal) {
                closeResumeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && resumeModal.style.display === 'block') {
                closeResumeModal();
            }
        });
    }

    // 9. Number Counter Animation
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = +entry.target.getAttribute('data-target');
                const duration = 2000; // 2 seconds
                const step = target / (duration / 16); // approx 60fps
                
                let current = 0;
                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        entry.target.innerText = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        entry.target.innerText = target;
                    }
                };
                
                updateCounter();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // 10. 3D Tilt Effect for Cards
    const tiltCards = document.querySelectorAll('.project-card, .cert-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;  
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10; 
            const rotateY = ((x - centerX) / centerX) * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.transition = 'transform 0.5s ease-out, box-shadow 0.5s ease-out, border-color 0.3s ease';
            setTimeout(() => {
                card.style.transition = ''; 
            }, 500);
        });
        
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'transform 0.1s ease-out, box-shadow 0.1s ease-out';
            card.classList.add('tilt-card');
        });
    });
});
