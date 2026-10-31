(() => {
  const root = document.documentElement;
  const themeColor = document.querySelector('meta[name="theme-color"]');

  function applyTheme(theme, save = false) {
    root.dataset.theme = theme;
    if (themeColor) themeColor.content = theme === 'dark' ? '#151d19' : '#f5f3ec';
    document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
      button.setAttribute('aria-pressed', String(theme === 'dark'));
      button.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
      button.querySelector('span').textContent = theme === 'dark' ? '☀' : '☾';
    });
    if (save) {
      try { localStorage.setItem('adi-theme', theme); } catch { /* Theme still works for this page. */ }
    }
  }

  applyTheme(root.dataset.theme === 'dark' ? 'dark' : 'light');
  document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
    button.addEventListener('click', () => {
      applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark', true);
    });
  });
})();
