// Birthday Website JavaScript - Interactive Elements

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations and interactions
    createConfetti();
    createFloatingHearts();
    setupSmoothScrolling();
    setupPhotoGallery();
    setupMessageAnimations();
    startBirthdayCelebration();
});

// Create animated confetti
function createConfetti() {
    const confettiContainer = document.querySelector('.confetti-container');
    const colors = ['#ff69b4', '#ffd700', '#ff1493', '#ffb6c1', '#dda0dd'];
    
    function createConfettiPiece() {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        // Random positioning and styling
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        confetti.style.animationDelay = Math.random() * 2 + 's';
        
        // Random shapes
        if (Math.random() > 0.5) {
            confetti.style.borderRadius = '50%';
        }
        
        confettiContainer.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, 5000);
    }
    
    // Create confetti continuously
    function startConfetti() {
        createConfettiPiece();
        setTimeout(startConfetti, Math.random() * 500 + 300);
    }
    
    startConfetti();
}

// Create floating hearts animation
function createFloatingHearts() {
    const heartsContainer = document.querySelector('.floating-hearts');
    const heartEmojis = ['💖', '💕', '💗', '💝', '💘', '💞'];
    
    function createFloatingHeart() {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        
        // Random positioning
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 2 + 3) + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';
        
        heartsContainer.appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 6000);
    }
    
    // Create hearts continuously
    function startHearts() {
        createFloatingHeart();
        setTimeout(startHearts, Math.random() * 2000 + 1500);
    }
    
    startHearts();
}

// Setup smooth scrolling
function setupSmoothScrolling() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const gallerySection = document.querySelector('.gallery-section');
            if (gallerySection) {
                gallerySection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    // Add smooth scrolling to any internal links
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
}

// Setup photo gallery interactions
function setupPhotoGallery() {
    const photoItems = document.querySelectorAll('.photo-item');
    
    photoItems.forEach((item, index) => {
        // Handle image loading
        const img = item.querySelector('.photo-image');
        if (img) {
            img.addEventListener('load', function() {
                // Image loaded successfully
                this.style.opacity = '1';
            });
            
            img.addEventListener('error', function() {
                // Image failed to load, show placeholder
                this.style.display = 'none';
                const placeholder = this.parentElement;
                placeholder.style.background = getRandomGradient(index);
                placeholder.querySelector('::after')?.style.setProperty('display', 'block');
            });
        }
        
        // Add click interaction for photos
        item.addEventListener('click', function() {
            // Create click ripple effect
            const placeholder = this.querySelector('.photo-placeholder');
            if (placeholder) {
                placeholder.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    placeholder.style.transform = '';
                }, 300);
            }
            
            // Create sparkle effect
            createSparkleEffect(this);
            
            // Show photo details in a more pronounced way
            const overlay = this.querySelector('.photo-overlay');
            if (overlay) {
                overlay.style.opacity = '1';
                setTimeout(() => {
                    overlay.style.opacity = '';
                }, 2000);
            }
        });
        
        // Animate photos on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0) scale(1)';
                        
                        // Add a subtle entrance animation
                        entry.target.style.animation = 'photoEntrance 0.8s ease-out forwards';
                    }, index * 150);
                }
            });
        }, {
            threshold: 0.1
        });
        
        // Initial state for animation
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px) scale(0.95)';
        item.style.transition = 'all 0.6s ease-out';
        observer.observe(item);
    });
}

// Helper function to get random gradient for fallback
function getRandomGradient(index) {
    const gradients = [
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
        'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
        'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
        'linear-gradient(135deg, #ff8a80 0%, #ea80fc 100%)'
    ];
    return gradients[index % gradients.length];
}

// Create sparkle effect for photos
function createSparkleEffect(element) {
    const rect = element.getBoundingClientRect();
    const sparkles = ['✨', '⭐', '🌟', '💫', '🎆', '🎇'];
    
    for (let i = 0; i < 8; i++) {
        const sparkle = document.createElement('div');
        sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
        sparkle.style.position = 'fixed';
        sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
        sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
        sparkle.style.fontSize = Math.random() * 10 + 15 + 'px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '1000';
        sparkle.style.animation = 'sparkleFloat 1.5s ease-out forwards';
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 1500);
    }
}

// Setup message animations
function setupMessageAnimations() {
    const messageCards = document.querySelectorAll('.message-card');
    
    messageCards.forEach((card, index) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0) scale(1)';
                        
                        // Add entrance animation
                        entry.target.style.animation = 'messageEntrance 0.8s ease-out forwards';
                    }, index * 200);
                }
            });
        }, {
            threshold: 0.1
        });
        
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px) scale(0.9)';
        card.style.transition = 'all 0.8s ease-out';
        observer.observe(card);
        
        // Add hover effect with emoji animation
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.message-icon');
            if (icon) {
                icon.style.animation = 'iconBounce 0.6s ease';
                setTimeout(() => {
                    icon.style.animation = '';
                }, 600);
            }
        });
        
        // Add click effect for message cards
        card.addEventListener('click', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            // Create heart burst from the message
            createMessageHeartBurst(this);
        });
    });
    
    // Special quote animation
    const specialQuote = document.querySelector('.special-quote');
    if (specialQuote) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                    
                    // Add typewriter effect to the quote
                    const blockquote = entry.target.querySelector('blockquote');
                    if (blockquote && !blockquote.dataset.animated) {
                        blockquote.dataset.animated = 'true';
                        typewriterEffect(blockquote);
                    }
                }
            });
        }, {
            threshold: 0.1
        });
        
        specialQuote.style.opacity = '0';
        specialQuote.style.transform = 'translateY(50px) scale(0.95)';
        specialQuote.style.transition = 'all 1s ease-out';
        observer.observe(specialQuote);
    }
}

// Create heart burst effect for message cards
function createMessageHeartBurst(messageCard) {
    const rect = messageCard.getBoundingClientRect();
    const hearts = ['💖', '💕', '💗', '💝', '💘', '💞'];
    
    for (let i = 0; i < 5; i++) {
        const heart = document.createElement('div');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.position = 'fixed';
        heart.style.left = (rect.left + rect.width / 2) + 'px';
        heart.style.top = (rect.top + rect.height / 2) + 'px';
        heart.style.fontSize = '18px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1000';
        heart.style.animation = `messageHeartBurst 1.5s ease-out forwards`;
        heart.style.animationDelay = (i * 0.1) + 's';
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 1500);
    }
}

// Typewriter effect for special quote
function typewriterEffect(element) {
    const text = element.textContent;
    element.textContent = '';
    element.style.opacity = '1';
    
    let i = 0;
    function typeChar() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typeChar, 50);
        }
    }
    
    setTimeout(typeChar, 1000);
}

// Birthday celebration effects
function startBirthdayCelebration() {
    // Add click effect to balloons
    const balloons = document.querySelectorAll('.balloon');
    balloons.forEach(balloon => {
        balloon.addEventListener('click', function() {
            this.style.animation = 'none';
            this.style.transform = 'scale(1.5) rotate(15deg)';
            setTimeout(() => {
                this.style.animation = 'float 3s ease-in-out infinite';
                this.style.transform = '';
            }, 400);
            
            // Create balloon pop effect
            createBalloonPopEffect(this);
        });
    });
    
    // Add interactive footer hearts
    const footerHearts = document.querySelectorAll('.footer-hearts span');
    footerHearts.forEach(heart => {
        heart.addEventListener('click', function() {
            this.style.animation = 'none';
            this.style.transform = 'scale(2)';
            setTimeout(() => {
                this.style.animation = 'pulse 2s ease-in-out infinite';
                this.style.transform = '';
            }, 600);
            
            // Create heart burst effect
            createHeartBurst(this);
        });
    });
    
    // Add celebration trigger on title click
    const birthdayTitle = document.querySelector('.birthday-title');
    if (birthdayTitle) {
        birthdayTitle.addEventListener('click', function() {
            triggerCelebrationBurst();
        });
    }
}

// Create balloon pop effect
function createBalloonPopEffect(balloon) {
    const rect = balloon.getBoundingClientRect();
    const particles = ['🎊', '🎉', '✨', '🌟', '🎆', '🎇'];
    
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.textContent = particles[Math.floor(Math.random() * particles.length)];
        particle.style.position = 'fixed';
        particle.style.left = (rect.left + rect.width / 2) + 'px';
        particle.style.top = (rect.top + rect.height / 2) + 'px';
        particle.style.fontSize = '20px';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1000';
        
        const angle = (i * 30) * Math.PI / 180;
        const distance = 100 + Math.random() * 50;
        const endX = Math.cos(angle) * distance;
        const endY = Math.sin(angle) * distance;
        
        particle.style.animation = `balloonPop 1.2s ease-out forwards`;
        particle.style.setProperty('--endX', endX + 'px');
        particle.style.setProperty('--endY', endY + 'px');
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 1200);
    }
}

// Create heart burst effect
function createHeartBurst(heart) {
    const rect = heart.getBoundingClientRect();
    const hearts = ['💖', '💕', '💗', '💝', '💘', '💞'];
    
    for (let i = 0; i < 8; i++) {
        const burstHeart = document.createElement('div');
        burstHeart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        burstHeart.style.position = 'fixed';
        burstHeart.style.left = (rect.left + rect.width / 2) + 'px';
        burstHeart.style.top = (rect.top + rect.height / 2) + 'px';
        burstHeart.style.fontSize = '22px';
        burstHeart.style.pointerEvents = 'none';
        burstHeart.style.zIndex = '1000';
        burstHeart.style.animation = `heartBurst 2s ease-out forwards`;
        burstHeart.style.animationDelay = (i * 0.1) + 's';
        
        document.body.appendChild(burstHeart);
        
        setTimeout(() => {
            if (burstHeart.parentNode) {
                burstHeart.parentNode.removeChild(burstHeart);
            }
        }, 2000);
    }
}

// Celebration burst when title is clicked
function triggerCelebrationBurst() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const celebrationItems = ['🎉', '🎊', '🎂', '🎈', '✨', '🌟', '💖', '💕', '🥳'];
    
    for (let i = 0; i < 20; i++) {
        const item = document.createElement('div');
        item.textContent = celebrationItems[Math.floor(Math.random() * celebrationItems.length)];
        item.style.position = 'fixed';
        item.style.left = centerX + 'px';
        item.style.top = centerY + 'px';
        item.style.fontSize = '30px';
        item.style.pointerEvents = 'none';
        item.style.zIndex = '1000';
        
        const angle = (i * 18) * Math.PI / 180;
        const distance = 200 + Math.random() * 100;
        const endX = Math.cos(angle) * distance;
        const endY = Math.sin(angle) * distance;
        
        item.style.animation = `celebrationBurst 2s ease-out forwards`;
        item.style.setProperty('--endX', endX + 'px');
        item.style.setProperty('--endY', endY + 'px');
        
        document.body.appendChild(item);
        
        setTimeout(() => {
            if (item.parentNode) {
                item.parentNode.removeChild(item);
            }
        }, 2000);
    }
}

// Add additional animation styles
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes photoEntrance {
        from {
            opacity: 0;
            transform: translateY(30px) scale(0.95) rotateY(10deg);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1) rotateY(0deg);
        }
    }
    
    @keyframes messageEntrance {
        from {
            opacity: 0;
            transform: translateY(40px) scale(0.9) rotateX(10deg);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1) rotateX(0deg);
        }
    }
    
    @keyframes iconBounce {
        0%, 100% { transform: translateY(0) scale(1); }
        25% { transform: translateY(-10px) scale(1.1); }
        50% { transform: translateY(-15px) scale(1.2); }
        75% { transform: translateY(-5px) scale(1.1); }
    }
    
    @keyframes sparkleFloat {
        0% {
            opacity: 0;
            transform: translateY(0) scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: translateY(-30px) scale(1.2) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: translateY(-60px) scale(0.8) rotate(360deg);
        }
    }
    
    @keyframes balloonPop {
        0% {
            opacity: 1;
            transform: translate(0, 0) scale(1) rotate(0deg);
        }
        100% {
            opacity: 0;
            transform: translate(var(--endX), var(--endY)) scale(0.5) rotate(720deg);
        }
    }
    
    @keyframes heartBurst {
        0% {
            opacity: 1;
            transform: translate(0, 0) scale(1) rotate(0deg);
        }
        100% {
            opacity: 0;
            transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(1.5) rotate(360deg);
        }
    }
    
    @keyframes messageHeartBurst {
        0% {
            opacity: 1;
            transform: translate(0, 0) scale(1) rotate(0deg);
        }
        100% {
            opacity: 0;
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1.2) rotate(180deg);
        }
    }
    
    @keyframes celebrationBurst {
        0% {
            opacity: 1;
            transform: translate(0, 0) scale(1) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: translate(calc(var(--endX) * 0.7), calc(var(--endY) * 0.7)) scale(1.3) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: translate(var(--endX), var(--endY)) scale(0.8) rotate(360deg);
        }
    }
`;
document.head.appendChild(additionalStyles);

// Add some birthday music trigger (visual celebration)
function playBirthdaySound() {
    document.body.style.animation = 'celebrate 0.5s ease-in-out';
    setTimeout(() => {
        document.body.style.animation = '';
    }, 500);
}

// Add celebrate animation
const celebrateStyle = document.createElement('style');
celebrateStyle.textContent = `
    @keyframes celebrate {
        0%, 100% { transform: scale(1); filter: hue-rotate(0deg); }
        50% { transform: scale(1.01); filter: hue-rotate(10deg); }
    }
`;
document.head.appendChild(celebrateStyle);