import Lenis from 'lenis';

/**
 * One rAF loop for the whole page. Lenis advances first, then every
 * scroll-driven piece reads its own rect and writes styles directly — nothing
 * re-renders while scrolling.
 */

type Tick = (time: number) => void;

const subscribers = new Set<Tick>();
let lenis: Lenis | null = null;
let started = false;

export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function startScroll() {
  if (started) return;
  started = true;
  if (!reducedMotion()) {
    lenis = new Lenis({lerp: 0.09, smoothWheel: true, wheelMultiplier: 0.9});
  }
  const loop = (time: number) => {
    lenis?.raf(time);
    subscribers.forEach((fn) => fn(time));
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
}

export function onFrame(fn: Tick): () => void {
  subscribers.add(fn);
  return () => {
    subscribers.delete(fn);
  };
}

export function lockScroll(locked: boolean) {
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  } else {
    document.documentElement.style.overflow = locked ? 'hidden' : '';
  }
}

/** Smooth-scrolls to an in-page target, moving focus there for keyboard users. */
export function scrollToTarget(el: HTMLElement) {
  if (lenis) lenis.scrollTo(el, {duration: 1.4, offset: -16});
  else el.scrollIntoView({behavior: reducedMotion() ? 'auto' : 'smooth'});
  if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
  el.focus({preventScroll: true});
}
