import {lockScroll, onFrame, reducedMotion, scrollToTarget, startScroll} from './scroll';

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

startScroll();

/* ---------- In-page anchors go through Lenis ---------- */
document.addEventListener('click', (e) => {
  const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href*="#"]');
  if (!a || a.origin !== location.origin || a.pathname !== location.pathname || !a.hash) return;
  const target = document.getElementById(decodeURIComponent(a.hash.slice(1)));
  if (!target) return;
  e.preventDefault();
  scrollToTarget(target);
  history.replaceState(null, '', a.hash);
});

/* ---------- Hero: the photo blurs, dims and pulls back as you scroll on ---------- */
const hero = document.querySelector<HTMLElement>('[data-hero]');
const stage = hero?.querySelector<HTMLElement>('[data-hero-stage]');
if (hero && stage && !reducedMotion()) {
  onFrame(() => {
    const r = hero.getBoundingClientRect();
    if (r.bottom < -50) return;
    const h = window.innerHeight;
    const p = clamp(-r.top / h);
    stage.style.transform = `translate3d(0, ${(p * h * 0.5).toFixed(1)}px, 0) scale(${(1 - p * 0.08).toFixed(4)})`;
    stage.style.filter = p > 0.01 ? `blur(${(p * 18).toFixed(1)}px) brightness(${(1 - p * 0.5).toFixed(3)})` : 'none';
  });
}

/* ---------- Reveals + the three panels ---------- */
const io = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      io.unobserve(entry.target);
    }),
  {rootMargin: '0px 0px -10% 0px', threshold: 0.01},
);
document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
const panelsIo = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      panelsIo.unobserve(entry.target);
    }),
  {threshold: 0.2},
);
document.querySelectorAll('.panels').forEach((el) => panelsIo.observe(el));

/* ---------- Menu: three slabs (ink, red, paper) wipe in from the right ---------- */
const menu = document.querySelector<HTMLElement>('[data-menu]');
const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
const toggleLabel = toggle?.querySelector<HTMLElement>('[data-menu-label]');
let menuOpen = false;

function setMenu(open: boolean) {
  if (!menu || !toggle) return;
  menuOpen = open;
  menu.classList.toggle('is-open', open);
  menu.inert = !open;
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  if (toggleLabel) toggleLabel.textContent = open ? 'Close' : 'Menu';
  document.documentElement.classList.toggle('menu-open', open);
  lockScroll(open);
  if (open) {
    window.setTimeout(() => menu.querySelector<HTMLElement>('.menu-link')?.focus({preventScroll: true}), 450);
  } else if (menu.contains(document.activeElement)) {
    toggle.focus();
  }
}

toggle?.addEventListener('click', () => setMenu(!menuOpen));
menu?.querySelectorAll('[data-menu-close]').forEach((el) => el.addEventListener('click', () => setMenu(false)));
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menuOpen) setMenu(false);
  // Keep Tab inside the open menu (plus its toggle).
  if (e.key === 'Tab' && menuOpen && menu && toggle) {
    const items = [toggle, ...menu.querySelectorAll<HTMLElement>('a[href]')];
    const i = items.indexOf(document.activeElement as HTMLElement);
    if (e.shiftKey && i <= 0) {
      e.preventDefault();
      items[items.length - 1].focus();
    } else if (!e.shiftKey && i === items.length - 1) {
      e.preventDefault();
      items[0].focus();
    }
  }
});
// Same-page links inside the menu close it first.
menu?.querySelectorAll<HTMLAnchorElement>('a[href]').forEach((a) =>
  a.addEventListener('click', () => {
    if (a.pathname === location.pathname) setMenu(false);
  }),
);

/* Hovering a menu item ripples it like heat shimmer off a hot engine — an SVG
   turbulence + displacement filter whose strength and phase move per frame. */
const turb = document.querySelector<SVGFETurbulenceElement>('#ripple feTurbulence');
const disp = document.querySelector<SVGFEDisplacementMapElement>('#ripple feDisplacementMap');
if (turb && disp && !reducedMotion()) {
  let active: HTMLElement | null = null;
  let raf = 0;
  let t = 0;
  let amp = 0;
  const loop = () => {
    t += 0.016;
    amp = Math.min(1, amp + 0.08);
    turb.setAttribute('baseFrequency', `${(0.012 + Math.sin(t * 2.1) * 0.004).toFixed(4)} ${(0.06 + Math.cos(t * 1.7) * 0.02).toFixed(4)}`);
    turb.setAttribute('seed', String(Math.floor(t * 12) % 50));
    disp.setAttribute('scale', (amp * 9).toFixed(2));
    raf = requestAnimationFrame(loop);
  };
  const start = (el: HTMLElement) => {
    active?.classList.remove('rippling');
    active = el;
    el.classList.add('rippling');
    amp = 0;
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(loop);
  };
  const stop = (el: HTMLElement) => {
    if (active !== el) return;
    el.classList.remove('rippling');
    active = null;
    cancelAnimationFrame(raf);
  };
  document.querySelectorAll<HTMLElement>('.menu-link').forEach((el) => {
    el.addEventListener('pointerenter', () => start(el));
    el.addEventListener('pointerleave', () => stop(el));
  });
}

/* ---------- Booking form → WhatsApp ---------- */
const form = document.querySelector<HTMLFormElement>('[data-booking]');
if (form) {
  const number = form.dataset.whatsapp!;
  // The build-time `min` goes stale on a static site; reset it to today.
  const dateInput = form.querySelector<HTMLInputElement>('input[type="date"]');
  if (dateInput) {
    const d = new Date();
    dateInput.min = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }
  const fields = [...form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('[name]')];
  const showError = (field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) => {
    const err = document.getElementById(`${field.id}-error`);
    const bad = !field.validity.valid;
    field.setAttribute('aria-invalid', String(bad));
    if (err) err.textContent = bad ? field.dataset.error || 'Please check this field.' : '';
    return !bad;
  };
  fields.forEach((f) => f.addEventListener('blur', () => f.value && showError(f)));
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const invalid = fields.filter((f) => !showError(f));
    if (invalid.length) {
      invalid[0].focus();
      return;
    }
    const v = (n: string) => (form.elements.namedItem(n) as HTMLInputElement | null)?.value.trim() ?? '';
    const date = v('date') ? new Date(`${v('date')}T00:00`).toLocaleDateString('en-ZA', {weekday: 'long', day: 'numeric', month: 'long'}) : '';
    const lines = [
      'Hi Harlequin Auto Repairs, I would like to book my car in.',
      '',
      `Name: ${v('name')}`,
      `Phone: ${v('phone')}`,
      `Vehicle: ${v('vehicle')}`,
      `Service: ${v('service')}`,
      date && `Preferred day: ${date}`,
      v('message') && `Details: ${v('message')}`,
    ].filter(Boolean) as string[];
    const url = `https://wa.me/${number}?text=${encodeURIComponent(lines.join('\n'))}`;
    const status = form.querySelector<HTMLElement>('[data-status]');
    if (status) status.textContent = 'Opening WhatsApp with your booking message. Just press send.';
    window.open(url, '_blank', 'noopener');
  });
}

/* ---------- Gallery lightbox ---------- */
const box = document.querySelector<HTMLDialogElement>('dialog.lightbox');
if (box) {
  const thumbs = [...document.querySelectorAll<HTMLButtonElement>('[data-lightbox]')];
  const img = box.querySelector<HTMLImageElement>('img')!;
  const cap = box.querySelector<HTMLElement>('figcaption')!;
  let index = 0;
  const show = (i: number) => {
    index = (i + thumbs.length) % thumbs.length;
    const t = thumbs[index];
    img.src = t.dataset.full!;
    img.alt = t.dataset.alt!;
    cap.textContent = t.dataset.caption!;
  };
  thumbs.forEach((t, i) =>
    t.addEventListener('click', () => {
      show(i);
      box.showModal();
      lockScroll(true);
    }),
  );
  box.addEventListener('close', () => {
    lockScroll(false);
    thumbs[index]?.focus();
  });
  box.querySelector('[data-prev]')?.addEventListener('click', () => show(index - 1));
  box.querySelector('[data-next]')?.addEventListener('click', () => show(index + 1));
  box.querySelector('[data-close]')?.addEventListener('click', () => box.close());
  box.addEventListener('click', (e) => e.target === box && box.close());
  box.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });
}

/* ---------- "Open now" badge ---------- */
document.querySelectorAll<HTMLElement>('[data-open-status]').forEach((el) => {
  // Johannesburg time, whatever the visitor's clock says.
  const now = new Date(new Date().toLocaleString('en-US', {timeZone: 'Africa/Johannesburg'}));
  const d = now.getDay();
  const m = now.getHours() * 60 + now.getMinutes();
  const open = (d >= 1 && d <= 5 && m >= 480 && m < 1020) || (d === 6 && m >= 480 && m < 720);
  el.textContent = open ? 'Open now' : 'Closed now';
  el.dataset.state = open ? 'open' : 'closed';
  el.hidden = false;
});
