/* ============================================================
   HORIZONTE TUTORIAIS — JavaScript Principal (GLOBAL)
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const body = document.body;

  // Função para aplicar o tema
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
    
    // Forçar tema em iframes (Cusdis)
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
      try {
        const doc = iframe.contentDocument || iframe.contentWindow.document;
        if (doc) {
          doc.body.classList.toggle('dark-mode', isDark);
          if (isDark) {
            doc.body.style.backgroundColor = '#1e1e1e';
            doc.body.style.color = '#e0e0e0';
          } else {
            doc.body.style.backgroundColor = '#fff';
            doc.body.style.color = '#333';
          }
        }
      } catch (e) {}
    });
  }

  // Inicializar tema
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    setDarkTheme(true);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && !savedTheme) {
    setDarkTheme(true);
  }

  // Listener do botão
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', function () {
      const isDark = !body.classList.contains('dark-mode');
      setDarkTheme(isDark);
    });
  }

  /* ---- Barra de Pesquisa ---- */
  const searchInput = document.getElementById('search-input-fixed');
  const searchBtn = document.getElementById('search-submit-fixed');

  if (searchBtn && searchInput) {
    searchBtn.onclick = function() {
      const term = searchInput.value.toLowerCase().trim();
      if (term) alert('Pesquisando por: ' + term);
    };
    searchInput.onkeypress = function(e) {
      if (e.key === 'Enter') searchBtn.onclick();
    };
  }
});
