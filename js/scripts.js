// Particle.js Configuration
particlesJS("particles-js", {
    "particles": {
        "number": {
            "value": 400,  // Increase the number of particles
            "density": {
                "enable": true,
                "value_area": 1000  // Make sure particles are spread across the full area
            }
        },
        "color": {
            "value": "#ffffff"  // White dots for snow effect
        },
        "shape": {
            "type": "circle"
        },
        "opacity": {
            "value": 0.7,
            "random": true
        },
        "size": {
            "value": 3,
            "random": true
        },
        "line_linked": {
            "enable": false  // No connecting lines
        },
        "move": {
            "enable": true,
            "speed": 1,
            "direction": "bottom",  // Make particles move downward
            "random": true,
            "straight": false,
            "out_mode": "out",
            "bounce": false
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": false  // Disable hover effect
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            }
        }
    },
    "retina_detect": true
});

// Toggle menu function for mobile
function toggleMenu() {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('active');
}
