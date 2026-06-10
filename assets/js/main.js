// nav blur on scroll
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 30);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// equation strip stagger via transition-delay
document.querySelectorAll('#eqstrip .term').forEach((t, i) => {
  t.style.transitionDelay = (0.15 + i * 0.06) + 's';
});

// stagger children delays
document.querySelectorAll('.stagger').forEach(g => {
  [...g.children].forEach((c, i) => (c.style.transitionDelay = i * 0.09 + 's'));
});

// reveal observer
const io = new IntersectionObserver(
  es => {
    es.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.14, rootMargin: '0px 0px -7% 0px' }
);
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// hero reveals immediately (above the fold) + equation terms
function revealHero() {
  document.querySelectorAll('#top .reveal').forEach(el => el.classList.add('in'));
  document.querySelectorAll('#eqstrip .term').forEach(el => el.classList.add('in'));
}
requestAnimationFrame(() => requestAnimationFrame(revealHero));
window.addEventListener('load', revealHero);

// safety net: force-resolve visibility (covers paused/backgrounded contexts)
function force(el) {
  el.style.transition = 'none';
  el.style.opacity = '1';
  el.style.transform = 'none';
}
setTimeout(() => {
  document.querySelectorAll('#top .reveal, #eqstrip .term').forEach(force);
}, 1800);
setTimeout(() => {
  document.querySelectorAll('.reveal, .eqstrip .term, .stagger>*').forEach(force);
}, 6000);
