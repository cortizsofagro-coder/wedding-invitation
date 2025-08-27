// Inicializar AOS
document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 1000,
    once: true,
    easing: "ease-in-out",
  });

  // Inicializar contador regresivo
  initializeCountdown();

  // Smooth scrolling para enlaces de anclaje
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Ajustar para la navegación fija
        const offsetTop = targetElement.offsetTop - 80;

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // Menú móvil
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener("click", function () {
      navLinks.style.display =
        navLinks.style.display === "flex" ? "none" : "flex";
    });
  }
});

// Contador regresivo para la boda
function initializeCountdown() {
  const weddingDate = new Date("May 02, 2026 16:00:00").getTime();

  const countdown = setInterval(function () {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (document.getElementById("days")) {
      document.getElementById("days").innerText = days
        .toString()
        .padStart(2, "0");
    }
    if (document.getElementById("hours")) {
      document.getElementById("hours").innerText = hours
        .toString()
        .padStart(2, "0");
    }
    if (document.getElementById("minutes")) {
      document.getElementById("minutes").innerText = minutes
        .toString()
        .padStart(2, "0");
    }
    if (document.getElementById("seconds")) {
      document.getElementById("seconds").innerText = seconds
        .toString()
        .padStart(2, "0");
    }

    if (distance < 0) {
      clearInterval(countdown);
      const countdownElement = document.getElementById("countdown");
      if (countdownElement) {
        countdownElement.innerHTML = "¡La boda ha comenzado!";
      }
    }
  }, 1000);
}

// Cerrar menú móvil al hacer clic en un enlace
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", function () {
    const navLinks = document.querySelector(".nav-links");
    if (window.innerWidth < 768 && navLinks) {
      navLinks.style.display = "none";
    }
  });
});

// Cambiar estilo de navegación al hacer scroll
window.addEventListener("scroll", function () {
  const nav = document.querySelector(".nav");
  if (window.scrollY > 100) {
    nav.style.background = "rgba(255, 255, 255, 0.98)";
    nav.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
  } else {
    nav.style.background = "rgba(255, 255, 255, 0.95)";
    nav.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
  }
});

// Optimización de imágenes
function preloadImages() {
  const images = [
    "assets/images/hero-bg.jpg",
    "assets/images/photo1.jpg",
    "assets/images/photo2.jpg",
    "assets/images/photo3.jpg",
    "assets/images/photo4.jpg",
  ];

  images.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}

// Lazy loading para imágenes
if ("IntersectionObserver" in window) {
  const lazyImageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const lazyImage = entry.target;
        lazyImage.src = lazyImage.dataset.src;
        lazyImage.classList.remove("lazy");
        lazyImageObserver.unobserve(lazyImage);
      }
    });
  });

  document.querySelectorAll("img.lazy").forEach((lazyImage) => {
    lazyImageObserver.observe(lazyImage);
  });
}
