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

  // --- PESQUISA FUNCIONAL ---
  const searchToggle = document.getElementById('search-toggle');
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('search-input');

  if (searchToggle && searchForm) {
    searchToggle.onclick = function(e) {
      e.preventDefault();
      searchForm.classList.toggle('active');
      if (searchForm.classList.contains('active')) searchInput.focus();
    };

    // Função de busca ao digitar
    searchInput.onkeyup = function() {
      const term = searchInput.value.toLowerCase();
      const cards = document.querySelectorAll('.update-card, .post-list-item, .app-card');
      
      cards.forEach(card => {
        const title = card.innerText.toLowerCase();
        if (title.includes(term)) {
          card.style.display = "";
        } else {
          card.style.display = "none";
        }
      });
    };
  }
});
