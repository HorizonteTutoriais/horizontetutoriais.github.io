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

  function obterPrefixoBusca() {
    const path = window.location.pathname;
    if (path.includes('/posts/aplicativos/') || path.includes('/posts/jogos/')) {
      return '../../';
    }
    if (path.includes('/pages/') || path.includes('/Index%20com%20Cusdis/') || path.includes('/Index com Cusdis/')) {
      return '../';
    }
    return '';
  }

  function performSearch() {
    if (!searchInput) return;
    const term = searchInput.value.toLowerCase().trim();
    if (!term) return;

    // Verifica se APPS_DATA está disponível (carregado pelo dados.js)
    if (typeof APPS_DATA === 'undefined') {
      alert('Erro: dados do site não carregados. Recarregue a página.');
      return;
    }

    const prefixo = obterPrefixoBusca();
    const todosItens = [
      ...APPS_DATA.aplicativos,
      ...APPS_DATA.jogos
    ];

    // Busca por correspondência parcial no nome ou descrição
    const encontrado = todosItens.find(item => {
      const nome = item.nome.toLowerCase();
      const descricao = item.descricao.toLowerCase();
      return nome.includes(term) || descricao.includes(term) || term.includes(nome);
    });

    if (encontrado) {
      window.location.href = prefixo + encontrado.url;
    } else {
      alert('Nenhum resultado encontrado para "' + searchInput.value + '". Tente outro nome!');
    }

    searchInput.value = '';
  }

  if (searchBtn) searchBtn.addEventListener('click', performSearch);
  if (searchInput) {
    searchInput.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') performSearch();
    });
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
