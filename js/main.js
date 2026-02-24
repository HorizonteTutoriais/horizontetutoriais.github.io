/* ============================================================
   HORIZONTE TUTORIAIS — JavaScript Principal (CORRIGIDO)
   ============================================================ */

// Função global para abrir/fechar a pesquisa (chamada pelo onclick no HTML)
function toggleSearch(event) {
  if (event) event.stopPropagation();
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('search-input');
  
  if (searchForm) {
    searchForm.classList.toggle('active');
    if (searchForm.classList.contains('active') && searchInput) {
      setTimeout(() => searchInput.focus(), 100);
    }
  }
}

document.addEventListener('DOMContentLoaded', function () {

  /* ---- Menu Mobile ---- */
  const menuToggle = document.getElementById('menu-toggle');
  const navList    = document.getElementById('nav-list');
  if (menuToggle && navList) {
    menuToggle.addEventListener('click', function () {
      navList.classList.toggle('open');
    });
  }

  /* ---- Botão Carregar Mais ---- */
  const loadMoreBtn = document.getElementById('load-more-btn');
  const hiddenPosts = document.querySelectorAll('.app-card.hidden-post');
  if (loadMoreBtn && hiddenPosts.length > 0) {
    loadMoreBtn.addEventListener('click', function () {
      hiddenPosts.forEach(el => el.classList.remove('hidden-post'));
      loadMoreBtn.style.display = 'none';
    });
  }

  /* ---- Modo Noturno (Dark Mode) ---- */
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const body = document.body;

  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    if (darkModeToggle) darkModeToggle.textContent = '☀️';
  }

  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', function () {
      body.classList.toggle('dark-mode');
      const isDark = body.classList.contains('dark-mode');
      darkModeToggle.textContent = isDark ? '☀️' : '🌙';
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }

  /* ---- Barra de Pesquisa com Redirecionamento ---- */
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('search-input');

  if (searchForm && searchInput) {
    // Fechar ao clicar fora
    document.addEventListener('click', function (e) {
      const searchToggle = document.getElementById('search-toggle');
      if (!searchForm.contains(e.target) && e.target !== searchToggle) {
        searchForm.classList.remove('active');
      }
    });

    // Impedir que o clique dentro do form feche ele
    searchForm.addEventListener('click', e => e.stopPropagation());

    // Função de busca ao apertar Enter
    searchInput.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        const term = searchInput.value.toLowerCase().trim();
        if (!term) return;

        // Procura o app nos cards e redireciona
        const apps = document.querySelectorAll('[data-app-name]');
        let foundUrl = null;

        for (let app of apps) {
          const appName = app.getAttribute('data-app-name').toLowerCase();
          if (appName.includes(term) || term.includes(appName)) {
            foundUrl = app.getAttribute('data-app-url');
            break;
          }
        }

        if (foundUrl) {
          window.location.href = foundUrl;
        } else {
          alert('App não encontrado. Tente outro nome!');
        }
        
        searchForm.classList.remove('active');
        searchInput.value = '';
      }
    });
  }

});
