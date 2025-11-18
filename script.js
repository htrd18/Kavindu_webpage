// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');

                // Animate skill bars when skill category becomes visible
                if (entry.target.classList.contains('skill-category')) {
                    const progressBars = entry.target.querySelectorAll('.skill-progress');
                    progressBars.forEach((bar, i) => {
                        setTimeout(() => {
                            const progress = bar.getAttribute('data-progress');
                            bar.style.width = progress + '%';
                        }, i * 100);
                    });
                }
            }, index * 100);
        }
    });
}, observerOptions);

// Observe all animated elements
const animatedElements = document.querySelectorAll(
    '.section-title, .card, .skill-category, .contact-item, .profile-card'
);

animatedElements.forEach(el => {
    observer.observe(el);
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        // Check if section is in viewport
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');

    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Mouse trail effect (optional - can be removed if too much)
document.addEventListener('mousemove', (e) => {
    const trail = document.createElement('div');
    trail.className = 'mouse-trail';
    trail.style.left = e.pageX + 'px';
    trail.style.top = e.pageY + 'px';

    document.body.appendChild(trail);

    setTimeout(() => {
        trail.remove();
    }, 500);
});

// Add cursor trail styling dynamically
const style = document.createElement('style');
style.textContent = `
    .mouse-trail {
        position: absolute;
        width: 5px;
        height: 5px;
        background: rgba(0, 212, 255, 0.5);
        border-radius: 50%;
        pointer-events: none;
        animation: fadeOut 0.5s forwards;
        z-index: 9999;
    }
    
    @keyframes fadeOut {
        to {
            opacity: 0;
            transform: scale(2);
        }
    }
    
    nav ul li a.active {
        background: rgba(0, 212, 255, 0.2);
        color: #00ffff;
    }
`;
document.head.appendChild(style);

// Counter animation for statistics (if needed in future)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Add typing effect to hero subtitle (optional)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Initialize typing effect on page load
window.addEventListener('load', () => {
    const subtitle = document.querySelector('.hero h2');
    if (subtitle) {
        const originalText = subtitle.textContent;
        setTimeout(() => {
            typeWriter(subtitle, originalText, 80);
        }, 1000);
    }
});

// Add scroll progress indicator
const scrollProgress = document.createElement('div');
scrollProgress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #00d4ff, #00ffff);
    z-index: 9999;
    transition: width 0.1s;
`;
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// Add fade-in animation for cards on scroll
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 150);
        }
    });
}, {
    threshold: 0.1
});

// Observe all cards
document.querySelectorAll('.card').forEach(card => {
    cardObserver.observe(card);
});

console.log('Portfolio website loaded successfully! 🚀');