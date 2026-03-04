/* ============================================================
   HORIZONTE TUTORIAIS — JavaScript Principal
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ================================================================
     MODO NOTURNO (Dark Mode)
     Funciona em todas as páginas — lê e salva preferência no localStorage
  ================================================================ */
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const body = document.body;

  // Aplica o tema salvo ao carregar a página
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    if (darkModeToggle) darkModeToggle.textContent = '☀️';
  } else {
    if (darkModeToggle) darkModeToggle.textContent = '🌙';
  }

  // Alterna o tema ao clicar no botão
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', function () {
      body.classList.toggle('dark-mode');
      const isDark = body.classList.contains('dark-mode');
      darkModeToggle.textContent = isDark ? '☀️' : '🌙';
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }

  /* ================================================================
     PESQUISA FUNCIONAL
     Busca nos dados do APPS_DATA e exibe resultados em painel dropdown.
     Funciona em todas as páginas — redireciona para a URL correta do item.
  ================================================================ */
  const searchInput  = document.getElementById('search-input-fixed');
  const searchBtn    = document.getElementById('search-submit-fixed');
  const resultsPanel = document.getElementById('search-results-panel');
  const resultsList  = document.getElementById('search-results-list');
  const closeBtn     = document.getElementById('search-results-close-btn');

  // Determina o prefixo de caminho com base na localização atual da página
  function getPrefixo() {
    const path = window.location.pathname;
    if (path.includes('/posts/aplicativos/') || path.includes('/posts/jogos/')) {
      return '../../';
    }
    if (path.includes('/pages/') || path.includes('/posts/')) {
      return '../';
    }
    // Pasta Index ou raiz
    if (path.includes('/Index/')) {
      return '../';
    }
    return '';
  }

  // Coleta todos os itens pesquisáveis do APPS_DATA (definido em dados.js)
  function getTodosItens() {
    if (typeof APPS_DATA === 'undefined') return [];
    const itens = [];
    (APPS_DATA.aplicativos || []).forEach(function(app) {
      itens.push({
        nome:      app.nome,
        descricao: app.descricao || '',
        categoria: app.categoria || 'Aplicativos',
        imagem:    app.imagem || app.imagemGrande || '',
        url:       app.url
      });
    });
    (APPS_DATA.jogos || []).forEach(function(jogo) {
      itens.push({
        nome:      jogo.nome,
        descricao: jogo.descricao || '',
        categoria: jogo.categoria || 'Jogos',
        imagem:    jogo.imagem || jogo.imagemGrande || '',
        url:       jogo.url
      });
    });
    return itens;
  }

  // Executa a busca e exibe resultados no painel
  function realizarBusca() {
    if (!searchInput || !resultsPanel || !resultsList) return;

    const termo = searchInput.value.trim().toLowerCase();

    // Fecha o painel se o campo estiver vazio
    if (!termo) {
      fecharPainel();
      return;
    }

    const itens = getTodosItens();
    const prefixo = getPrefixo();

    // Filtra por nome ou descrição contendo o termo buscado
    const encontrados = itens.filter(function(item) {
      return item.nome.toLowerCase().includes(termo) ||
             item.descricao.toLowerCase().includes(termo) ||
             item.categoria.toLowerCase().includes(termo);
    });

    resultsList.innerHTML = '';

    if (encontrados.length === 0) {
      resultsList.innerHTML = '<div class="search-no-result">Nenhum resultado encontrado para "<strong>' + searchInput.value + '</strong>".</div>';
    } else {
      encontrados.forEach(function(item) {
        const link = document.createElement('a');
        link.className = 'search-result-item';
        link.href = prefixo + item.url;
        link.innerHTML =
          '<img src="' + item.imagem + '" alt="' + item.nome + '" />' +
          '<div class="search-result-info">' +
            '<div class="sri-title">' + item.nome + '</div>' +
            '<div class="sri-cat">' + item.categoria + (item.descricao ? ' · ' + item.descricao : '') + '</div>' +
          '</div>';
        resultsList.appendChild(link);
      });
    }

    resultsPanel.classList.add('active');
  }

  // Fecha o painel de resultados
  function fecharPainel() {
    if (resultsPanel) resultsPanel.classList.remove('active');
  }

  // Eventos de pesquisa
  if (searchBtn) {
    searchBtn.addEventListener('click', realizarBusca);
  }
  if (searchInput) {
    // Busca em tempo real conforme o usuário digita
    searchInput.addEventListener('input', realizarBusca);
    // Busca ao pressionar Enter
    searchInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        realizarBusca();
      }
      // Fecha com Escape
      if (e.key === 'Escape') {
        fecharPainel();
        searchInput.value = '';
      }
    });
  }

  // Fechar painel pelo botão X
  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      fecharPainel();
      if (searchInput) searchInput.value = '';
    });
  }

  // Fechar painel ao clicar fora dele
  document.addEventListener('click', function(e) {
    if (!resultsPanel) return;
    const container = document.querySelector('.search-fixed-container');
    if (
      resultsPanel.classList.contains('active') &&
      !resultsPanel.contains(e.target) &&
      container && !container.contains(e.target)
    ) {
      fecharPainel();
    }
  });

  /* ================================================================
     SISTEMA DE COMENTÁRIOS VIA E-MAIL (Formspree)
  ================================================================ */
  const commentForm = document.getElementById('direct-comment-form');
  const formStatus  = document.getElementById('form-status');
  const submitBtn   = document.getElementById('submit-btn');

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
        headers: { 'Accept': 'application/json' }
      })
      .then(function(response) {
        if (response.ok) {
          formStatus.className = 'form-status success';
          formStatus.textContent = '✅ Comentário enviado com sucesso! Obrigado pela mensagem.';
          commentForm.reset();
        } else {
          formStatus.className = 'form-status error';
          formStatus.textContent = '❌ Erro ao enviar comentário. Tente novamente.';
        }
        submitBtn.textContent = 'Enviar Comentário';
        submitBtn.disabled = false;
      })
      .catch(function(error) {
        console.error('Erro:', error);
        formStatus.className = 'form-status error';
        formStatus.textContent = '❌ Erro de conexão. Verifique sua internet e tente novamente.';
        submitBtn.textContent = 'Enviar Comentário';
        submitBtn.disabled = false;
      });
    });
  }

  /* ================================================================
     BOTÃO CARREGAR MAIS
  ================================================================ */
  const loadMoreBtn  = document.getElementById('load-more-btn');
  const hiddenPosts  = document.querySelectorAll('.app-card.hidden-post');
  if (loadMoreBtn && hiddenPosts.length > 0) {
    loadMoreBtn.addEventListener('click', function () {
      hiddenPosts.forEach(function(el) { el.classList.remove('hidden-post'); });
      loadMoreBtn.style.display = 'none';
    });
  }

});
