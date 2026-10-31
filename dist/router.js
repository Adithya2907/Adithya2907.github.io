(() => {
  const routePaths = new Set(['/', '/index.html', '/elsewhere.html']);
  let activeRequest;
  let currentPath = window.location.pathname;
  let currentSearch = window.location.search;

  function isClientRoute(url) {
    return url.origin === window.location.origin && routePaths.has(url.pathname);
  }

  function updatePage(html) {
    const nextDocument = new DOMParser().parseFromString(html, 'text/html');
    document.body.className = nextDocument.body.className;
    document.body.replaceChildren(...nextDocument.body.childNodes);
    document.title = nextDocument.title;
    currentPath = window.location.pathname;
    currentSearch = window.location.search;

    const nextDescription = nextDocument.querySelector('meta[name="description"]')?.content;
    const description = document.querySelector('meta[name="description"]');
    if (description && nextDescription) description.content = nextDescription;

    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.content = document.documentElement.dataset.theme === 'dark' ? '#151d19' : '#f5f3ec';
    window.AdiMotion?.refresh();
  }

  async function navigate(url, { addHistory = true, scrollY = 0 } = {}) {
    activeRequest?.abort();
    const request = new AbortController();
    activeRequest = request;

    try {
      const response = await fetch(`${url.pathname}${url.search}`, { signal: request.signal });
      if (!response.ok) throw new Error(`Page request returned ${response.status}`);
      const html = await response.text();
      if (activeRequest !== request) return;

      if (addHistory) {
        const currentState = history.state && typeof history.state === 'object' ? history.state : {};
        history.replaceState({ ...currentState, scrollY: window.scrollY }, '', window.location.href);
        history.pushState({ scrollY: 0 }, '', url.href);
      }

      const render = () => updatePage(html);
      if (document.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        await document.startViewTransition(render).updateCallbackDone;
      } else {
        render();
      }

      const main = document.querySelector('main');
      if (main) {
        main.tabIndex = -1;
        main.focus({ preventScroll: true });
      }

      if (url.hash) {
        const destination = document.getElementById(decodeURIComponent(url.hash.slice(1)));
        destination?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: scrollY, behavior: 'auto' });
      }
    } catch (error) {
      if (error.name === 'AbortError') return;
      if (addHistory) window.location.assign(url.href);
      else window.location.reload();
    } finally {
      if (activeRequest === request) activeRequest = undefined;
    }
  }

  document.addEventListener('click', (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target instanceof Element ? event.target.closest('a[href]') : null;
    if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self') || link.relList.contains('external')) return;

    const url = new URL(link.href, window.location.href);
    if (!isClientRoute(url) || (url.pathname === currentPath && url.search === currentSearch)) return;

    event.preventDefault();
    navigate(url);
  });

  window.addEventListener('popstate', (event) => {
    const url = new URL(window.location.href);
    if (!isClientRoute(url) || (url.pathname === currentPath && url.search === currentSearch)) return;
    navigate(url, { addHistory: false, scrollY: event.state?.scrollY || 0 });
  });

  if (history.state === null) history.replaceState({ scrollY: window.scrollY }, '', window.location.href);
})();
