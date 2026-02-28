/* ============================================================
   HORIZONTE TUTORIAIS — JavaScript Principal (BLINDADO v4)
   Busca Global com URLs Completas Baseadas no Domínio
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---- Detectar o domínio base do site ---- */
  function getBaseUrl() {
    const protocol = window.location.protocol; // http: ou https:
    const hostname = window.location.hostname; // tutoriais.github.io
    const pathname = window.location.pathname; // /tutoriais.github.io/ ou /
    
    // Extrai a base do pathname (tudo antes do primeiro arquivo)
    let basePath = '/';
    const pathParts = pathname.split('/').filter(p => p);
    
    // Se houver mais de uma parte no caminho, a primeira é o repositório
    if (pathParts.length > 0 && !pathname.includes('.html')) {
      basePath = '/' + pathParts[0] + '/';
    } else if (pathParts.length > 1) {
      basePath = '/' + pathParts[0] + '/';
    }
    
    return protocol + '//' + hostname + basePath;
  }

  /* ---- ÍNDICE GLOBAL DE APLICATIVOS E JOGOS (INTEGRADO) ---- */
  const SEARCH_INDEX = [
    // Aplicativos - usando caminhos relativos à raiz
    { nome: "Horizon Clicker", path: "posts/aplicativos/horizon-clicker-FINAL-CORRIGIDO.html", aliases: ["horizon", "clicker", "automação"] },
    // Jogos - usando caminhos relativos à raiz
    { nome: "Resident Evil 4 Mobile Edition", path: "posts/jogos/resident-evil-4-FINAL-CORRIGIDO.html", aliases: ["resident", "evil", "re4", "resident evil 4", "resident evil", "horror"] }
  ];

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

  /* ---- Barra de Pesquisa BLINDADA v4 (Sempre Visível) ---- */
  const searchInput = document.getElementById('search-input-fixed');
  const searchBtn = document.getElementById('search-submit-fixed');

  function performSearch() {
    const term = searchInput.value.toLowerCase().trim();
    if (!term) {
      alert('Digite algo para buscar!');
      return;
    }

    let foundPath = null;

    // Busca no índice global integrado
    for (let item of SEARCH_INDEX) {
      const itemName = item.nome.toLowerCase();
      
      // Verifica se o termo está no nome
      if (itemName.includes(term) || term.includes(itemName)) {
        foundPath = item.path;
        break;
      }
      
      // Verifica se o termo está nos aliases
      if (item.aliases) {
        for (let alias of item.aliases) {
          if (alias.includes(term) || term.includes(alias)) {
            foundPath = item.path;
            break;
          }
        }
      }
      
      if (foundPath) break;
    }

    // Se não encontrou no índice, tenta procurar nos cards visíveis da página
    if (!foundPath) {
      const apps = document.querySelectorAll('[data-app-name]');
      for (let app of apps) {
        const appName = app.getAttribute('data-app-name').toLowerCase();
        if (appName.includes(term) || term.includes(appName)) {
          foundPath = app.getAttribute('data-app-url');
          break;
        }
      }
    }

    if (foundPath) {
      // Constrói a URL completa baseada no domínio atual
      const baseUrl = getBaseUrl();
      const fullUrl = baseUrl + foundPath;
      window.location.href = fullUrl;
    } else {
      alert('App não encontrado. Tente: "Horizon Clicker" ou "Resident Evil 4"');
    }
    searchInput.value = '';
  }

  if (searchBtn) {
    searchBtn.onclick = performSearch;
  }
  if (searchInput) {
    searchInput.onkeypress = function(e) {
      if (e.key === 'Enter') {
        performSearch();
      }
    };
  }

  /* ---- Sistema de Comentários via E-mail (Formspree) ---- */
  const commentForm = document.getElementById('direct-comment-form');
  const formStatus = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');

  if (commentForm) {
    commentForm.addEventListener('submit', function(e) {
      e.preventDefault();

      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando...';
      
      formStatus.className = 'form-status';
      formStatus.textContent = '';

      const formData = new FormData(commentForm);
      
      fetch(commentForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          formStatus.className = 'form-status success';
          formStatus.textContent = '✅ Comentário enviado com sucesso! Obrigado pela mensagem.';
          commentForm.reset();
          submitBtn.textContent = 'Enviar Comentário';
          submitBtn.disabled = false;
        } else {
          formStatus.className = 'form-status error';
          formStatus.textContent = '❌ Erro ao enviar comentário. Tente novamente.';
          submitBtn.textContent = 'Enviar Comentário';
          submitBtn.disabled = false;
        }
      })
      .catch(error => {
        console.error('Erro:', error);
        formStatus.className = 'form-status error';
        formStatus.textContent = '❌ Erro de conexão. Verifique sua internet e tente novamente.';
        submitBtn.textContent = 'Enviar Comentário';
        submitBtn.disabled = false;
      });
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

});
