// Get elements
const introScreen = document.getElementById("intro");
const revealScreen = document.getElementById("reveal");
const finaleScreen = document.getElementById("finale");
const startButton = document.getElementById("startButton");
const continueButton = document.getElementById("continueButton");
const particlesContainer = document.getElementById("particles");
const floatingHeartsContainer = document.getElementById("floatingHearts");
const finalMessage = document.getElementById("finalMessage");
const bgMusic = document.getElementById("bgMusic");

// Final message text
const messageText =
  "You are deeply loved.\n\nI hope this year brings you peace, joy, and magic.\n\nHappy Birthday ❤️";

// Initialize on page load
window.addEventListener("DOMContentLoaded", () => {
  createAmbientParticles();
});

// Create ambient particles
function createAmbientParticles() {
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 8 + "s";
    particle.style.animationDuration = Math.random() * 4 + 6 + "s";
    particlesContainer.appendChild(particle);
  }
}

// Transition between screens
function transitionToScreen(fromScreen, toScreen) {
  fromScreen.classList.remove("active");
  setTimeout(() => {
    toScreen.classList.add("active");
  }, 400);
}

// Typewriter effect
function typeWriter(text, element, speed = 80) {
  let i = 0;
  element.textContent = "";
  element.style.opacity = "1";

  function type() {
    if (i < text.length) {
      if (text.charAt(i) === "\n") {
        element.innerHTML += "<br>";
      } else {
        element.textContent += text.charAt(i);
      }
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Create floating hearts
function createFloatingHearts() {
  setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.textContent = "❤️";
    heart.style.left = Math.random() * 90 + 5 + "%";
    heart.style.fontSize = Math.random() * 15 + 20 + "px";
    heart.style.animationDuration = Math.random() * 2 + 4 + "s";
    heart.style.animationDelay = Math.random() * 1 + "s";
    floatingHeartsContainer.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 6000);
  }, 500);
}

// Add haptic feedback
function hapticFeedback() {
  if (window.navigator && window.navigator.vibrate) {
    window.navigator.vibrate(30);
  }
}

// Button: Start (Intro → Reveal)
startButton.addEventListener("click", () => {
  hapticFeedback();

  // Play background music (iOS requires user interaction)
  bgMusic.volume = 0.5;
  bgMusic.play().catch((err) => {
    console.log("Audio autoplay prevented:", err);
  });

  transitionToScreen(introScreen, revealScreen);

  // Start creating floating hearts
  setTimeout(() => {
    createFloatingHearts();
  }, 500);
});

// Prevent double-tap zoom on iOS
let lastTouchEnd = 0;
document.addEventListener(
  "touchend",
  (event) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  },
  false,
);

// Prevent pull-to-refresh
document.body.addEventListener(
  "touchmove",
  (e) => {
    if (e.touches.length > 1) {
      e.preventDefault();
    }
  },
  { passive: false },
);

// Log for debugging
console.log("✨ Birthday website loaded");
