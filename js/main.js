/* ============================================================
   HORIZONTE TUTORIAIS — JavaScript (RESTAURADO E CORRIGIDO)
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const body = document.body;
  const youtubeLink = "https://www.youtube.com/@horizontetutoriais1346";

  // 1. Função para aplicar o tema
  function setDarkTheme(isDark) {
    if (isDark) {
      body.classList.add('dark-mode');
      if (darkModeToggle) darkModeToggle.textContent = '☀️';
      localStorage.setItem('theme', 'dark');
    } else {
      body.classList.remove('dark-mode');
      if (darkModeToggle) darkModeToggle.textContent = '🌙';
      localStorage.setItem('theme', 'light');
    }
  }

  // 2. Inicializar tema salvo
  if (localStorage.getItem('theme') === 'dark') {
    setDarkTheme(true);
  }

  // 3. Listener do botão de modo noturno
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', function () {
      setDarkTheme(!body.classList.contains('dark-mode'));
    });
  }

  // 4. Atualizar links do YouTube (Apenas onde houver o ícone ou classe youtube)
  function updateYouTubeLinks() {
    const youtubeLinks = document.querySelectorAll('a[href*="youtube.com"], .social-btn.youtube, .fa-youtube');
    youtubeLinks.forEach(link => {
      if (link.tagName === 'A') {
        link.href = youtubeLink;
      } else {
        const parent = link.closest('a');
        if (parent) parent.href = youtubeLink;
      }
    });
  }

  updateYouTubeLinks();

  // 5. Barra de Pesquisa (Apenas se existir)
  const searchInput = document.getElementById('search-input-fixed');
  if (searchInput) {
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        const term = searchInput.value.toLowerCase().trim();
        if (term) alert('Pesquisando por: ' + term);
      }
    });
  }

});
