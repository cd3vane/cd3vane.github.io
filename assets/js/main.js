// Theme toggle — initial theme is set inline in <head> before first paint
const toggle = document.getElementById('theme-toggle');
if (toggle) {
  toggle.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('theme', next);
  });
}

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

// Scroll reveal
const revealables = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !reducedMotion) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }
  }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
  revealables.forEach((el) => observer.observe(el));
} else {
  revealables.forEach((el) => el.classList.add('is-visible'));
}

// Scramble-decode effect on section labels as they scroll into view
const GLYPHS = '█▓▒░<>/\\|#$%&@!?01';
function decode(el) {
  const target = el.dataset.decode || el.textContent;
  el.dataset.decode = target;
  let frame = 0;
  const total = Math.max(18, target.length * 1.5);
  const tick = () => {
    const progress = frame / total;
    const settled = Math.floor(target.length * progress);
    let out = target.slice(0, settled);
    for (let i = settled; i < target.length; i++) {
      out += target[i] === ' ' ? ' ' : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
    }
    el.textContent = out;
    if (frame++ < total) requestAnimationFrame(tick);
    else el.textContent = target;
  };
  tick();
}

const decodables = document.querySelectorAll('[data-decode], .section-label > span');
if ('IntersectionObserver' in window && !reducedMotion) {
  const decodeObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        decode(entry.target);
        decodeObserver.unobserve(entry.target);
      }
    }
  }, { threshold: 0.5 });
  decodables.forEach((el) => decodeObserver.observe(el));
}

// Occasional ambient glitch on the headline
const headline = document.querySelector('.glitch');
if (headline && !reducedMotion) {
  setInterval(() => {
    if (Math.random() < 0.4) {
      headline.classList.add('glitching');
      setTimeout(() => headline.classList.remove('glitching'), 500);
    }
  }, 6000);
}

// ── Hidden transmission ─────────────────────────────────────
// The footer cipher (ROT13) tells you the keyword. Type it anywhere.
const overlay = document.getElementById('access-granted');
if (overlay) {
  const KEYWORD = 'proof';
  let buffer = '';
  const close = () => { overlay.hidden = true; };

  document.addEventListener('keydown', (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const tag = (e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea') return;
    if (!overlay.hidden && e.key === 'Escape') return close();
    if (e.key.length !== 1) return;
    buffer = (buffer + e.key.toLowerCase()).slice(-KEYWORD.length);
    if (buffer === KEYWORD && overlay.hidden) {
      overlay.hidden = false;
      document.getElementById('access-close')?.focus();
    }
  });

  document.getElementById('access-close')?.addEventListener('click', close);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
}

// For the ones who open the console first
console.log(
  '%c▚ TRANSMISSION INTERCEPTED ▞\n' +
  '%cWell — the console. You and I are going to get along.\n' +
  'The footer speaks ROT13. It will give you a keyword.\n' +
  'Type it anywhere on the page.\n\n' +
  'devane.charles98@gmail.com',
  'color:#5cb8ff;font-family:monospace;font-size:14px;font-weight:bold',
  'color:#8194b5;font-family:monospace;font-size:12px'
);

// Footer year
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
