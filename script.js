// ==========================================
// MOBILE MENU TOGGLE
// ==========================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu when hamburger is clicked
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when a nav link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ==========================================
// SMOOTH SCROLLING FOR NAVIGATION LINKS
// ==========================================
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetSection.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// NAVBAR BACKGROUND ON SCROLL
// ==========================================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// ==========================================
// SKILL BARS ANIMATION ON SCROLL
// ==========================================
const skillsSection = document.querySelector('.skills');
const skillBars = document.querySelectorAll('.skill-progress');
let skillsAnimated = false;

function animateSkills() {
    if (!skillsAnimated) {
        skillBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            setTimeout(() => {
                bar.style.width = progress + '%';
            }, 100);
        });
        skillsAnimated = true;
    }
}

// Intersection Observer for skill bars animation
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
        }
    });
}, {
    threshold: 0.5
});

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// ==========================================
// FADE IN SECTIONS ON SCROLL
// ==========================================
const sections = document.querySelectorAll('section');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    sectionObserver.observe(section);
});

// Make hero section immediately visible
const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroSection.style.opacity = '1';
    heroSection.style.transform = 'translateY(0)';
}

// ==========================================
// EMAILJS INITIALIZATION
// ==========================================
(function() {
    emailjs.init('PLsZ3uWmPESD8O_K2'); // Replace with your public key
})();

// ==========================================
// CONTACT FORM HANDLING WITH EMAILJS
// ==========================================
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Basic validation
        if (name && email && message) {
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Prepare template parameters
            const templateParams = {
                from_name: name,
                from_email: email,
                message: message
            };
            
            // Send email using EmailJS
            emailjs.send('service_eh99coh', 'template_ss75hf7', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    
                    // Show success message
                    alert(`Thank you, ${name}! Your message has been sent successfully. I'll get back to you soon!`);
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Reset button
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                    
                }, function(error) {
                    console.log('FAILED...', error);
                    
                    // Show error message
                    alert('Oops! Something went wrong. Please try again or email me directly.');
                    
                    // Reset button
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                });
            
        } else {
            alert('Please fill in all fields before submitting.');
        }
    });
}

// ==========================================
// ACTIVE NAVIGATION LINK ON SCROLL
// ==========================================
window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 200)) {
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

// ==========================================
// PROJECT CARDS HOVER EFFECT ENHANCEMENT
// ==========================================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ==========================================
// TYPING EFFECT FOR HERO SUBTITLE (OPTIONAL)
// ==========================================
const heroSubtitle = document.querySelector('.hero-subtitle');
const subtitleText = heroSubtitle ? heroSubtitle.textContent : '';

function typeWriter(element, text, speed = 100) {
    element.textContent = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Uncomment the line below if you want the typing effect
// if (heroSubtitle) typeWriter(heroSubtitle, subtitleText, 80);

// ==========================================
// SCROLL TO TOP BUTTON (OPTIONAL)
// ==========================================
// Create scroll to top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.className = 'scroll-to-top';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--primary-color);
    color: white;
    border: none;
    font-size: 24px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
`;

document.body.appendChild(scrollTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
    }
});

// Scroll to top when button is clicked
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1)';
});

scrollTopBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
});

// ==========================================
// CONSOLE MESSAGE (FUN EASTER EGG)
// ==========================================
console.log('%c👋 Hello there, curious developer!', 'color: #ff6b35; font-size: 20px; font-weight: bold;');
console.log('%cI see you\'re checking out the console. Impressive!', 'color: #6b7280; font-size: 14px;');
console.log('%cFeel free to reach out if you want to chat about data science or web development!', 'color: #6b7280; font-size: 14px;');

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================
// Lazy load images when they come into view
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// ==========================================
// INITIALIZATION MESSAGE
// ==========================================
console.log('%c✅ Portfolio JavaScript Loaded Successfully!', 'color: #10b981; font-size: 16px; font-weight: bold;');
