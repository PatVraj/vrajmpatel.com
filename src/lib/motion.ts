const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const running = new Set<Animation>();

export function reveal(element: HTMLElement, distance = 14) {
  if (reducedMotion.matches || typeof element.animate !== "function" || element.contains(document.activeElement)) return;
  const animation = element.animate(
    [{ opacity: 0.35, transform: `translateY(${distance}px)` }, { opacity: 1, transform: "translateY(0)" }],
    { duration: 620, easing: "cubic-bezier(.22, 1, .36, 1)" },
  );
  running.add(animation);
  animation.finished.then(() => running.delete(animation), () => running.delete(animation));
}

const stop = () => { running.forEach(animation => animation.cancel()); running.clear(); };
reducedMotion.addEventListener("change", () => { if (reducedMotion.matches) stop(); });
window.addEventListener("beforeprint", stop);
document.addEventListener("focusin", (event) => {
  if (event.target instanceof HTMLElement) {
    for (let element: HTMLElement | null = event.target; element; element = element.parentElement) {
      element.getAnimations().forEach(animation => { if (running.has(animation)) animation.cancel(); });
    }
  }
});
