(() => {
  let observer;
  const targetsSelector = '.project-card, .publication-card, .interest-row, .experience-list li, .background-card, .photo-card, .personal-card, .book-card, .topic-card, .run-entry, .note-panel, .place-feature, .case-brief, .case-sections article, .reading-note';

  function refresh() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    observer?.disconnect();
    const targets = document.querySelectorAll(targetsSelector);
    if (!targets.length) return;

    document.documentElement.classList.add('motion-ready');
    observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' });

    targets.forEach((target) => {
      const siblingIndex = Array.prototype.indexOf.call(target.parentElement.children, target);
      target.style.setProperty('--motion-delay', `${Math.min(siblingIndex, 3) * 65}ms`);
      target.classList.add('motion-reveal');
      observer.observe(target);
    });
  }

  window.AdiMotion = { refresh };
  refresh();
})();
