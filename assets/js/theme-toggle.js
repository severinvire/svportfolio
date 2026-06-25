document.addEventListener('DOMContentLoaded', function() {
  const btn = document.getElementById('theme-toggle-btn');
  if (!btn) return; // safety guard

  const body = document.body;

  // Check stored preference, or fallback to system preference
  const stored = localStorage.getItem('darkMode');
  let isDark;

  if (stored !== null) {
    isDark = stored === 'true';
  } else {
    isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  // Apply initial state
  if (isDark) {
    body.classList.add('dark-mode');
    btn.textContent = 'Light';
  } else {
    btn.textContent = 'Dark';
  }

  // Toggle on click
  btn.addEventListener('click', function() {
    body.classList.toggle('dark-mode');
    const nowDark = body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', nowDark);
    btn.textContent = nowDark ? 'Light' : 'Dark';
  });

  // Listen for system changes (only if user hasn't manually overridden)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (localStorage.getItem('darkMode') === null) {
      const systemDark = e.matches;
      body.classList.toggle('dark-mode', systemDark);
      btn.textContent = systemDark ? 'Light' : 'Dark';
    }
  });
});