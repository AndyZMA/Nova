document.addEventListener("DOMContentLoaded", () => {

  /* ======================================================
     HEADER – SHOW / HIDE ON SCROLL
  ====================================================== */

  const header = document.querySelector(".site-header");
  let lastScroll = 0;

  if (header) {
    window.addEventListener("scroll", () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > lastScroll && currentScroll > 100) {
        header.classList.add("hide");
      } else {
        header.classList.remove("hide");
      }

      lastScroll = currentScroll;
    });
  }

  /* ======================================================
     BURGER MENU – MOBILE
  ====================================================== */

  const burger = document.getElementById("burgerBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  if (burger && mobileMenu) {
    burger.addEventListener("click", () => {
      burger.classList.toggle("active");
      mobileMenu.classList.toggle("active");
      document.body.classList.toggle("menu-open");
    });

    mobileMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        burger.classList.remove("active");
        mobileMenu.classList.remove("active");
        document.body.classList.remove("menu-open");
      });
    });
  }

  /* ======================================================
     ABOUT – TABS
  ====================================================== */

  const aboutText = document.getElementById("aboutText");
  const aboutTabs = document.querySelectorAll(".about-tabs .tab");

  const aboutContent = {
    significado: `
      Nova representa lo nuevo: el nacimiento de una estrella, el inicio de algo distinto.
      Aethereum remite a lo eterno, al conocimiento que trasciende el tiempo.
      Nova Aethereum nace de la unión entre lo nuevo y lo perdurable.
    `,
    mision: `
      Nuestra misión es formar personas críticas, curiosas y analíticas,
      mediante experiencias educativas profundas, humanas y rigurosas,
      que conecten conocimiento, cultura y pensamiento contemporáneo.
    `,
    aprendizaje: `
      Creemos en un aprendizaje interdisciplinario, acompañado y reflexivo,
      donde el conocimiento no se memoriza: se comprende, se cuestiona
      y se integra a la vida académica y personal.
    `
  };

  if (aboutTabs.length && aboutText) {
    aboutTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        aboutTabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        const key = tab.dataset.tab;
        aboutText.innerHTML = aboutContent[key];
      });
    });
  }

  /* ======================================================
     CURSOS – SLIDER (MOBILE + DESKTOP)
  ====================================================== */

  const track = document.getElementById("cursosTrack");
  const prevArrow = document.querySelector(".cursos-arrow.prev");
  const nextArrow = document.querySelector(".cursos-arrow.next");

  if (track && prevArrow && nextArrow) {

    const getScrollAmount = () => {
      const card = track.querySelector(".curso-card");
      if (!card) return 0;

      const gap = parseInt(getComputedStyle(track).gap) || 0;
      const cardsPerView = window.innerWidth > 900 ? 2 : 1;

      return (card.offsetWidth + gap) * cardsPerView;
    };

    prevArrow.addEventListener("click", () => {
      track.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
    });

    nextArrow.addEventListener("click", () => {
      track.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
    });

    /* ======================================================
       MOBILE SWIPE (SUAVE)
    ====================================================== */

    if (window.innerWidth <= 900) {
      let startX = 0;

      track.addEventListener("touchstart", e => {
        startX = e.touches[0].clientX;
      });

      track.addEventListener("touchend", e => {
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;

        if (Math.abs(diff) > 50) {
          track.scrollBy({
            left: diff > 0 ? track.offsetWidth : -track.offsetWidth,
            behavior: "smooth"
          });
        }
      });
    }
  }

  /* ======================================================
     SCROLL REVEAL – FADE
  ====================================================== */

  const animatedItems = document.querySelectorAll(".animate");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.25 }
  );

  animatedItems.forEach(el => observer.observe(el));

});
