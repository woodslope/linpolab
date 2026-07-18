const nav = document.querySelector(".nav");
const hero = document.querySelector(".hero");

if (nav && hero && "IntersectionObserver" in window) {
  const setPageChrome = (onPaper) => {
    nav.classList.toggle("nav-on-paper", onPaper);
    document.documentElement.classList.toggle("page-on-paper", onPaper);
  };
  const observer = new IntersectionObserver(
    ([entry]) => setPageChrome(!entry.isIntersecting),
    { threshold: 0, rootMargin: `-${nav.offsetHeight}px 0px 0px 0px` },
  );
  observer.observe(hero);
}
