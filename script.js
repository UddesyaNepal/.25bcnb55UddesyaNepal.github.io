// ===== SCROLL REVEAL ANIMATION =====
// Selects all elements with class "reveal"
const reveals = document.querySelectorAll('.reveal');

// Creates an observer that watches when elements enter the screen
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Adds a small delay between each element appearing
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.1 });

// Starts observing every reveal element
reveals.forEach(el => observer.observe(el));