/* ============================================================
   HORIZONTE TUTORIAIS — JavaScript Principal (VERSÃO FINAL)
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

  // 4. Atualizar links do YouTube em todo o site
  function updateYouTubeLinks() {
    const allLinks = document.querySelectorAll('a');
    allLinks.forEach(link => {
      // Se o link contiver "youtube.com" ou se for um botão social do YouTube
      if (link.href.includes('youtube.com') || link.classList.contains('youtube')) {
        link.href = youtubeLink;
      }
    });
  }

  updateYouTubeLinks();
  // Rodar novamente após 1 segundo para garantir que pegou tudo
  setTimeout(updateYouTubeLinks, 1000);

  /* ---- Barra de Pesquisa ---- */
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
