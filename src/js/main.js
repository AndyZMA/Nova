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

    // Cerrar menú al hacer click en un link
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

 /* ======================================================
   ABOUT – TABS (FIXED)
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
      // Quitar active de todos
      aboutTabs.forEach(t => t.classList.remove("active"));

      // Activar el actual
      tab.classList.add("active");

      // Cambiar contenido
      const key = tab.dataset.tab;
      aboutText.innerHTML = aboutContent[key];
    });
  });
}

  /* ======================================================
     CURSOS – SLIDER (DESKTOP + MOBILE)
  ====================================================== */

  const track = document.getElementById("cursosTrack");
  const prevArrow = document.querySelector(".cursos-arrow.prev");
  const nextArrow = document.querySelector(".cursos-arrow.next");

  if (track && prevArrow && nextArrow) {

    const getScrollAmount = () => {
      const card = track.querySelector(".curso-card");
      return card ? card.offsetWidth + 40 : 0;
    };

    prevArrow.addEventListener("click", () => {
      track.scrollBy({
        left: -getScrollAmount(),
        behavior: "smooth"
      });
    });

    nextArrow.addEventListener("click", () => {
      track.scrollBy({
        left: getScrollAmount(),
        behavior: "smooth"
      });
    });

    /* ---- Auto scroll solo desktop ---- */

    let autoScroll;

    const startAutoScroll = () => {
      if (window.innerWidth > 900) {
        autoScroll = setInterval(() => {
          track.scrollBy({
            left: getScrollAmount(),
            behavior: "smooth"
          });
        }, 4500);
      }
    };

    const stopAutoScroll = () => {
      if (autoScroll) clearInterval(autoScroll);
    };

    track.addEventListener("mouseenter", stopAutoScroll);
    track.addEventListener("mouseleave", startAutoScroll);

    window.addEventListener("resize", () => {
      stopAutoScroll();
      startAutoScroll();
    });

    startAutoScroll();
  }

  /* ======================================================
     TOUCH / SWIPE SUPPORT (MOBILE)
  ====================================================== */

  if (track) {
    let startX = 0;
    let isDragging = false;

    track.addEventListener("touchstart", e => {
      startX = e.touches[0].clientX;
      isDragging = true;
    });

    track.addEventListener("touchmove", e => {
      if (!isDragging) return;
      const x = e.touches[0].clientX;
      const walk = startX - x;
      track.scrollLeft += walk;
      startX = x;
    });

    track.addEventListener("touchend", () => {
      isDragging = false;
    });
  }

});
