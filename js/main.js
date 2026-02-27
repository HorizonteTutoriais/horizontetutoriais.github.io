/* ============================================================
   HORIZONTE TUTORIAIS — JavaScript Principal (INFALÍVEL)
   Adaptado para envio de comentários via E-mail com Formspree
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

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

  /* ---- Barra de Pesquisa (Sempre Visível) ---- */
  const searchInput = document.getElementById('search-input-fixed');
  const searchBtn = document.getElementById('search-submit-fixed');

  function performSearch() {
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
    searchInput.value = '';
  }

  if (searchBtn) searchBtn.onclick = performSearch;
  if (searchInput) {
    searchInput.onkeypress = function(e) {
      if (e.key === 'Enter') performSearch();
    };
  }

  /* ---- Sistema de Comentários via E-mail (Formspree) ---- */
  const commentForm = document.getElementById('direct-comment-form');
  const formStatus = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');

  if (commentForm) {
    commentForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Desabilita o botão durante o envio
      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando...';
      
      // Limpa mensagens anteriores
      formStatus.className = 'form-status';
      formStatus.textContent = '';

      // Coleta os dados do formulário
      const formData = new FormData(commentForm);
      
      // Envia os dados via Formspree
      fetch(commentForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          // Sucesso
          formStatus.className = 'form-status success';
          formStatus.textContent = '✅ Comentário enviado com sucesso! Obrigado pela mensagem.';
          commentForm.reset();
          submitBtn.textContent = 'Enviar Comentário';
          submitBtn.disabled = false;
        } else {
          // Erro na resposta
          formStatus.className = 'form-status error';
          formStatus.textContent = '❌ Erro ao enviar comentário. Tente novamente.';
          submitBtn.textContent = 'Enviar Comentário';
          submitBtn.disabled = false;
        }
      })
      .catch(error => {
        // Erro na requisição
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
