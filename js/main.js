document.addEventListener('DOMContentLoaded', function () {
  // --- MODO NOTURNO ---
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    if (darkModeToggle) darkModeToggle.textContent = '☀️';
  }
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', function() {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      darkModeToggle.textContent = isDark ? '☀️' : '🌙';
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }

  // --- PESQUISA (CORRIGIDA PARA ANDROID) ---
  const searchToggle = document.getElementById('search-toggle');
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('search-input');

  if (searchToggle && searchForm) {
    searchToggle.onclick = function(e) {
      e.preventDefault();
      e.stopPropagation();
      searchForm.classList.toggle('active');
      if (searchForm.classList.contains('active')) {
        setTimeout(() => searchInput.focus(), 100);
      }
    };

    // Fechar ao clicar fora
    document.addEventListener('click', function(e) {
      if (!searchForm.contains(e.target) && e.target !== searchToggle) {
        searchForm.classList.remove('active');
      }
    });
  }
});
