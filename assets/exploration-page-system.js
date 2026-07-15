const nav = document.querySelector(".nav");
const hero = document.querySelector(".hero");

if (nav && hero && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    ([entry]) => nav.classList.toggle("nav-on-paper", !entry.isIntersecting),
    { threshold: 0 },
  );
  observer.observe(hero);
}
