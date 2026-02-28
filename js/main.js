/* ============================================================
   HORIZONTE TUTORIAIS — JavaScript Principal (BLINDADO v3)
   Busca Global com Links Relativos Inteligentes
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---- ÍNDICE GLOBAL DE APLICATIVOS E JOGOS (INTEGRADO) ---- */
  const SEARCH_INDEX = [
    // Aplicativos - usando caminhos relativos que funcionam de qualquer lugar
    { nome: "Horizon Clicker", urlFromHome: "posts/aplicativos/horizon-clicker-FINAL-CORRIGIDO.html", aliases: ["horizon", "clicker", "automação"] },
    // Jogos - usando caminhos relativos que funcionam de qualquer lugar
    { nome: "Resident Evil 4 Mobile Edition", urlFromHome: "posts/jogos/resident-evil-4-FINAL-CORRIGIDO.html", aliases: ["resident", "evil", "re4", "resident evil 4", "resident evil", "horror"] }
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

  /* ---- Barra de Pesquisa BLINDADA v3 (Sempre Visível) ---- */
  const searchInput = document.getElementById('search-input-fixed');
  const searchBtn = document.getElementById('search-submit-fixed');

  function calculateRelativePath(targetUrl) {
    // Detecta o nível de profundidade da página atual
    const currentPath = window.location.pathname;
    
    // Conta quantas pastas estamos dentro
    const pathParts = currentPath.split('/').filter(p => p && p !== 'index.html');
    
    // Se estamos em /pages/ ou /posts/, precisamos voltar um nível (..)
    // Se estamos na raiz ou em /index.html, não precisamos voltar
    let depth = 0;
    
    if (currentPath.includes('/pages/') || currentPath.includes('/posts/')) {
      depth = 1; // Estamos um nível abaixo da raiz
    }
    
    // Monta o caminho relativo
    let relativePath = '';
    for (let i = 0; i < depth; i++) {
      relativePath += '../';
    }
    
    return relativePath + targetUrl;
  }

  function performSearch() {
    const term = searchInput.value.toLowerCase().trim();
    if (!term) {
      alert('Digite algo para buscar!');
      return;
    }

    let foundUrl = null;

    // Busca no índice global integrado
    for (let item of SEARCH_INDEX) {
      const itemName = item.nome.toLowerCase();
      
      // Verifica se o termo está no nome
      if (itemName.includes(term) || term.includes(itemName)) {
        foundUrl = item.urlFromHome;
        break;
      }
      
      // Verifica se o termo está nos aliases
      if (item.aliases) {
        for (let alias of item.aliases) {
          if (alias.includes(term) || term.includes(alias)) {
            foundUrl = item.urlFromHome;
            break;
          }
        }
      }
      
      if (foundUrl) break;
    }

    // Se não encontrou no índice, tenta procurar nos cards visíveis da página
    if (!foundUrl) {
      const apps = document.querySelectorAll('[data-app-name]');
      for (let app of apps) {
        const appName = app.getAttribute('data-app-name').toLowerCase();
        if (appName.includes(term) || term.includes(appName)) {
          foundUrl = app.getAttribute('data-app-url');
          break;
        }
      }
    }

    if (foundUrl) {
      // Calcula o caminho relativo correto baseado na página atual
      const finalUrl = calculateRelativePath(foundUrl);
      window.location.href = finalUrl;
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
