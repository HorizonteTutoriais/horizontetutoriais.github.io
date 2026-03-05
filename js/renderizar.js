/* ============================================================
   HORIZONTE TUTORIAIS — Renderizador Dinâmico
   Gera automaticamente: cards, posts, tutoriais e modais
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
  // Determina o prefixo de caminho com base na localização atual
  function getPrefixo() {
    const path = window.location.pathname;
    if (path.includes('/posts/aplicativos/') || path.includes('/posts/jogos/')) {
      return '../../';
    }
    if (path.includes('/pages/') || path.includes('/posts/')) {
      return '../';
    }
    if (path.includes('/Index/')) {
      return '../';
    }
    return '';
  }

  const prefixo = getPrefixo();

  /* ================================================================
     RENDERIZAR CARDS NAS PÁGINAS DE LISTAGEM
  ================================================================ */
  function renderizarCards() {
    const path = window.location.pathname;
    let container = null;
    let dados = [];

    // Determina qual container e dados usar
    if (path.includes('/pages/aplicativos.html')) {
      container = document.querySelector('.popular-section');
      dados = APPS_DATA.aplicativos || [];
    } else if (path.includes('/pages/jogos.html')) {
      container = document.querySelector('.popular-section');
      dados = APPS_DATA.jogos || [];
    } else if (path.includes('/pages/quente.html')) {
      container = document.querySelector('.popular-section');
      dados = APPS_DATA.quente || [];
    } else if (path.includes('/pages/ferramentas.html')) {
      container = document.querySelector('.popular-section');
      dados = APPS_DATA.ferramentas || [];
    } else if (path.includes('/Index/index.html') || path === '/' || path.endsWith('/index.html')) {
      // Página inicial: renderizar destaques e últimas atualizações
      renderizarDestaques();
      return;
    }

    if (container && dados.length > 0) {
      container.innerHTML = '';
      dados.forEach(function(item) {
        const card = criarCard(item, prefixo);
        container.appendChild(card);
      });
    }
  }

  /* ================================================================
     RENDERIZAR DESTAQUES NA PÁGINA INICIAL
  ================================================================ */
  function renderizarDestaques() {
    const updateContainer = document.querySelector('.updates-grid');
    const popularContainer = document.querySelector('.popular-section');
    const sidebarPopulares = document.getElementById('sidebar-populares');

    if (!APPS_DATA) return;

    // Últimas atualizações (todos os itens)
    if (updateContainer) {
      updateContainer.innerHTML = '';
      const todosItens = [
        ...(APPS_DATA.aplicativos || []),
        ...(APPS_DATA.jogos || []),
        ...(APPS_DATA.quente || [])
      ].sort((a, b) => new Date(b.data) - new Date(a.data));

      todosItens.forEach(function(item) {
        const card = criarCard(item, prefixo);
        updateContainer.appendChild(card);
      });
    }

    // Destaques (itens com destaque: true)
    if (popularContainer) {
      popularContainer.innerHTML = '';
      const destaques = [
        ...(APPS_DATA.aplicativos || []),
        ...(APPS_DATA.jogos || [])
      ].filter(item => item.destaque === true);

      destaques.forEach(function(item) {
        const card = criarCard(item, prefixo);
        popularContainer.appendChild(card);
      });
    }

    // Populares na sidebar
    if (sidebarPopulares) {
      const ul = document.createElement('ul');
      ul.style.listStyle = 'none';
      ul.style.padding = '0';

      const populares = [
        ...(APPS_DATA.aplicativos || []),
        ...(APPS_DATA.jogos || [])
      ].filter(item => item.tipo === 'popular').slice(0, 5);

      populares.forEach(function(item) {
        const li = document.createElement('li');
        li.style.marginBottom = '8px';
        const a = document.createElement('a');
        a.href = prefixo + item.url;
        a.style.color = '#0d47a1';
        a.style.textDecoration = 'none';
        a.style.fontSize = '13px';
        a.style.fontWeight = '600';
        a.textContent = item.nome;
        li.appendChild(a);
        ul.appendChild(li);
      });

      sidebarPopulares.appendChild(ul);
    }
  }

  /* ================================================================
     CRIAR CARD (elemento reutilizável)
  ================================================================ */
  function criarCard(item, prefixo) {
    const card = document.createElement('div');
    card.className = 'app-card';
    card.style.cssText = `
      background: var(--white);
      border: 1px solid var(--gray-border);
      border-radius: var(--radius);
      padding: 15px;
      margin-bottom: 15px;
      box-shadow: var(--shadow);
      transition: all 0.3s ease;
      display: flex;
      gap: 15px;
      cursor: pointer;
    `;

    card.onmouseover = function() {
      this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
      this.style.transform = 'translateY(-2px)';
    };

    card.onmouseout = function() {
      this.style.boxShadow = 'var(--shadow)';
      this.style.transform = 'translateY(0)';
    };

    // Imagem
    const img = document.createElement('img');
    img.src = item.imagem || item.icone || 'https://via.placeholder.com/80';
    img.alt = item.nome;
    img.style.cssText = `
      width: 80px;
      height: 80px;
      border-radius: 6px;
      object-fit: cover;
      flex-shrink: 0;
    `;

    // Conteúdo
    const content = document.createElement('div');
    content.style.flex = '1';

    const title = document.createElement('h3');
    title.style.cssText = 'margin: 0 0 5px 0; font-size: 16px; color: #0d47a1; font-weight: 700;';
    title.textContent = item.nome;

    const desc = document.createElement('p');
    desc.style.cssText = 'margin: 0 0 8px 0; font-size: 13px; color: #666; line-height: 1.4;';
    desc.textContent = item.descricao;

    const categoria = document.createElement('span');
    categoria.className = 'badge badge-cat';
    categoria.style.cssText = `
      display: inline-block;
      background: #0d47a1;
      color: #fff;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 600;
      margin-right: 8px;
    `;
    categoria.textContent = item.categoria;

    const data = document.createElement('span');
    data.style.cssText = 'font-size: 11px; color: #999;';
    data.textContent = '📅 ' + (item.data || 'Recente');

    content.appendChild(title);
    content.appendChild(desc);
    content.appendChild(categoria);
    content.appendChild(data);

    card.appendChild(img);
    card.appendChild(content);

    // Clique no card redireciona para o app
    card.onclick = function(e) {
      if (e.target.tagName !== 'A') {
        window.location.href = prefixo + item.url;
      }
    };

    return card;
  }

  /* ================================================================
     RENDERIZAR PÁGINA DE POST (aplicativo/jogo)
  ================================================================ */
  function renderizarPost() {
    const path = window.location.pathname;
    let item = null;

    // Encontra o item baseado na URL
    if (typeof APPS_DATA !== 'undefined') {
      const todosItens = [
        ...(APPS_DATA.aplicativos || []),
        ...(APPS_DATA.jogos || [])
      ];

      todosItens.forEach(function(app) {
        if (path.includes(app.url)) {
          item = app;
        }
      });
    }

    if (!item) return;

    // Renderizar conteúdo do post
    const postBody = document.querySelector('.post-body');
    if (postBody) {
      postBody.innerHTML = `
        <p>${item.descricaoLonga || ''}</p>
        <h2>⭐ RECURSOS PRINCIPAIS ⭐⭐⭐</h2>
        <ul>
          ${item.recursos.map(r => `<li>✅ ${r}</li>`).join('')}
        </ul>
      `;
    }

    // Renderizar tabela de especificações
    const infoTable = document.querySelector('.info-table');
    if (infoTable && item.especificacoes) {
      const specs = item.especificacoes;
      infoTable.innerHTML = `
        <tr><td>${item.categoria === 'Jogos' ? 'Jogo' : 'Aplicativo'}</td><td>${item.nome}</td></tr>
        <tr><td>Versão</td><td>${specs.versao}</td></tr>
        <tr><td>${item.categoria === 'Jogos' ? 'Tamanho Total' : 'Tamanho'}</td><td>${specs.tamanho}</td></tr>
        <tr><td>Categoria</td><td>${specs.categoria}</td></tr>
        <tr><td>Desenvolvedor</td><td>${specs.desenvolvedor}</td></tr>
        <tr><td>Tipo do Arquivo</td><td>${specs.tipoArquivo}</td></tr>
        <tr><td>Requer Android</td><td>${specs.androidMin}</td></tr>
        <tr><td>Atualizado em</td><td>${specs.atualizadoEm}</td></tr>
      `;
    }

    // Renderizar botões de download
    const downloadBox = document.querySelector('.download-box');
    if (downloadBox) {
      if (item.tipoDownload === 'multiplo') {
        // Jogo com múltiplos downloads
        downloadBox.innerHTML = `
          <p style="font-size:14px;font-weight:700;color:#c62828;margin-bottom:12px">⬇️ Clique abaixo para baixar o jogo</p>
          <div class="download-options">
            <a href="${item.linkDownload}" class="btn-download-option" target="_blank" rel="noopener">
              <i class="fas fa-file-archive"></i> BAIXAR APK (600MB)
            </a>
            <a href="${item.linkDownloadData1}" class="btn-download-option alt" target="_blank" rel="noopener">
              <i class="fas fa-database"></i> BAIXAR DATA 1 (450MB)
            </a>
            <a href="${item.linkDownloadData2}" class="btn-download-option alt" target="_blank" rel="noopener">
              <i class="fas fa-database"></i> BAIXAR DATA 2 (450MB)
            </a>
          </div>
          <p style="font-size:11px;color:#666;margin-top:10px">Link seguro verificado — Horizonte Tutoriais</p>
        `;
      } else {
        // App com download único
        downloadBox.innerHTML = `
          <p style="font-size:14px;font-weight:700;color:#0d47a1;margin-bottom:12px">⬇️ Clique abaixo para baixar o aplicativo</p>
          <a href="${item.linkDownload}" class="btn-big-download" target="_blank" rel="noopener">
            <i class="fas fa-download"></i> DOWNLOAD
          </a>
          <p style="font-size:11px;color:#666;margin-top:10px">Link seguro verificado — Horizonte Tutoriais</p>
        `;
      }
    }

    // Renderizar botão de tutorial na sidebar
    const tutorialsWidget = document.querySelector('.tutorials-widget');
    if (tutorialsWidget) {
      tutorialsWidget.innerHTML = `
        <a href="${prefixo}pages/tutoriais.html?open=${item.id}" class="btn-tutorial-direct">
          <span><i class="fas fa-video"></i> TUTORIAIS</span>
          <i class="fas fa-external-link-alt"></i>
        </a>
      `;
    }

    // Renderizar breadcrumb
    const breadcrumb = document.querySelector('.breadcrumb');
    if (breadcrumb) {
      breadcrumb.innerHTML = `
        <a href="${prefixo}index.html">Lar</a>
        <span>›</span>
        <a href="${prefixo}pages/${item.categoria === 'Jogos' ? 'jogos' : 'aplicativos'}.html">
          ${item.categoria === 'Jogos' ? 'Jogos' : 'Aplicativos'}
        </a>
        <span>›</span>
        ${item.nome}
      `;
    }

    // Renderizar título e meta
    const postHeader = document.querySelector('.post-header');
    if (postHeader) {
      const h1 = postHeader.querySelector('h1');
      if (h1) h1.textContent = item.titulo;

      const img = document.querySelector('.post-featured-img');
      if (img) img.src = item.imagemCapa;
    }
  }

  /* ================================================================
     RENDERIZAR TUTORIAIS
  ================================================================ */
  function renderizarTutoriais() {
    const path = window.location.pathname;
    if (!path.includes('/pages/tutoriais.html')) return;

    if (typeof APPS_DATA === 'undefined') return;

    const todosItens = [
      ...(APPS_DATA.aplicativos || []),
      ...(APPS_DATA.jogos || [])
    ];

    const tutoriaisContainer = document.querySelector('.popular-section');
    if (!tutoriaisContainer) return;

    // Limpar e renderizar tutoriais
    tutoriaisContainer.innerHTML = '';

    todosItens.forEach(function(item) {
      if (!item.tutorialTitulo) return;

      const tutorialCard = document.createElement('div');
      tutorialCard.className = 'tutorial-card';

      tutorialCard.innerHTML = `
        <div class="tutorial-header">
          <img src="${item.icone || item.imagem}" alt="${item.nome}" class="tutorial-icon" />
          <div class="tutorial-info">
            <h3>${item.tutorialTitulo}</h3>
            <p>${item.tutorialSubtitulo}</p>
          </div>
        </div>
        <div class="tutorial-description">
          ${item.tutorialDescricao}
        </div>
        <div class="tutorial-buttons">
          <button class="btn-specs" onclick="openSpecsModal('${item.id}')">
            <i class="fas fa-info-circle"></i> Specs
          </button>
          <button class="btn-video" onclick="toggleVideoScroll('${item.id}')">
            <i class="fas fa-play-circle"></i> Assistir
          </button>
          <a href="${prefixo}posts/${item.categoria === 'Jogos' ? 'jogos' : 'aplicativos'}/${item.id}.html" class="btn-download-tutorial">
            <i class="fas fa-download"></i> Baixar
          </a>
        </div>
        <div id="video-scroll-${item.id}" class="video-scroll-container">
          <div class="video-scroll-list">
            ${item.videos.map(v => `
              <div class="video-btn" onclick="openVideoModal('${item.id}', '${v.id}', '${v.titulo}')">
                <i class="fas fa-video"></i>
                <span>${v.titulo}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;

      tutoriaisContainer.appendChild(tutorialCard);
    });

    // Renderizar modais de specs
    const body = document.body;
    todosItens.forEach(function(item) {
      if (!item.especificacoes) return;

      const modal = document.createElement('div');
      modal.id = `modal-${item.id}`;
      modal.className = 'modal';
      modal.style.display = 'none';

      const specs = item.especificacoes;
      modal.innerHTML = `
        <div class="modal-content">
          <div class="modal-header">
            <h2>${item.tutorialTitulo.split(' ').slice(0, 3).join(' ')} - ${item.nome}</h2>
            <button class="close-btn" onclick="closeSpecsModal('${item.id}')">&times;</button>
          </div>
          <table class="specs-table">
            <tr><td>${item.categoria === 'Jogos' ? 'Jogo' : 'Aplicativo'}</td><td>${item.nome}</td></tr>
            <tr><td>Versão</td><td>${specs.versao}</td></tr>
            <tr><td>${item.categoria === 'Jogos' ? 'Tamanho Total' : 'Tamanho'}</td><td>${specs.tamanho}</td></tr>
            <tr><td>Categoria</td><td>${specs.categoria}</td></tr>
            <tr><td>Desenvolvedor</td><td>${specs.desenvolvedor}</td></tr>
            <tr><td>Tipo do Arquivo</td><td>${specs.tipoArquivo}</td></tr>
            <tr><td>Requer Android</td><td>${specs.androidMin}</td></tr>
            <tr><td>Atualizado em</td><td>${specs.atualizadoEm}</td></tr>
            <tr><td>Recursos</td><td>${specs.recursosEspecificacoes}</td></tr>
          </table>
        </div>
      `;

      body.appendChild(modal);
    });

    // Verificar se há parâmetro de abertura automática
    const params = new URLSearchParams(window.location.search);
    const autoOpen = params.get('open');
    if (autoOpen) {
      setTimeout(() => {
        const scroll = document.getElementById('video-scroll-' + autoOpen);
        if (scroll) {
          scroll.classList.add('active');
          scroll.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
  }

  /* ================================================================
     FUNÇÕES GLOBAIS (chamadas pelos onclick)
  ================================================================ */
  window.openSpecsModal = function(tutorialId) {
    const modal = document.getElementById('modal-' + tutorialId);
    if (modal) {
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeSpecsModal = function(tutorialId) {
    const modal = document.getElementById('modal-' + tutorialId);
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  };

  window.toggleVideoScroll = function(tutorialId) {
    const scroll = document.getElementById('video-scroll-' + tutorialId);
    if (scroll) {
      scroll.classList.toggle('active');
    }
  };

  window.openVideoModal = function(tutorialId, videoId, title) {
    const modal = document.getElementById('modal-video-player');
    const iframe = document.getElementById('video-iframe');
    const titleEl = document.getElementById('video-modal-title');

    if (modal && iframe) {
      titleEl.textContent = '📺 ' + title;
      iframe.src = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1';
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeVideoModal = function() {
    const modal = document.getElementById('modal-video-player');
    const iframe = document.getElementById('video-iframe');
    if (modal && iframe) {
      iframe.src = '';
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  };

  window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
      if (event.target === modal) {
        if (modal.id === 'modal-video-player') closeVideoModal();
        else modal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
  };

  /* ================================================================
     INICIALIZAR RENDERIZAÇÃO
  ================================================================ */
  renderizarCards();
  renderizarPost();
  renderizarTutoriais();
});

// Compatibilidade com APPS_DATA (para dados.js)
if (typeof APPS_DATA === 'undefined' && typeof window !== 'undefined') {
  // Se dados.js não foi carregado, tentar carregar dados.json
  fetch('../js/dados.json')
    .then(response => response.json())
    .then(data => {
      window.APPS_DATA = data;
      // Re-renderizar após carregar dados
      location.reload();
    })
    .catch(err => console.error('Erro ao carregar dados.json:', err));
}
