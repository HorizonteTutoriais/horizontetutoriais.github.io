/* ============================================================
   HORIZONTE TUTORIAIS — JavaScript Principal (BLINDADO)
   Busca Global Integrada + Dark Mode + Comentários
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---- ÍNDICE GLOBAL DE APLICATIVOS E JOGOS (INTEGRADO) ---- */
  const SEARCH_INDEX = [
    // Aplicativos
    { nome: "Horizon Clicker", url: "posts/aplicativos/horizon-clicker-FINAL-CORRIGIDO.html", aliases: ["horizon", "clicker", "automação"] },
    // Jogos
    { nome: "Resident Evil 4 Mobile Edition", url: "posts/jogos/resident-evil-4-FINAL-CORRIGIDO.html", aliases: ["resident", "evil", "re4", "resident evil 4", "resident evil", "horror"] }
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

  /* ---- Barra de Pesquisa BLINDADA (Sempre Visível) ---- */
  const searchInput = document.getElementById('search-input-fixed');
  const searchBtn = document.getElementById('search-submit-fixed');

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
        foundUrl = item.url;
        break;
      }
      
      // Verifica se o termo está nos aliases
      if (item.aliases) {
        for (let alias of item.aliases) {
          if (alias.includes(term) || term.includes(alias)) {
            foundUrl = item.url;
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
      // Detecta se precisa de caminho relativo ou absoluto
      if (!foundUrl.startsWith('http')) {
        // Tenta descobrir o caminho correto baseado na URL atual
        const currentPath = window.location.pathname;
        if (currentPath.includes('/posts/')) {
          // Já está em um post, não precisa mudar muito
          foundUrl = foundUrl.replace(/^posts\//, '../../posts/');
        } else if (currentPath.includes('/pages/')) {
          // Está em uma página, precisa voltar um nível
          foundUrl = foundUrl.replace(/^posts\//, '../posts/');
        } else {
          // Está na home, usa o caminho direto
          foundUrl = foundUrl;
        }
      }
      window.location.href = foundUrl;
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
