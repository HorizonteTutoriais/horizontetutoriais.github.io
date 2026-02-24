document.addEventListener('DOMContentLoaded', function () {
  // --- MODO NOTURNO ---
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    if (darkModeToggle) darkModeToggle.textContent = '☀️';
  }
  if (darkModeToggle) {
    darkModeToggle.onclick = function() {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      darkModeToggle.textContent = isDark ? '☀️' : '🌙';
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    };
  }

  // --- PESQUISA COM REDIRECIONAMENTO ---
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-submit-btn');

  function performSearch() {
    const term = searchInput.value.toLowerCase().trim();
    if (!term) return;

    const apps = document.querySelectorAll('[data-app-name]');
    let found = false;
    apps.forEach(app => {
      if (!found && app.getAttribute('data-app-name').toLowerCase().includes(term)) {
        window.location.href = app.getAttribute('data-app-url');
        found = true;
      }
    });

    if (!found) alert('App não encontrado!');
  }

  if (searchBtn) searchBtn.onclick = performSearch;
  if (searchInput) {
    searchInput.onkeypress = function(e) {
      if (e.key === 'Enter') performSearch();
    };
  }
});
