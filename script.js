// Enhanced animations and interactions for the portfolio site

// Text typing animation for hero section
class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        // Current index of word
        const current = this.wordIndex % this.words.length;
        // Get full text of current word
        const fullTxt = this.words[current];

        // Check if deleting
        if (this.isDeleting) {
            // Remove char
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            // Add char
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // Insert txt into element
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        // Initial Type Speed
        let typeSpeed = 100;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        // If word is complete
        if (!this.isDeleting && this.txt === fullTxt) {
            // Make pause at end
            typeSpeed = this.wait;
            // Set delete to true
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            // Move to next word
            this.wordIndex++;
            // Pause before start typing
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Parallax scroll effect
function parallaxScroll() {
    const scrollY = window.pageYOffset;
    
    // Apply parallax to different elements
    document.querySelectorAll('.parallax').forEach(element => {
        const speed = element.getAttribute('data-speed') || 0.3;
        element.style.transform = `translateY(${scrollY * speed}px)`;
    });
}

// Animated counter for statistics
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const increment = target / 100;
    let current = 0;

    const updateCounter = () => {
        if (current < target) {
            current += increment;
            element.textContent = Math.ceil(current);
            setTimeout(updateCounter, 10);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
}

// Magnetic buttons effect
function setupMagneticButtons() {
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const btnRect = this.getBoundingClientRect();
            const btnX = btnRect.left + btnRect.width / 2;
            const btnY = btnRect.top + btnRect.height / 2;
            
            const moveX = (e.clientX - btnX) * 0.2;
            const moveY = (e.clientY - btnY) * 0.2;
            
            this.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// Gradient text animation
function setupGradientText() {
    const gradientTexts = document.querySelectorAll('.gradient-text');
    
    gradientTexts.forEach(text => {
        text.addEventListener('mouseover', function() {
            this.style.backgroundPosition = '100%';
        });
        
        text.addEventListener('mouseleave', function() {
            this.style.backgroundPosition = '0%';
        });
    });
}

// Reveal animation for sections
function revealSections() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const windowHeight = window.innerHeight;
        const revealTop = section.getBoundingClientRect().top;
        const revealPoint = 150;
        
        if (revealTop < windowHeight - revealPoint) {
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
    });
}

// Cursor effect
class GlowingCursor {
    constructor() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'cursor';
        document.body.appendChild(this.cursor);
        
        this.cursorTrail = document.createElement('div');
        this.cursorTrail.className = 'cursor-trail';
        document.body.appendChild(this.cursorTrail);
        
        this.bindEvents();
    }
    
    bindEvents() {
        document.addEventListener('mousemove', e => {
            this.cursor.style.left = `${e.clientX}px`;
            this.cursor.style.top = `${e.clientY}px`;
            
            setTimeout(() => {
                this.cursorTrail.style.left = `${e.clientX}px`;
                this.cursorTrail.style.top = `${e.clientY}px`;
            }, 100);
        });
        
        // Scale effect on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .btn, .project-card, .skill-tag');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.classList.add('cursor-grow');
            });
            
            el.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('cursor-grow');
            });
        });
    }
}

// Initialize all effects when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize typewriter effect
    const typeWriterElement = document.querySelector('.typewriter');
    if (typeWriterElement) {
        const words = typeWriterElement.getAttribute('data-words').split(',');
        const wait = typeWriterElement.getAttribute('data-wait');
        new TypeWriter(typeWriterElement, words, wait);
    }
    
    // Add parallax scrolling
    window.addEventListener('scroll', parallaxScroll);
    
    // Initialize counters
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        animateCounter(counter);
    });
    
    // Setup magnetic buttons
    setupMagneticButtons();
    
    // Setup gradient text hover effect
    setupGradientText();
    
    // Setup section reveal on scroll
    window.addEventListener('scroll', revealSections);
    
    // Initialize custom cursor
    if (window.innerWidth > 768) { // Only on desktop
        new GlowingCursor();
    }
    
    // Enhanced scroll-to-top button
    const scrollToTopBtn = document.querySelector('.scroll-top');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('active');
            } else {
                scrollToTopBtn.classList.remove('active');
            }
        });
        
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// Add 3D tilt effect to cards
if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll(".project-card, .skill-category, .social-item"), {
        max: 10,
        speed: 400,
        glare: true,
        "max-glare": 0.3
    });
}

// Contact Form Handling
function setupContactForms() {
    // For the dedicated contact page form submission
    const recruiterForm = document.getElementById('recruiterForm');
    const clientForm = document.getElementById('clientForm');
    const thankYouMessage = document.getElementById('thankYouMessage');
    
    // Form submission handler with enhanced animation effects
    const handleFormSubmit = (form) => {
        // Add animation to the form submission
        form.classList.add('submitting');
        
        // Show loading animation on button
        const submitBtn = form.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline-block';
        submitBtn.disabled = true;
        
        // Simulate form submission with a nice animation
        setTimeout(() => {
            // Create floating elements effect that move from form to thank you message
            const formBounds = form.getBoundingClientRect();
            const formCenter = {
                x: formBounds.left + formBounds.width / 2,
                y: formBounds.top + formBounds.height / 2
            };
            
            // Create particle effects
            for (let i = 0; i < 15; i++) {
                createSubmissionParticle(formCenter);
            }
            
            // Reset form
            form.reset();
            
            // Hide forms and show thank you message with delay
            setTimeout(() => {
                document.querySelectorAll('.contact-form-container').forEach(formContainer => {
                    formContainer.classList.remove('active');
                });
                thankYouMessage.style.display = 'block';
                thankYouMessage.classList.add('animate');
                
                // Remove animation classes
                form.classList.remove('submitting');
                btnText.style.display = 'inline-block';
                btnLoading.style.display = 'none';
                submitBtn.disabled = false;
            }, 500);
        }, 1500);
    };
    
    // Create animated particles for form submission
    function createSubmissionParticle(origin) {
        const particle = document.createElement('div');
        particle.className = 'submission-particle';
        
        // Random properties
        const size = Math.random() * 10 + 5;
        const angle = Math.random() * Math.PI * 2;
        const distance = 50 + Math.random() * 100;
        const duration = 1 + Math.random() * 1.5;
        const hue = Math.random() * 60 + 200; // Blue to purple range
        
        // Calculate end position
        const endX = origin.x + Math.cos(angle) * distance;
        const endY = origin.y + Math.sin(angle) * distance;
        
        // Set styles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${origin.x}px`;
        particle.style.top = `${origin.y}px`;
        particle.style.backgroundColor = `hsl(${hue}, 80%, 60%)`;
        particle.style.boxShadow = `0 0 ${size / 2}px hsl(${hue}, 80%, 60%)`;
        
        // Add to document
        document.body.appendChild(particle);
        
        // Animate
        setTimeout(() => {
            particle.style.transform = `translate(${endX - origin.x}px, ${endY - origin.y}px) scale(0)`;
            particle.style.opacity = '0';
        }, 10);
        
        // Remove after animation
        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    }
    
    if (recruiterForm) {
        recruiterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit(recruiterForm);
        });
    }
    
    if (clientForm) {
        clientForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit(clientForm);
        });
    }
    
    // Handle contact option selection
    const contactOptions = document.querySelectorAll('.contact-option');
    
    if (contactOptions.length > 0) {
        contactOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Remove active class from all options
                contactOptions.forEach(opt => opt.classList.remove('active'));
                
                // Add active class to clicked option
                this.classList.add('active');
                
                // Show the appropriate form
                const type = this.getAttribute('data-type');
                
                if (type === 'recruiter') {
                    document.getElementById('recruiter-form').classList.add('active');
                    document.getElementById('client-form').classList.remove('active');
                } else if (type === 'client') {
                    document.getElementById('client-form').classList.add('active');
                    document.getElementById('recruiter-form').classList.remove('active');
                }
            });
        });
    }
}

// Enhanced interactive background effects
function setupBackgroundEffects() {
    // Mouse position tracking for enhanced card effects
    document.addEventListener('mousemove', function(e) {
        document.documentElement.style.setProperty('--mouse-x', e.clientX + 'px');
        document.documentElement.style.setProperty('--mouse-y', e.clientY + 'px');
        
        // Add reactive glow to cursor position for card elements
        const cards = document.querySelectorAll('.project-card, .skill-card, .social-item');
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Only apply effect if cursor is near the card
            const maxDistance = 200;  // px
            const cardCenterX = rect.width / 2;
            const cardCenterY = rect.height / 2;
            const distance = Math.sqrt(
                Math.pow(x - cardCenterX, 2) + 
                Math.pow(y - cardCenterY, 2)
            );
            
            if (distance < maxDistance) {
                // Calculate intensity based on distance (closer = stronger)
                const intensity = 1 - (distance / maxDistance);
                
                // Apply glow effect
                card.style.boxShadow = `0 0 ${20 * intensity}px rgba(99, 179, 237, ${0.5 * intensity})`;
                
                // Add subtle transform for 3D effect
                if (card.classList.contains('tilt-effect')) {
                    const tiltX = (y - cardCenterY) / 10;
                    const tiltY = (x - cardCenterX) / -10;
                    card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
                    
                    // Also move inner elements for deeper 3D effect
                    const inner = card.querySelector('.tilt-inner');
                    if (inner) {
                        inner.style.transform = `translateZ(${40 * intensity}px)`;
                    }
                }
            } else {
                // Reset effects when cursor moves away
                card.style.boxShadow = '';
                if (card.classList.contains('tilt-effect')) {
                    card.style.transform = '';
                    const inner = card.querySelector('.tilt-inner');
                    if (inner) {
                        inner.style.transform = '';
                    }
                }
            }
        });
        
        // Interactive ML visualization elements
        const mlVisualContainer = document.querySelector('.ml-visual-container');
        if (mlVisualContainer) {
            const rect = mlVisualContainer.getBoundingClientRect();
            if (e.clientX >= rect.left && e.clientX <= rect.right && 
                e.clientY >= rect.top && e.clientY <= rect.bottom) {
                
                // Calculate relative position within the container
                const relX = (e.clientX - rect.left) / rect.width;
                const relY = (e.clientY - rect.top) / rect.height;
                
                // Make nodes react to cursor proximity
                const nodes = mlVisualContainer.querySelectorAll('.nn-node');
                nodes.forEach(node => {
                    const nodeRect = node.getBoundingClientRect();
                    const nodeX = (nodeRect.left + nodeRect.width/2 - rect.left) / rect.width;
                    const nodeY = (nodeRect.top + nodeRect.height/2 - rect.top) / rect.height;
                    
                    const distance = Math.sqrt(Math.pow(relX - nodeX, 2) + Math.pow(relY - nodeY, 2));
                    if (distance < 0.2) {
                        const intensity = 1 - (distance / 0.2);
                        node.style.transform = `scale(${1 + intensity * 0.5})`;
                        node.style.boxShadow = `0 0 ${10 * intensity}px var(--secondary)`;
                    } else {
                        node.style.transform = '';
                        node.style.boxShadow = '';
                    }
                });
                
                // Make data points react to cursor
                const dataPoints = mlVisualContainer.querySelectorAll('.data-point');
                dataPoints.forEach(point => {
                    const x = parseFloat(point.style.getPropertyValue('--x'))/100;
                    const y = parseFloat(point.style.getPropertyValue('--y'))/100;
                    
                    const distance = Math.sqrt(Math.pow(relX - x, 2) + Math.pow(relY - y, 2));
                    if (distance < 0.15) {
                        const intensity = 1 - (distance / 0.15);
                        point.style.transform = `scale(${1 + intensity * 1.5})`;
                        point.style.zIndex = '10';
                    } else {
                        point.style.transform = '';
                        point.style.zIndex = '';
                    }
                });
                
                // Make decision boundary shift slightly with mouse
                const boundary = mlVisualContainer.querySelector('.decision-boundary');
                if (boundary) {
                    const offsetX = (relX - 0.5) * 20; // Limit shift to 20px
                    const offsetY = (relY - 0.5) * 20;
                    boundary.style.marginLeft = `${offsetX}px`;
                    boundary.style.marginTop = `${offsetY}px`;
                }
            }
        }
    });
    
    // Create flying particles effect with enhanced visuals
    const createFlyingParticles = () => {
        const particle = document.createElement('div');
        particle.className = 'flying-particle';
        
        // Random position, size, and animation duration
        const size = Math.random() * 12 + 3;
        const posX = Math.random() * window.innerWidth;
        const posY = Math.random() * window.innerHeight;
        const animDuration = Math.random() * 15 + 8;
        
        // Add variety with different shapes
        if (Math.random() > 0.7) {
            particle.style.borderRadius = '2px';
            particle.style.transform = `rotate(${Math.random() * 360}deg)`;
        }
        
        // Set styles
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = posX + 'px';
        particle.style.top = posY + 'px';
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        particle.style.animationDuration = animDuration + 's';
        
        // Add particle to body
        document.body.appendChild(particle);
        
        // Remove particle after animation completes
        setTimeout(() => {
            particle.remove();
        }, animDuration * 1000);
    };
    
    // Create particles periodically with varying frequency based on scroll position
    let particleInterval = setInterval(createFlyingParticles, 3000);
    
    // Increase particle density when scrolling
    window.addEventListener('scroll', () => {
        // Create a burst of particles on scroll
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                createFlyingParticles();
            }, i * 100);
        }
    });
    
    // Initial particles
    for (let i = 0; i < 10; i++) {
        setTimeout(createFlyingParticles, i * 300);
    }
    
    // Setup interactive ML visualization connections
    setupMLConnections();
}

// Function to add interactive connections to ML visualization
function setupMLConnections() {
    const mlVisualContainer = document.querySelector('.ml-visual-container');
    if (!mlVisualContainer) return;
    
    // Create dynamic connections between neural network nodes
    const layers = mlVisualContainer.querySelectorAll('.nn-layer');
    for (let i = 0; i < layers.length - 1; i++) {
        const currentLayer = layers[i];
        const nextLayer = layers[i + 1];
        
        const currentNodes = currentLayer.querySelectorAll('.nn-node');
        const nextNodes = nextLayer.querySelectorAll('.nn-node');
        
        currentNodes.forEach(currentNode => {
            nextNodes.forEach(nextNode => {
                // Create connection element
                const connection = document.createElement('div');
                connection.className = 'nn-connection';
                
                // Set positioning based on nodes
                const containerRect = mlVisualContainer.getBoundingClientRect();
                const currentRect = currentNode.getBoundingClientRect();
                const nextRect = nextNode.getBoundingClientRect();
                
                const startX = currentRect.left + currentRect.width/2 - containerRect.left;
                const startY = currentRect.top + currentRect.height/2 - containerRect.top;
                const endX = nextRect.left + nextRect.width/2 - containerRect.left;
                const endY = nextRect.top + nextRect.height/2 - containerRect.top;
                
                const distance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
                const angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;
                
                // Apply styles
                connection.style.width = `${distance}px`;
                connection.style.left = `${startX}px`;
                connection.style.top = `${startY}px`;
                connection.style.transform = `rotate(${angle}deg)`;
                
                // Apply random animation delay for more natural feel
                connection.style.animationDelay = `${Math.random() * 2}s`;
                
                // Add to container
                mlVisualContainer.appendChild(connection);
            });
        });
    }
    
    // Add interactive hover effects for floating terms
    const terms = mlVisualContainer.querySelectorAll('.floating-term');
    terms.forEach(term => {
        term.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.4)';
            this.style.textShadow = '0 0 15px var(--accent)';
            this.style.zIndex = '100';
            
            // Make nearby data points pulse
            const termRect = this.getBoundingClientRect();
            const containerRect = mlVisualContainer.getBoundingClientRect();
            const termX = (termRect.left + termRect.width/2 - containerRect.left) / containerRect.width;
            const termY = (termRect.top + termRect.height/2 - containerRect.top) / containerRect.height;
            
            const dataPoints = mlVisualContainer.querySelectorAll('.data-point');
            dataPoints.forEach(point => {
                const x = parseFloat(point.style.getPropertyValue('--x'))/100;
                const y = parseFloat(point.style.getPropertyValue('--y'))/100;
                
                const distance = Math.sqrt(Math.pow(termX - x, 2) + Math.pow(termY - y, 2));
                if (distance < 0.3) {
                    point.style.animation = 'dataPointGlow 1s infinite alternate ease-in-out';
                }
            });
        });
        
        term.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.textShadow = '';
            this.style.zIndex = '';
            
            // Reset data point animations
            const dataPoints = mlVisualContainer.querySelectorAll('.data-point');
            dataPoints.forEach(point => {
                point.style.animation = `dataPointAppear 0.5s forwards ${point.style.getPropertyValue('--delay')}, 
                                        dataPointGlow 3s infinite alternate ease-in-out ${point.style.getPropertyValue('--delay')}`;
            });
        });
    });
}

// Initialize all new effects
document.addEventListener('DOMContentLoaded', function() {
    // Initialize contact forms
    setupContactForms();
    
    // Initialize enhanced background effects
    setupBackgroundEffects();
    
    // Apply tilt effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.classList.add('tilt-effect');
        const title = card.querySelector('h3');
        if (title) {
            title.classList.add('tilt-inner');
            title.classList.add('scramble-text');
        }
        
        // Add interactive shimmer effect on hover
        card.addEventListener('mouseenter', function() {
            const shimmer = document.createElement('div');
            shimmer.className = 'card-shimmer';
            this.appendChild(shimmer);
            
            setTimeout(() => {
                shimmer.style.left = '120%';
            }, 10);
            
            setTimeout(() => {
                shimmer.remove();
            }, 600);
        });
    });
    
    // Add text scramble effect on specific elements
    const scrambleTextElements = document.querySelectorAll('.scramble-text');
    if (scrambleTextElements.length > 0) {
        scrambleTextElements.forEach(element => {
            const originalText = element.textContent;
            
            element.addEventListener('mouseenter', function() {
                let iteration = 0;
                const scrambleInterval = setInterval(() => {
                    element.textContent = originalText
                        .split("")
                        .map((letter, index) => {
                            if (index < iteration) {
                                return originalText[index];
                            }
                            return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
                        })
                        .join("");
                    
                    if (iteration >= originalText.length) {
                        clearInterval(scrambleInterval);
                    }
                    
                    iteration += 1 / 3;
                }, 30);
            });
            
            element.addEventListener('mouseleave', function() {
                element.textContent = originalText;
            });
        });
    }
    
    // Add extra visual effects to social media links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            // Create pulse effect
            const pulse = document.createElement('div');
            pulse.className = 'social-pulse';
            this.appendChild(pulse);
            
            setTimeout(() => {
                pulse.remove();
            }, 500);
        });
    });
    
    // Create interactive hover effects for skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            // Randomly offset other tags slightly when one is hovered
            skillTags.forEach(otherTag => {
                if (otherTag !== tag) {
                    const offsetX = (Math.random() - 0.5) * 10;
                    const offsetY = (Math.random() - 0.5) * 10;
                    const rotate = (Math.random() - 0.5) * 5;
                    
                    otherTag.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(${rotate}deg)`;
                }
            });
        });
        
        tag.addEventListener('mouseleave', function() {
            // Reset other tags when hover ends
            skillTags.forEach(otherTag => {
                if (otherTag !== tag) {
                    otherTag.style.transform = '';
                }
            });
        });
    });
});