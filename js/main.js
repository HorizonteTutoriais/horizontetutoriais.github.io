/* ============================================================
   HORIZONTE TUTORIAIS — JavaScript ULTRA (FORÇAMENTO GLOBAL)
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

    // Forçar em todos os elementos
    forceThemeOnAllElements(isDark);
  }

  // 2. Função para forçar tema em todos os elementos
  function forceThemeOnAllElements(isDark) {
    const allElements = document.querySelectorAll('*');
    allElements.forEach(el => {
      if (isDark) {
        // Remover cores de fundo branco
        if (el.style.backgroundColor === 'white' || 
            el.style.backgroundColor === '#fff' || 
            el.style.backgroundColor === '#ffffff') {
          el.style.backgroundColor = '#1e1e1e';
        }
        // Remover cores de texto preto
        if (el.style.color === 'black' || 
            el.style.color === '#000' || 
            el.style.color === '#000000') {
          el.style.color = '#e0e0e0';
        }
      }
    });

    // Forçar em iframes (Cusdis)
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
      try {
        const doc = iframe.contentDocument || iframe.contentWindow.document;
        if (doc) {
          if (isDark) {
            doc.body.style.backgroundColor = '#1e1e1e';
            doc.body.style.color = '#e0e0e0';
            doc.body.style.filter = 'invert(1) hue-rotate(180deg)';
          } else {
            doc.body.style.backgroundColor = '#fff';
            doc.body.style.color = '#333';
            doc.body.style.filter = 'none';
          }
        }
      } catch (e) {}
    });
  }

  // 3. Inicializar tema salvo
  if (localStorage.getItem('theme') === 'dark') {
    setDarkTheme(true);
  }

  // 4. Listener do botão de modo noturno
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', function () {
      setDarkTheme(!body.classList.contains('dark-mode'));
    });
  }

  // 5. Atualizar links do YouTube
  function updateYouTubeLinks() {
    const allLinks = document.querySelectorAll('a');
    allLinks.forEach(link => {
      if (link.href.includes('youtube.com') || link.classList.contains('youtube')) {
        link.href = youtubeLink;
      }
    });
  }

  updateYouTubeLinks();
  setTimeout(updateYouTubeLinks, 1000);

  // 6. Observador para novos elementos (para garantir que elementos dinâmicos também recebam o tema)
  const observer = new MutationObserver(function(mutations) {
    if (body.classList.contains('dark-mode')) {
      forceThemeOnAllElements(true);
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['style']
  });

  // 7. Barra de Pesquisa
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
