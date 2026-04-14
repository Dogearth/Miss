const messages = [
    "I still think about him all the time, even now.",
    "It's almost been five years, yet I still can't forget him.",
    "No matter what I do, he never leaves my mind.",
    "I once believed time would slowly fade these feelings.",
    "But instead, they’ve only grown stronger with time.",
    "Maybe it’s because I truly loved him so deeply.",
    "Everything fell apart because of me, and I know he won’t come back.",
    "Even so, my heart still longs only for him.",
    "Even now… I still love him, and I miss him more than I can bear. 💔"
];

const container = document.getElementById("text-container");
let currentIndex = 0;

// Render all text elements dynamically first
messages.forEach(text => {
    const el = document.createElement("div");
    el.className = "text-line";
    el.innerText = text;
    container.appendChild(el);
});

const lines = document.querySelectorAll('.text-line');

// This function dynamically shifts the text-container to keep visible lines beautifully centered inside the glass container
function updateScroll() {
    // Determine which lines are actively visible (not fading out)
    const visibleLines = Array.from(lines).filter(line => 
        line.classList.contains('visible') && !line.classList.contains('fade-out')
    );
    
    if (visibleLines.length === 0) return;
    
    // Find the total vertical bounds of the visible text
    const topY = visibleLines[0].offsetTop;
    const bottomY = visibleLines[visibleLines.length - 1].offsetTop + visibleLines[visibleLines.length - 1].offsetHeight;
    
    // Calculate the center relative to the text-container element itself
    const center = (topY + bottomY) / 2;
    
    // The #text-container has `top: 50%;`. 
    // Translating by -center logically aligns the dynamic text bounding box perfectly in the middle.
    container.style.transform = `translateY(-${center}px)`;
}

function showNextLine() {
    if (currentIndex < lines.length) {
        // Fade in the target line
        lines[currentIndex].classList.add("visible");
        
        // Fading rules as per requirements:
        // "When the 3rd line appears (i=2), line 1 (i=0) starts fading out."
        if (currentIndex >= 2) {
            const oldLine = lines[currentIndex - 2];
            oldLine.classList.remove("visible");
            oldLine.classList.add("fade-out");
        }
        
        // Ensure accurate vertical centering across the text container
        updateScroll();
        
        currentIndex++;
        setTimeout(showNextLine, 1500); // Trigger next line periodically (every 3.5 seconds)
    } else {
        // Complete the fade out sequence gracefully for the remaining lines
        setTimeout(() => {
            if (currentIndex - 2 < lines.length) {
                const oldLine1 = lines[currentIndex - 2];
                if(oldLine1) {
                    oldLine1.classList.remove("visible");
                    oldLine1.classList.add("fade-out");
                }
            }
            updateScroll();
            
            setTimeout(() => {
                if (currentIndex - 1 < lines.length) {
                    const oldLine2 = lines[currentIndex - 1];
                    if(oldLine2) {
                        oldLine2.classList.remove("visible");
                        oldLine2.classList.add("fade-out");
                    }
                }
                
                // Loop the messages
                setTimeout(() => {
                    // Instantly reset transitions and classes
                    lines.forEach(line => {
                        line.style.transition = 'none';
                        line.classList.remove("visible", "fade-out");
                    });
                    
                    container.style.transition = 'none';
                    container.style.transform = 'translateY(0)';
                    
                    // Force a layout reflow so the browser applies the instant resets
                    void container.offsetWidth;
                    
                    // Restore CSS transitions
                    lines.forEach(line => line.style.transition = '');
                    container.style.transition = '';
                    
                    // Restart from the beginning
                    currentIndex = 0;
                    setTimeout(showNextLine, 1000);
                }, 2000); // Let the final transition complete
                
            }, 1500);
            
        }, 1500);
    }
}

// Render atmospheric background particles
function createParticles() {
    const particlesContainer = document.getElementById("particles-container");
    const particleCount = 40;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.className = "particle";
        
        // Randomized dimensions
        const size = Math.random() * 3 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Randomized horizontal placement
        particle.style.left = `${Math.random() * 100}vw`;
        
        // Randomized timing
        const duration = Math.random() * 15 + 12; // 12-27 seconds to float up
        particle.style.animationDuration = `${duration}s`;
        
        const delay = Math.random() * 15;
        particle.style.animationDelay = `${delay}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// Document Load Init
window.onload = () => {
    createParticles();
    // Brief cinematic delay before starting the narrative
    setTimeout(showNextLine, 1000);
};
