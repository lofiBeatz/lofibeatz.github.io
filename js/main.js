// =======================
// Lofi Beatz Main JS
// =======================

document.addEventListener("DOMContentLoaded", () => {
  
  // =======================
  // Helper Functions
  // =======================
  const selectAll = (selector) => document.querySelectorAll(selector);
  const select = (selector) => document.querySelector(selector);

  // =======================
  // Navigation
  // =======================
  const navLinks = selectAll("header nav a");
  const currentPath = window.location.pathname.split("/").pop();

  navLinks.forEach(link => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("active");
    }
    
    // Smooth scroll for internal anchors
    if (link.getAttribute("href").startsWith("#")) {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = select(link.getAttribute("href"));
        if (target) target.scrollIntoView({ behavior: "smooth" });
      });
    }
  });

  // =======================
  // Hero Section Animation
  // =======================
  const hero = select(".hero");
  if (hero) {
    const heroText = hero.querySelector("h2");
    heroText.style.opacity = 0;
    heroText.style.transform = "translateY(20px)";
    setTimeout(() => {
      heroText.style.transition = "all 1s ease";
      heroText.style.opacity = 1;
      heroText.style.transform = "translateY(0)";
    }, 300);
  }

  // =======================
  // Beat Grid Functionality
  // =======================
  const beats = selectAll(".beat-card audio");
  let currentAudio = null;

  beats.forEach(audio => {
    audio.addEventListener("play", () => {
      if (currentAudio && currentAudio !== audio) {
        currentAudio.pause();
      }
      currentAudio = audio;
    });
  });

  // Highlight currently playing beat card
  beats.forEach(audio => {
    audio.addEventListener("play", () => {
      beats.forEach(a => a.closest(".beat-card").classList.remove("playing"));
      audio.closest(".beat-card").classList.add("playing");
    });
    audio.addEventListener("pause", () => {
      audio.closest(".beat-card").classList.remove("playing");
    });
  });

  // =======================
  // YouTube Grid Modal
  // =======================
  const youtubeCards = selectAll(".youtube-card");
  youtubeCards.forEach(card => {
    card.addEventListener("click", () => {
      const videoURL = card.querySelector("a")?.href;
      if (!videoURL) return;

      // Create modal
      const modal = document.createElement("div");
      modal.classList.add("modal");
      modal.innerHTML = `
        <div class="modal-content">
          <span class="modal-close">&times;</span>
          <iframe width="800" height="450" src="${videoURL.replace("watch?v=", "embed/")}" frameborder="0" allowfullscreen></iframe>
        </div>
      `;
      document.body.appendChild(modal);

      // Close modal
      modal.querySelector(".modal-close").addEventListener("click", () => {
        modal.remove();
      });

      // Click outside to close
      modal.addEventListener("click", e => {
        if (e.target === modal) modal.remove();
      });
    });
  });

  // =======================
  // Beat and YouTube Card Hover Effect
  // =======================
  const cards = selectAll(".beat-card, .youtube-card");
  cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "scale(1.03)";
      card.style.transition = "transform 0.3s ease";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "scale(1)";
    });
  });

  // =======================
  // Contact Form Validation
  // =======================
  const contactForm = select("form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = select("#name").value.trim();
      const email = select("#email").value.trim();
      const message = select("#message").value.trim();

      if (!name || !email || !message) {
        alert("Please fill out all fields.");
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      // Placeholder for actual submission
      alert("Thank you! Your message has been sent.");
      contactForm.reset();
    });
  }

  // =======================
  // Optional Button Click Logging
  // =======================
  const btns = selectAll(".btn");
  btns.forEach(btn => {
    btn.addEventListener("click", () => {
      console.log(`Button clicked: ${btn.textContent}`);
    });
  });

});
