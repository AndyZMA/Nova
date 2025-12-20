
const burger = document.getElementById("burgerBtn");
const menu = document.getElementById("mobileMenu");

burger.addEventListener("click", () => {
  burger.classList.toggle("active");
  menu.classList.toggle("active");
});

/* Cerrar al hacer click en un link */
menu.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    burger.classList.remove("active");
    menu.classList.remove("active");
  });
});

let lastScroll = 0;
const header = document.querySelector(".site-header");

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;

  if (currentScroll <= 0) {
    header.classList.remove("hide");
    return;
  }

  if (currentScroll > lastScroll && !header.classList.contains("hide")) {
    // scroll hacia abajo
    header.classList.add("hide");
  } else if (
    currentScroll < lastScroll &&
    header.classList.contains("hide")
  ) {
    // scroll hacia arriba
    header.classList.remove("hide");
  }

  lastScroll = currentScroll;
});


  gsap.registerPlugin();

  const heroTl = gsap.timeline({
    defaults: { ease: "power2.out" }
  });

  heroTl
    .from(".hero-kicker", {
      opacity: 0,
      y: 20,
      duration: 0.6
    })
    .from(".hero-title", {
      opacity: 0,
      y: 30,
      duration: 0.8
    }, "-=0.3")
    .from(".hero-sub", {
      opacity: 0,
      y: 20,
      duration: 0.6
    }, "-=0.4")
    .from(".hero-cta", {
      opacity: 0,
      y: 12,
      duration: 0.5
    }, "-=0.3")
    .from(".hero-visual img", {
      opacity: 0,
      x: 60,
      scale: 0.98,
      filter: "blur(6px)",
      duration: 1.2
    }, "-=0.9");



  gsap.registerPlugin(ScrollTrigger);

  /* ANIMACIÓN ENTRADA ABOUT */
  gsap.from(".about-content > *", {
    scrollTrigger: {
      trigger: ".about",
      start: "top 70%"
    },
    opacity: 0,
    y: 24,
    stagger: 0.12,
    duration: 0.9,
    ease: "power2.out"
  });

  gsap.from(".about-visual img", {
    scrollTrigger: {
      trigger: ".about",
      start: "top 70%"
    },
    opacity: 0,
    x: -40,
    duration: 1.1,
    ease: "power2.out"
  });

  /* CONTENIDO DINÁMICO */
  const content = {
    significado: `
      Nova representa lo nuevo: el nacimiento de una estrella, el inicio de algo distinto.
      Aethereum remite a lo eterno, al conocimiento que trasciende el tiempo.
      Nova Aethereum nace de la unión entre lo nuevo y lo perdurable: una academia que se
      siente ancestral en su respeto por el conocimiento, pero que se manifiesta mediante
      metodologías, pensamiento y tecnologías contemporáneas.
    `,
    mision: `
      Nuestra misión es transformar la educación mediante experiencias de aprendizaje
      interdisciplinarias que desarrollen pensamiento crítico, cultura y crecimiento
      académico, profesional y humano, adaptadas a los desafíos del mundo actual.
    `,
    aprendizaje: `
      Creemos en un aprendizaje continuo, riguroso y humanista, que combina excelencia
      académica, metodologías experienciales y tecnología educativa para fomentar ciclos
      permanentes de formación a lo largo de la vida.
    `
  };

  const tabs = document.querySelectorAll(".about-tabs .tab");
  const text = document.getElementById("aboutText");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      gsap.to(text, {
        opacity: 0,
        y: 10,
        duration: 0.25,
        onComplete: () => {
          text.innerHTML = content[tab.dataset.tab];
          gsap.fromTo(
            text,
            { opacity: 0, y: -10 },
            { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
          );
        }
      });
    });
  });

/*MOADALIDADES */
 gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".modalidad-item").forEach((item) => {
    const direction = item.classList.contains("left") ? -40 : 40;

    gsap.from(item.querySelector(".modalidad-content"), {
      scrollTrigger: {
        trigger: item,
        start: "top 75%",
      },
      opacity: 0,
      x: direction,
      duration: 0.9,
      ease: "power2.out"
    });
  });

const track = document.querySelector('.cursos-grid');
const cards = document.querySelectorAll('.curso-card');

let index = 0;

function scrollToCard(i) {
  cards[i].scrollIntoView({
    behavior: 'smooth',
    inline: 'center'
  });
}

document.querySelector('.next').addEventListener('click', () => {
  index = Math.min(index + 1, cards.length - 1);
  scrollToCard(index);
});

document.querySelector('.prev').addEventListener('click', () => {
  index = Math.max(index - 1, 0);
  scrollToCard(index);
});

